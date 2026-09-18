(function () {
  "use strict";

  const sidebarEl = document.getElementById("sidebar");
  const mainEl = document.getElementById("app-main");
  const headerEl = document.querySelector(".app-header");
  const domainCache = new Map();
  let currentObserver = null;

  function syncHeaderHeight() {
    document.documentElement.style.setProperty("--header-h", headerEl.offsetHeight + "px");
  }

  async function loadIndex() {
    if (!Array.isArray(window.EXAM_INDEX)) {
      throw new Error("data/index.js の読み込みに失敗しました");
    }
    return window.EXAM_INDEX;
  }

  async function loadDomain(id) {
    if (domainCache.has(id)) return domainCache.get(id);
    const data = window.EXAM_DATA && window.EXAM_DATA[id];
    if (!data) throw new Error(`data/${id}.js の読み込みに失敗しました`);
    domainCache.set(id, data);
    return data;
  }

  function renderSidebar(domains, activeId, activeDomain) {
    sidebarEl.innerHTML = "";
    const ul = document.createElement("ul");
    ul.className = "sidebar-pages";

    domains.forEach((d) => {
      const li = document.createElement("li");
      li.className = "sidebar-page-item" + (d.id === activeId ? " active" : "");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sidebar-page-btn";
      btn.textContent = d.titleJa || d.title;
      btn.addEventListener("click", () => selectDomain(domains, d.id));
      li.appendChild(btn);

      if (d.id === activeId && activeDomain) {
        const subUl = document.createElement("ul");
        subUl.className = "sidebar-sections";
        activeDomain.sections.forEach((section, i) => {
          const subLi = document.createElement("li");
          const a = document.createElement("a");
          a.href = `#${activeId}-sec-${i}`;
          a.className = "sidebar-section-link";
          a.textContent = section.heading;
          a.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.getElementById(`${activeId}-sec-${i}`);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
          });
          subLi.appendChild(a);
          subUl.appendChild(subLi);
        });
        li.appendChild(subUl);
      }

      ul.appendChild(li);
    });

    sidebarEl.appendChild(ul);
  }

  function renderSummary(domain) {
    const section = document.createElement("section");
    section.className = "summary-section";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "summary-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = `<span>ページ全体のまとめ</span><span class="chevron">▶</span>`;

    const body = document.createElement("div");
    body.className = "summary-body";
    body.innerHTML = domain.summaryHtml || "";
    body.style.display = "none";

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      body.style.display = expanded ? "none" : "block";
    });

    section.appendChild(toggle);
    section.appendChild(body);
    return section;
  }

  function renderSentence(sentence) {
    const li = document.createElement("li");
    li.className = "sentence-item";

    const jaBtn = document.createElement("button");
    jaBtn.type = "button";
    jaBtn.className = "sentence-ja";
    jaBtn.textContent = sentence.ja;

    const enWrap = document.createElement("div");
    enWrap.className = "sentence-en";
    const enInner = document.createElement("div");
    enInner.className = "sentence-en-inner";
    enInner.textContent = sentence.en;
    enWrap.appendChild(enInner);

    jaBtn.addEventListener("click", () => {
      const isOpen = li.classList.toggle("open");
      enWrap.style.maxHeight = isOpen ? enWrap.scrollHeight + "px" : "0px";
    });

    li.appendChild(jaBtn);
    li.appendChild(enWrap);
    return li;
  }

  function renderSections(domain, activeId) {
    const frag = document.createDocumentFragment();
    domain.sections.forEach((section, i) => {
      const wrap = document.createElement("section");
      wrap.className = "task-section";
      wrap.id = `${activeId}-sec-${i}`;

      const h2 = document.createElement("h2");
      h2.className = "task-heading";
      h2.textContent = section.heading;
      wrap.appendChild(h2);

      section.groups.forEach((group) => {
        if (group.label) {
          const label = document.createElement("span");
          label.className = "group-label";
          label.textContent = group.label;
          wrap.appendChild(label);
        }

        const ul = document.createElement("ul");
        ul.className = "sentence-list";
        group.sentences.forEach((s) => ul.appendChild(renderSentence(s)));
        wrap.appendChild(ul);
      });

      frag.appendChild(wrap);
    });
    return frag;
  }

  function setupScrollSpy(activeId) {
    if (currentObserver) {
      currentObserver.disconnect();
      currentObserver = null;
    }
    const links = Array.from(sidebarEl.querySelectorAll(".sidebar-section-link"));
    if (!links.length) return;

    const entriesMap = links
      .map((link, i) => ({ link, target: document.getElementById(`${activeId}-sec-${i}`) }))
      .filter((e) => e.target);

    currentObserver = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = entriesMap.find((e) => e.target === entry.target);
          if (!match) return;
          links.forEach((l) => l.classList.remove("current"));
          match.link.classList.add("current");
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    entriesMap.forEach((e) => currentObserver.observe(e.target));
  }

  async function selectDomain(domains, id) {
    mainEl.innerHTML = `<p class="loading">読み込み中...</p>`;
    try {
      const domain = await loadDomain(id);
      renderSidebar(domains, id, domain);

      mainEl.innerHTML = "";
      const title = document.createElement("h2");
      title.className = "domain-title";
      title.textContent = domain.titleJa || domain.title;
      mainEl.appendChild(title);

      mainEl.appendChild(renderSummary(domain));
      mainEl.appendChild(renderSections(domain, id));

      history.replaceState(null, "", `#${id}`);
      syncHeaderHeight();
      setupScrollSpy(id);
    } catch (err) {
      mainEl.innerHTML = `<p class="loading">読み込みエラー: ${err.message}</p>`;
      console.error(err);
    }
  }

  async function init() {
    syncHeaderHeight();
    window.addEventListener("resize", syncHeaderHeight);
    try {
      const domains = await loadIndex();
      if (!domains.length) {
        mainEl.innerHTML = `<p class="loading">ドメインデータがありません。</p>`;
        return;
      }
      const hashId = location.hash.replace("#", "");
      const initialId = domains.some((d) => d.id === hashId) ? hashId : domains[0].id;
      renderSidebar(domains, initialId, null);
      await selectDomain(domains, initialId);
    } catch (err) {
      mainEl.innerHTML = `<p class="loading">読み込みエラー: ${err.message}</p>`;
      console.error(err);
    }
  }

  init();
})();
