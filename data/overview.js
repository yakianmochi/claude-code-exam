window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["overview"] = {
  "id": "overview",
  "title": "Exam Overview & Scenarios",
  "titleJa": "試験概要・出題シナリオ",
  "summaryHtml": "<h3>全体像</h3><p>「Claude Certified Architect – Foundations」は、<strong>Claude Code・Claude Agent SDK・Claude API・MCPを使った実運用アーキテクチャの判断力</strong>を測る認定資格。想定される受験者は、これらを6か月以上実務で使ってきたソリューションアーキテクトである。</p><h4>試験の構成</h4><ul><li>問題数<strong>60問</strong>(多肢選択・複数選択混在)、時間<strong>120分</strong></li><li><strong>6つのシナリオバンクから4つが出題</strong>される(1シナリオ=複数問の文脈)</li><li>合格基準は<strong>スケールスコア720/1000</strong>、有効期間12か月</li><li>出題比重は「エージェント型アーキテクチャ27%」「ツール設計・MCP統合18%」「Claude Code設定20%」「プロンプトエンジニアリング20%」「コンテキスト管理15%」の5ドメイン</li></ul><h4>6つのシナリオ</h4><p>顧客サポートエージェント、Claude Codeによるコード生成、マルチエージェント研究システム、開発者向け生産性ツール、CI/CD連携、構造化データ抽出という<strong>実務に近い6つの文脈</strong>から4つが出題され、各シナリオは複数ドメインを横断して問われる。</p>",
  "sections": [
    {
      "heading": "1. 本認定資格について",
      "groups": [
        {
          "label": "認定の目的",
          "sentences": [
            {
              "ja": "「Claude Certified Architect – Foundations」認定資格は、実務者がClaudeを用いて実世界のソリューションを実装する際に、トレードオフについて十分な情報に基づいた意思決定ができることを証明するものである",
              "en": "The Claude Certified Architect – Foundations certification validates that practitioners can make informed decisions about tradeoffs when implementing real-world solutions with Claude"
            },
            {
              "ja": "この試験は、Claudeを用いた本番グレードのアプリケーション構築の中核技術であるClaude Code、Claude Agent SDK、Claude API、およびModel Context Protocol(MCP)にわたる基礎知識を評価する",
              "en": "This exam tests foundational knowledge across Claude Code, the Claude Agent SDK, the Claude API, and Model Context Protocol (MCP), the core technologies used to build production-grade applications with Claude"
            }
          ]
        },
        {
          "label": "出題の性質",
          "sentences": [
            {
              "ja": "本試験の問題は、顧客サポート向けエージェント型システムの構築、マルチエージェント研究パイプラインの設計、Claude CodeのCI/CDワークフローへの統合、開発者向け生産性ツールの構築、非構造化文書からの構造化データ抽出など、実際の顧客ユースケースに基づく現実的なシナリオに根ざしている",
              "en": "Questions on this exam are grounded in realistic scenarios drawn from actual customer use cases, including building agentic systems for customer support, designing multi-agent research pipelines, integrating Claude Code into CI/CD workflows, building developer productivity tools, and extracting structured data from unstructured documents"
            },
            {
              "ja": "受験者は、概念的な知識だけでなく、本番環境におけるアーキテクチャ・設定・トレードオフに関する実践的な判断力も示す必要がある",
              "en": "Candidates must demonstrate not only conceptual knowledge but practical judgment about architecture, configuration, and tradeoffs in production deployments"
            }
          ]
        },
        {
          "label": "本ガイドの位置づけ",
          "sentences": [
            {
              "ja": "本ガイドは、試験受験を準備する受験者にとっての正式な参照資料である",
              "en": "This guide is the authoritative reference for candidates preparing to sit the exam"
            },
            {
              "ja": "本ガイドでは試験内容を説明し、出題対象のドメインとタスクステートメントを列挙し、サンプル問題を提示し、準備のための戦略を推奨している",
              "en": "It describes the exam content, lists the domains and task statements tested, provides sample questions, and recommends preparation strategies"
            },
            {
              "ja": "試験を予約する前に、本ガイドを最後まで読むこと",
              "en": "Read it in full before scheduling your exam"
            }
          ]
        }
      ]
    },
    {
      "heading": "2. 対象者",
      "groups": [
        {
          "label": "想定される受験者像",
          "sentences": [
            {
              "ja": "本認定資格の理想的な受験者は、Claudeを用いた本番アプリケーションを設計・実装するソリューションアーキテクトであり、以下の実務経験を持つ",
              "en": "The ideal candidate for this certification is a solution architect who designs and implements production applications with Claude. This candidate has hands-on experience with:"
            }
          ]
        },
        {
          "label": "求められる実務経験",
          "sentences": [
            {
              "ja": "マルチエージェントのオーケストレーション、サブエージェントへの委任、ツール統合、ライフサイクルフックを含む、Claude Agent SDKを用いたエージェント型アプリケーションの構築",
              "en": "Building agentic applications using the Claude Agent SDK, including multi-agent orchestration, subagent delegation, tool integration, and lifecycle hooks"
            },
            {
              "ja": "CLAUDE.mdファイル、Agent Skills、MCPサーバー統合、プランモードを用いて、チームのワークフロー向けにClaude Codeを設定・カスタマイズすること",
              "en": "Configuring and customizing Claude Code for team workflows using CLAUDE.md files, Agent Skills, MCP server integrations, and plan mode"
            },
            {
              "ja": "バックエンドシステム統合のためのModel Context Protocol(MCP)のツール・リソースインターフェースの設計",
              "en": "Designing Model Context Protocol (MCP) tool and resource interfaces for backend system integration"
            },
            {
              "ja": "JSONスキーマ、Few-shot例、抽出パターンを活用し、信頼性の高い構造化出力を生成するプロンプトの設計",
              "en": "Engineering prompts that produce reliable structured output, leveraging JSON schemas, few-shot examples, and extraction patterns"
            },
            {
              "ja": "長大な文書、複数ターンにわたる会話、マルチエージェント間の引き渡しにおいて、コンテキストウィンドウを効果的に管理すること",
              "en": "Managing context windows effectively across long documents, multi-turn conversations, and multi-agent handoffs"
            },
            {
              "ja": "自動コードレビュー、テスト生成、プルリクエストへのフィードバックのために、ClaudeをCI/CDパイプラインに統合すること",
              "en": "Integrating Claude into CI/CD pipelines for automated code review, test generation, and pull request feedback"
            },
            {
              "ja": "エラー処理、human-in-the-loopのワークフロー、自己評価パターンを含む、健全なエスカレーションと信頼性に関する意思決定を行うこと",
              "en": "Making sound escalation and reliability decisions, including error handling, human-in-the-loop workflows, and self-evaluation patterns"
            }
          ]
        },
        {
          "label": "経験年数の目安",
          "sentences": [
            {
              "ja": "受験者は通常、Claude API、Agent SDK、Claude Code、MCPを用いた構築の実務経験を6か月以上持ち、本番環境における大規模言語モデルの能力と限界の両方を理解している",
              "en": "The candidate typically has 6+ months of practical experience building with Claude APIs, Agent SDK, Claude Code, and MCP, understanding both the capabilities and limitations of large language models in production environments"
            }
          ]
        }
      ]
    },
    {
      "heading": "3. 試験詳細の概要",
      "groups": [
        {
          "label": "試験概要データ",
          "sentences": [
            {
              "ja": "資格名: Claude Certified Architect – Foundations",
              "en": "Credential: Claude Certified Architect – Foundations"
            },
            {
              "ja": "試験コード: CCAR-F",
              "en": "Exam code: CCAR-F"
            },
            {
              "ja": "問題数: 60問",
              "en": "Number of items: 60"
            },
            {
              "ja": "出題形式: 多肢選択および複数選択形式の問題。各問題で選択すべき回答数が明示される",
              "en": "Item format: Multiple-choice and multiple-response items; each item states how many responses to select"
            },
            {
              "ja": "試験構成: 6つのシナリオバンクから4つのシナリオが出題される",
              "en": "Exam structure: 4 scenarios drawn from a bank of 6"
            },
            {
              "ja": "制限時間: 120分",
              "en": "Time limit: 120 minutes"
            },
            {
              "ja": "受験方式: 監督付き(プログラムのポリシーに応じてオンライン監督および/またはテストセンターでの受験)",
              "en": "Delivery: Proctored: online proctored and/or test center, per program policy"
            },
            {
              "ja": "合格基準: 100〜1,000のスケールで、スケールスコア720以上",
              "en": "Passing score: Scaled score of 720 on a scale of 100–1,000"
            },
            {
              "ja": "受験料: 125米ドル",
              "en": "Exam fee: $125 USD"
            },
            {
              "ja": "有効期間: 認定資格が授与された日から12か月間",
              "en": "Validity period: 12 months from the date the credential is awarded"
            },
            {
              "ja": "結果報告: 合否とスケールスコア(100〜1,000)に加え、スコアレポートにドメイン別の正答率が記載される",
              "en": "Result reporting: Pass/fail with scaled score (100–1,000), plus percent-correct by domain on the score report"
            }
          ]
        }
      ]
    },
    {
      "heading": "4. 出題範囲の概要(ブループリント)",
      "groups": [
        {
          "label": "ブループリントの説明",
          "sentences": [
            {
              "ja": "試験ブループリントは、測定対象となるコンテンツドメインと、試験におけるそれぞれの近似的な比重を定義している",
              "en": "The exam blueprint defines the content domains measured and the approximate weight of each domain on the exam"
            },
            {
              "ja": "比重は、職務タスク分析によって決定された、有能な業務遂行に対する各ドメインの相対的な重要度を反映している",
              "en": "Weights reflect the relative importance of each domain to competent performance as determined through the job task analysis"
            },
            {
              "ja": "パーセンテージは、各ドメインから出題される採点対象問題のおおよその割合を示している",
              "en": "The percentages indicate the approximate proportion of scored items drawn from each domain"
            }
          ]
        },
        {
          "label": "ドメイン別出題比重",
          "sentences": [
            {
              "ja": "ドメイン1 エージェント型アーキテクチャとオーケストレーション: 27%",
              "en": "Domain 1 Agentic Architecture & Orchestration: 27%"
            },
            {
              "ja": "ドメイン2 ツール設計とMCP統合: 18%",
              "en": "Domain 2 Tool Design & MCP Integration: 18%"
            },
            {
              "ja": "ドメイン3 Claude Codeの設定とワークフロー: 20%",
              "en": "Domain 3 Claude Code Configuration & Workflows: 20%"
            },
            {
              "ja": "ドメイン4 プロンプトエンジニアリングと構造化出力: 20%",
              "en": "Domain 4 Prompt Engineering & Structured Output: 20%"
            },
            {
              "ja": "ドメイン5 コンテキスト管理と信頼性: 15%",
              "en": "Domain 5 Context Management & Reliability: 15%"
            },
            {
              "ja": "合計: 100%",
              "en": "Total: 100%"
            }
          ]
        }
      ]
    },
    {
      "heading": "5. 出題シナリオ",
      "groups": [
        {
          "label": "シナリオ形式の説明",
          "sentences": [
            {
              "ja": "本試験ではシナリオ型の問題が使用される",
              "en": "The exam uses scenario-based questions"
            },
            {
              "ja": "各シナリオは、一連の問題の枠組みとなる現実的な本番環境の文脈を提示する",
              "en": "Each scenario presents a realistic production context that frames a set of questions"
            },
            {
              "ja": "試験当日は、以下の全6シナリオの中からランダムに選ばれた4シナリオが出題される",
              "en": "During the exam, 4 scenarios are presented and picked at random from the full set of the 6 scenarios below"
            }
          ]
        },
        {
          "label": "シナリオ1: 顧客サポート解決エージェント",
          "sentences": [
            {
              "ja": "Claude Agent SDKを使用して顧客サポート解決エージェントを構築している",
              "en": "You are building a customer support resolution agent using the Claude Agent SDK"
            },
            {
              "ja": "このエージェントは、返品、請求に関する紛争、アカウント関連の問題といった曖昧さの高いリクエストを処理する",
              "en": "The agent handles high-ambiguity requests like returns, billing disputes, and account issues"
            },
            {
              "ja": "カスタムMCPツール(get_customer、lookup_order、process_refund、escalate_to_human)を通じてバックエンドシステムにアクセスできる",
              "en": "It has access to your backend systems through custom Model Context Protocol (MCP) tools (get_customer, lookup_order, process_refund, escalate_to_human)"
            },
            {
              "ja": "目標は、いつ人間へエスカレーションすべきかを理解しつつ、初回対応での解決率80%以上を達成することである",
              "en": "Your target is 80%+ first-contact resolution while knowing when to escalate"
            },
            {
              "ja": "主要ドメイン: エージェント型アーキテクチャとオーケストレーション、ツール設計とMCP統合、コンテキスト管理と信頼性",
              "en": "Primary domains: Agentic Architecture & Orchestration, Tool Design & MCP Integration, Context Management & Reliability"
            }
          ]
        },
        {
          "label": "シナリオ2: Claude Codeによるコード生成",
          "sentences": [
            {
              "ja": "Claude Codeを使用してソフトウェア開発を加速させている",
              "en": "You are using Claude Code to accelerate software development"
            },
            {
              "ja": "チームはコード生成、リファクタリング、デバッグ、ドキュメント作成にClaude Codeを使用している",
              "en": "Your team uses it for code generation, refactoring, debugging, and documentation"
            },
            {
              "ja": "カスタムスラッシュコマンドやCLAUDE.md設定を用いて開発ワークフローに組み込む必要があり、プランモードと直接実行のどちらを使うべきかを理解する必要がある",
              "en": "You need to integrate it into your development workflow with custom slash commands, CLAUDE.md configurations, and understand when to use plan mode vs direct execution"
            },
            {
              "ja": "主要ドメイン: Claude Codeの設定とワークフロー、コンテキスト管理と信頼性",
              "en": "Primary domains: Claude Code Configuration & Workflows, Context Management & Reliability"
            }
          ]
        },
        {
          "label": "シナリオ3: マルチエージェント研究システム",
          "sentences": [
            {
              "ja": "Claude Agent SDKを使用してマルチエージェント研究システムを構築している",
              "en": "You are building a multi-agent research system using the Claude Agent SDK"
            },
            {
              "ja": "コーディネーターエージェントが専門化されたサブエージェントに作業を委任する。1つはウェブ検索を行い、1つは文書を分析し、1つは調査結果を統合し、1つはレポートを生成する",
              "en": "A coordinator agent delegates to specialized subagents: one searches the web, one analyzes documents, one synthesizes findings, and one generates reports"
            },
            {
              "ja": "このシステムはトピックを調査し、出典を明記した包括的なレポートを作成する",
              "en": "The system researches topics and produces comprehensive, cited reports"
            },
            {
              "ja": "主要ドメイン: エージェント型アーキテクチャとオーケストレーション、ツール設計とMCP統合、コンテキスト管理と信頼性",
              "en": "Primary domains: Agentic Architecture & Orchestration, Tool Design & MCP Integration, Context Management & Reliability"
            }
          ]
        },
        {
          "label": "シナリオ4: Claudeによる開発者向け生産性向上",
          "sentences": [
            {
              "ja": "Claude Agent SDKを使用して開発者向けの生産性向上ツールを構築している",
              "en": "You are building developer productivity tools using the Claude Agent SDK"
            },
            {
              "ja": "このエージェントは、エンジニアが未知のコードベースを探索し、レガシーシステムを理解し、定型的なコードを生成し、繰り返し作業を自動化するのを支援する",
              "en": "The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate code, and automate repetitive tasks"
            },
            {
              "ja": "組み込みツール(Read、Write、Bash、Grep、Glob)を使用し、MCPサーバーと統合する",
              "en": "It uses the built-in tools (Read, Write, Bash, Grep, Glob) and integrates with Model Context Protocol (MCP) servers"
            },
            {
              "ja": "主要ドメイン: ツール設計とMCP統合、Claude Codeの設定とワークフロー、エージェント型アーキテクチャとオーケストレーション",
              "en": "Primary domains: Tool Design & MCP Integration, Claude Code Configuration & Workflows, Agentic Architecture & Orchestration"
            }
          ]
        },
        {
          "label": "シナリオ5: 継続的インテグレーションのためのClaude Code",
          "sentences": [
            {
              "ja": "Claude CodeをCI/CD(継続的インテグレーション/継続的デリバリー)パイプラインに統合している",
              "en": "You are integrating Claude Code into your Continuous Integration/Continuous Deployment (CI/CD) pipeline"
            },
            {
              "ja": "このシステムは自動コードレビューを実行し、テストケースを生成し、プルリクエストへのフィードバックを提供する",
              "en": "The system runs automated code reviews, generates test cases, and provides feedback on pull requests"
            },
            {
              "ja": "実用的なフィードバックを提供し、誤検知を最小限に抑えるプロンプトを設計する必要がある",
              "en": "You need to design prompts that provide actionable feedback and minimize false positives"
            },
            {
              "ja": "主要ドメイン: Claude Codeの設定とワークフロー、プロンプトエンジニアリングと構造化出力",
              "en": "Primary domains: Claude Code Configuration & Workflows, Prompt Engineering & Structured Output"
            }
          ]
        },
        {
          "label": "シナリオ6: 構造化データ抽出",
          "sentences": [
            {
              "ja": "Claudeを使用して構造化データ抽出システムを構築している",
              "en": "You are building a structured data extraction system using Claude"
            },
            {
              "ja": "このシステムは非構造化文書から情報を抽出し、JSONスキーマを用いて出力を検証し、高い精度を維持する",
              "en": "The system extracts information from unstructured documents, validates the output using JavaScript Object Notation (JSON) schemas, and maintains high accuracy"
            },
            {
              "ja": "エッジケースを適切に処理し、下流のシステムと統合できなければならない",
              "en": "It must handle edge cases gracefully and integrate with downstream systems"
            },
            {
              "ja": "主要ドメイン: プロンプトエンジニアリングと構造化出力、コンテキスト管理と信頼性",
              "en": "Primary domains: Prompt Engineering & Structured Output, Context Management & Reliability"
            }
          ]
        }
      ]
    }
  ]
};
