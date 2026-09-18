window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["samplequestions1"] = {
  "id": "samplequestions1",
  "title": "Sample Questions (1)",
  "titleJa": "サンプル問題(前半)",
  "summaryHtml": "<h3>全体像</h3><p>このチャンクは公式練習問題の前半6問で、<strong>「カスタマーサポート解決エージェント」</strong>(Q1〜3)と<strong>「Claude Codeによるコード生成」</strong>(Q4〜6)の2シナリオから構成される。</p><h4>カスタマーサポートのシナリオ</h4><ul><li>Q1: 本人確認前に返金処理へ進んでしまう問題→<strong>プロンプトではなくプログラム的な前提条件(ゲート)で強制</strong>すべき、というドメイン1の「決定論的強制」の考え方をそのまま出題</li><li>Q2: ツール選択ミス→まず疑うべきは<strong>ツール説明文の不足</strong>であり、few-shotやルーティング層は過剰対応</li><li>Q3: 一次解決率の低さ→<strong>明示的なエスカレーション基準+few-shot</strong>が第一手であり、LLMの自己申告信頼度や感情分析は根本原因に効かない</li></ul><h4>Claude Codeのシナリオ</h4><ul><li>Q4: チーム共有のスラッシュコマンドは<code>.claude/commands/</code>に置き、個人用は<code>~/.claude/commands/</code></li><li>Q5: 大規模かつ設計判断を伴う変更には<strong>プランモード</strong>を使う</li><li>Q6: ファイルパスに依存する規約の自動適用には<strong>.claude/rules/のglobパターン</strong>が最適で、CLAUDE.mdやスキルでは決定論的な適用ができない</li></ul><p>全体を通じて「プロンプトによる指示(確率的)」と「プログラム的な強制(決定論的)」の区別、および過剰実装を避け段階的に対処するという出題傾向が明確に見える。</p>",
  "sections": [
    {
      "heading": "シナリオ: カスタマーサポート解決エージェント",
      "groups": [
        {
          "label": "Question 1",
          "sentences": [
            {
              "ja": "【問題】本番データによると、12%のケースでエージェントがget_customerを完全にスキップし、顧客が名乗った名前のみを使ってlookup_orderを呼び出しており、時に顧客の誤認識や誤った返金につながっている。この信頼性問題に最も効果的に対処する変更は何か。",
              "en": "Production data shows that in 12% of cases, your agent skips get_customer entirely and calls lookup_order using only the customer's stated name, occasionally leading to misidentified accounts and incorrect refunds. What change would most effectively address this reliability issue?"
            },
            {
              "ja": "A. get_customerが確認済みの顧客IDを返すまで、lookup_orderおよびprocess_refundの呼び出しをブロックするプログラム的な前提条件を追加する。",
              "en": "A. Add a programmatic prerequisite that blocks lookup_order and process_refund calls until get_customer has returned a verified customer ID."
            },
            {
              "ja": "B. get_customerによる顧客確認がすべての注文操作の前に必須であることをシステムプロンプトに明記する。",
              "en": "B. Enhance the system prompt to state that customer verification via get_customer is mandatory before any order operations."
            },
            {
              "ja": "C. 顧客が注文details を進んで提示した場合でも、エージェントが常に最初にget_customerを呼び出すことを示すfew-shot例を追加する。",
              "en": "C. Add few-shot examples showing the agent always calling get_customer first, even when customers volunteer order details."
            },
            {
              "ja": "D. 各リクエストを分析し、そのリクエスト種別に適したツールのサブセットのみを有効化するルーティング分類器を実装する。",
              "en": "D. Implement a routing classifier that analyzes each request and enables only the subset of tools appropriate for that request type."
            },
            {
              "ja": "【正解】A。返金処理前の本人確認のような、重要な業務ロジックで特定のツール順序が必須の場合、プログラム的な強制は、プロンプトベースの手法では得られない決定論的な保証を提供する。選択肢BとCはLLMの確率的な準拠に依存しており、誤りが金銭的な結果を招く場合には不十分である。選択肢Dはツールの利用可否の問題に対処しているだけで、実際の問題であるツールの順序の問題には対処していない。",
              "en": "Correct Answer: A. When a specific tool sequence is required for critical business logic (like verifying customer identity before processing refunds), programmatic enforcement provides deterministic guarantees that prompt-based approaches cannot. Options B and C rely on probabilistic LLM compliance, which is insufficient when errors have financial consequences. Option D addresses tool availability rather than tool ordering, which is not the actual problem."
            }
          ]
        },
        {
          "label": "Question 2",
          "sentences": [
            {
              "ja": "【問題】本番ログによると、ユーザーが注文について質問した場合(例:「注文番号12345を確認したい」)、エージェントはlookup_orderではなくget_customerを頻繁に呼び出している。両方のツールの説明は最小限(「顧客情報を取得する」/「注文詳細を取得する」)で、似た識別子形式を受け付ける。ツール選択の信頼性を改善する最も効果的な最初のステップは何か。",
              "en": "Production logs show the agent frequently calls get_customer when users ask about orders (e.g., \"check my order #12345\"), instead of calling lookup_order. Both tools have minimal descriptions (\"Retrieves customer information\" / \"Retrieves order details\") and accept similar identifier formats. What's the most effective first step to improve tool selection reliability?"
            },
            {
              "ja": "A. システムプロンプトにfew-shot例を追加し、注文関連の質問がlookup_orderに正しくルーティングされる様子を示す5〜8個の例を示す。",
              "en": "A. Add few-shot examples to the system prompt demonstrating correct tool selection patterns, with 5-8 examples showing order-related queries routing to lookup_order."
            },
            {
              "ja": "B. 各ツールの説明を拡張し、対応する入力形式、例となる質問、エッジケース、類似ツールとの使い分けの境界線を説明する。",
              "en": "B. Expand each tool's description to include input formats it handles, example queries, edge cases, and boundaries explaining when to use it versus similar tools."
            },
            {
              "ja": "C. 各ターンでユーザー入力を解析し、検出されたキーワードや識別子パターンに基づいて適切なツールを事前選択するルーティング層を実装する。",
              "en": "C. Implement a routing layer that parses user input before each turn and pre-selects the appropriate tool based on detected keywords and identifier patterns."
            },
            {
              "ja": "D. 両方のツールを1つのlookup_entityツールに統合し、任意の識別子を受け取って内部でどのバックエンドに問い合わせるかを判断させる。",
              "en": "D. Consolidate both tools into a single lookup_entity tool that accepts any identifier and internally determines which backend to query."
            },
            {
              "ja": "【正解】B。ツールの説明は、LLMがツール選択を行う際の主要な手がかりである。説明が最小限の場合、モデルには似たツールを区別するための十分な文脈がない。選択肢Bはこの根本原因に、低コストで効果の高い方法で直接対処する。few-shot例(A)は根本的な問題を解決せずにトークンのオーバーヘッドを増やすだけである。ルーティング層(C)は過剰設計であり、LLMの自然言語理解を迂回してしまう。ツールの統合(D)は有効なアーキテクチャ上の選択ではあるが、直近の問題が説明不足であることを踏まえると、「最初のステップ」として求められる以上の労力を要する。",
              "en": "Correct Answer: B. Tool descriptions are the primary mechanism LLMs use for tool selection. When descriptions are minimal, models lack the context to differentiate between similar tools. Option B directly addresses this root cause with a low-effort, high-leverage fix. Few-shot examples (A) add token overhead without fixing the underlying issue. A routing layer (C) is over-engineered and bypasses the LLM's natural language understanding. Consolidating tools (D) is a valid architectural choice but requires more effort than a \"first step\" warrants when the immediate problem is inadequate descriptions."
            }
          ]
        },
        {
          "label": "Question 3",
          "sentences": [
            {
              "ja": "【問題】あなたのエージェントの一次解決率は55%で、目標の80%を大きく下回っている。ログによると、写真による証拠のある標準的な破損交換のような単純なケースはエスカレーションしてしまい、ポリシー例外を要するような複雑な状況は自律的に処理しようとしている。エスカレーションの精度を改善する最も効果的な方法は何か。",
              "en": "Your agent achieves 55% first-contact resolution, well below the 80% target. Logs show it escalates straightforward cases (standard damage replacements with photo evidence) while attempting to autonomously handle complex situations requiring policy exceptions. What's the most effective way to improve escalation calibration?"
            },
            {
              "ja": "A. システムプロンプトに、いつエスカレーションし、いつ自律的に解決すべきかを示すfew-shot例とともに、明示的なエスカレーション基準を追加する。",
              "en": "A. Add explicit escalation criteria to your system prompt with few-shot examples demonstrating when to escalate versus resolve autonomously."
            },
            {
              "ja": "B. 各応答の前にエージェントに信頼度スコア(1〜10)を自己申告させ、信頼度がしきい値を下回った場合に自動的に人間へルーティングする。",
              "en": "B. Have the agent self-report a confidence score (1-10) before each response and automatically route requests to humans when confidence falls below a threshold."
            },
            {
              "ja": "C. 過去のチケットで学習した別の分類モデルを配備し、メインのエージェントが処理を開始する前にどのリクエストがエスカレーションを必要とするかを予測する。",
              "en": "C. Deploy a separate classifier model trained on historical tickets to predict which requests need escalation before the main agent begins processing."
            },
            {
              "ja": "D. 顧客の不満レベルを検出する感情分析を実装し、ネガティブな感情がしきい値を超えた場合に自動的にエスカレーションする。",
              "en": "D. Implement sentiment analysis to detect customer frustration levels and automatically escalate when negative sentiment exceeds a threshold."
            },
            {
              "ja": "【正解】A。few-shot例を伴う明示的なエスカレーション基準の追加は、根本原因である不明瞭な判断境界に直接対処する。これは、インフラを追加する前に取るべき適切な最初の対応である。選択肢Bは、LLMが自己申告する信頼度の精度が低い(エージェントは難しいケースにおいてすでに不当に高い自信を持っている)ため失敗する。選択肢Cは、プロンプトの最適化がまだ試されていない段階でラベル付きデータやML基盤を要求するため過剰設計である。選択肢Dは全く別の問題を解決しようとしている。感情はケースの複雑さと相関しておらず、実際の問題ではない。",
              "en": "Correct Answer: A. Adding explicit escalation criteria with few-shot examples directly addresses the root cause: unclear decision boundaries. This is the proportionate first response before adding infrastructure. Option B fails because LLM self-reported confidence is poorly calibrated—the agent is already incorrectly confident on hard cases. Option C is over-engineered, requiring labeled data and ML infrastructure when prompt optimization hasn't been tried. Option D solves a different problem entirely; sentiment doesn't correlate with case complexity, which is the actual issue."
            }
          ]
        }
      ]
    },
    {
      "heading": "シナリオ: Claude Codeによるコード生成",
      "groups": [
        {
          "label": "Question 4",
          "sentences": [
            {
              "ja": "【問題】チームの標準的なコードレビューチェックリストを実行するカスタムの/reviewスラッシュコマンドを作成したい。このコマンドは、開発者がリポジトリをクローンまたはpullした際に、すべての開発者が利用できるようにしたい。このコマンドファイルはどこに作成すべきか。",
              "en": "You want to create a custom /review slash command that runs your team's standard code review checklist. This command should be available to every developer when they clone or pull the repository. Where should you create this command file?"
            },
            {
              "ja": "A. プロジェクトリポジトリ内の.claude/commands/ディレクトリ",
              "en": "A. In the .claude/commands/ directory in the project repository"
            },
            {
              "ja": "B. 各開発者のホームディレクトリの~/.claude/commands/",
              "en": "B. In ~/.claude/commands/ in each developer's home directory"
            },
            {
              "ja": "C. プロジェクトルートのCLAUDE.mdファイル",
              "en": "C. In the CLAUDE.md file at the project root"
            },
            {
              "ja": "D. commands配列を持つ.claude/config.jsonファイル",
              "en": "D. In a .claude/config.json file with a commands array"
            },
            {
              "ja": "【正解】A。プロジェクトスコープのカスタムスラッシュコマンドは、リポジトリ内の.claude/commands/ディレクトリに保存すべきである。これらのコマンドはバージョン管理され、リポジトリをクローンまたはpullしたすべての開発者に自動的に提供される。選択肢B(~/.claude/commands/)は、バージョン管理を通じて共有されない個人用コマンド向けである。選択肢C(CLAUDE.md)は、コマンドの定義ではなく、プロジェクトの指示や文脈のためのものである。選択肢Dは、Claude Codeには存在しない設定機構を説明している。",
              "en": "Correct Answer: A. Project-scoped custom slash commands should be stored in the .claude/commands/ directory within the repository. These commands are version-controlled and automatically available to all developers when they clone or pull the repo. Option B (~/.claude/commands/) is for personal commands that aren't shared via version control. Option C (CLAUDE.md) is for project instructions and context, not command definitions. Option D describes a configuration mechanism that doesn't exist in Claude Code."
            }
          ]
        },
        {
          "label": "Question 5",
          "sentences": [
            {
              "ja": "【問題】あなたはチームのモノリシックなアプリケーションをマイクロサービスに再構築する任務を割り当てられた。これには数十のファイルにわたる変更が伴い、サービス境界やモジュール依存関係に関する判断が必要になる。どのアプローチを取るべきか。",
              "en": "You've been assigned to restructure the team's monolithic application into microservices. This will involve changes across dozens of files and requires decisions about service boundaries and module dependencies. Which approach should you take?"
            },
            {
              "ja": "A. プランモードに入り、コードベースを探索し、依存関係を理解し、変更を加える前に実装アプローチを設計する。",
              "en": "A. Enter plan mode to explore the codebase, understand dependencies, and design an implementation approach before making changes."
            },
            {
              "ja": "B. 直接実行から始め、段階的に変更を加え、実装が自然なサービス境界を明らかにするようにする。",
              "en": "B. Start with direct execution and make changes incrementally, letting the implementation reveal the natural service boundaries."
            },
            {
              "ja": "C. 各サービスが正確にどのように構造化されるべきかを詳細に示す包括的な事前指示とともに直接実行を使用する。",
              "en": "C. Use direct execution with comprehensive upfront instructions detailing exactly how each service should be structured."
            },
            {
              "ja": "D. 直接実行モードで開始し、実装中に予期しない複雑さに遭遇した場合にのみプランモードに切り替える。",
              "en": "D. Begin in direct execution mode and only switch to plan mode if you encounter unexpected complexity during implementation."
            },
            {
              "ja": "【正解】A。プランモードは、大規模な変更、複数の有効なアプローチ、アーキテクチャ上の判断を伴う複雑なタスク向けに設計されており、これはまさにモノリスからマイクロサービスへの再構築が要求するものである。これにより、変更にコミットする前に安全なコードベースの探索と設計が可能になる。選択肢Bは、依存関係が後で発見された場合にコストのかかる手直しのリスクがある。選択肢Cは、コードを探索せずに正しい構造をすでに知っていることを前提としている。選択肢Dは、複雑さが後から出現するものではなく、要件の中で既に示されていることを無視している。",
              "en": "Correct Answer: A. Plan mode is designed for complex tasks involving large-scale changes, multiple valid approaches, and architectural decisions—exactly what monolith-to-microservices restructuring requires. It enables safe codebase exploration and design before committing to changes. Option B risks costly rework when dependencies are discovered late. Option C assumes you already know the right structure without exploring the code. Option D ignores that the complexity is already stated in the requirements, not something that might emerge later."
            }
          ]
        },
        {
          "label": "Question 6",
          "sentences": [
            {
              "ja": "【問題】あなたのコードベースには、異なるコーディング規約を持つ明確な領域がある。Reactコンポーネントはフックを使った関数型スタイル、APIハンドラーは特定のエラー処理を伴うasync/await、データベースモデルはリポジトリパターンに従う。テストファイルはテスト対象のコードの隣に(例:Button.test.tsxがButton.tsxの隣に)コードベース全体に散在しており、場所にかかわらずすべてのテストが同じ規約に従うようにしたい。Claudeがコード生成時に正しい規約を自動的に適用するようにする、最も保守性の高い方法は何か。",
              "en": "Your codebase has distinct areas with different coding conventions: React components use functional style with hooks, API handlers use async/await with specific error handling, and database models follow a repository pattern. Test files are spread throughout the codebase alongside the code they test (e.g., Button.test.tsx next to Button.tsx), and you want all tests to follow the same conventions regardless of location. What's the most maintainable way to ensure Claude automatically applies the correct conventions when generating code?"
            },
            {
              "ja": "A. .claude/rules/にYAMLフロントマターでglobパターンを指定したルールファイルを作成し、ファイルパスに基づいて規約を条件的に適用する。",
              "en": "A. Create rule files in .claude/rules/ with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths"
            },
            {
              "ja": "B. すべての規約をルートのCLAUDE.mdファイルに各領域ごとの見出しの下でまとめ、どのセクションが適用されるかはClaudeの推論に任せる。",
              "en": "B. Consolidate all conventions in the root CLAUDE.md file under headers for each area, relying on Claude to infer which section applies"
            },
            {
              "ja": "C. 各コードタイプ用に.claude/skills/にスキルを作成し、関連する規約をそれぞれのSKILL.mdファイルに含める。",
              "en": "C. Create skills in .claude/skills/ for each code type that include the relevant conventions in their SKILL.md files"
            },
            {
              "ja": "D. 各サブディレクトリにそのディレクトリ特有の規約を記載した個別のCLAUDE.mdファイルを配置する。",
              "en": "D. Place a separate CLAUDE.md file in each subdirectory containing that area's specific conventions"
            },
            {
              "ja": "【正解】A。選択肢Aが正しい理由は、globパターン(例:**/*.test.tsx)を使った.claude/rules/により、ディレクトリの場所にかかわらずファイルパスに基づいて規約を自動的に適用できるためで、これはコードベース全体に散在するテストファイルにとって不可欠である。選択肢Bは、明示的なマッチングではなく推論に依存しているため信頼性が低い。選択肢Cは、手動でのスキル呼び出しを要求するか、Claudeがそれらを読み込むかどうかに依存しており、ファイルパスに基づいた決定論的な「自動」適用の必要性と矛盾する。選択肢Dは、CLAUDE.mdファイルがディレクトリに紐づいているため、多数のディレクトリに散在するファイルを簡単には扱えない。",
              "en": "Correct Answer: A. Option A is correct because .claude/rules/ with glob patterns (e.g., **/*.test.tsx) allows conventions to be automatically applied based on file paths regardless of directory location, essential for test files spread throughout the codebase. Option B relies on inference rather than explicit matching, making it unreliable. Option C requires manual skill invocation or relies on Claude choosing to load them, contradicting the need for deterministic \"automatic\" application based on file paths. Option D can't easily handle files spread across many directories since CLAUDE.md files are directory-bound."
            }
          ]
        }
      ]
    }
  ]
};
