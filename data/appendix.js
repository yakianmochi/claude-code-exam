window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["appendix"] = {
  "id": "appendix",
  "title": "Appendix & Document Control",
  "titleJa": "付録・出題範囲外トピック",
  "summaryHtml": "<h3>全体像</h3><p>この付録は、試験ガイド本体(ドメイン1〜4)を補足する<strong>「試験に登場する技術・概念の一覧」「出題範囲内トピック」「出題範囲外トピック」</strong>の3リストと、ガイド自体の改訂履歴をまとめたものである。</p><h4>範囲の境界線</h4><ul><li>出題範囲内は、Claude Agent SDK・MCP・Claude Code・tool_use・JSON Schema・Pydantic検証・few-shotやプロンプトチェイニング・コンテキスト管理・セッション管理・信頼度スコアリングなど、<strong>エージェント設計・ツール連携・ワークフロー制御に関する概念や実装パターン</strong>が中心</li><li>出題範囲外は、<strong>Fine-tuningやモデル訓練、API認証・課金・アカウント管理、特定言語/フレームワークの実装詳細、MCPサーバーのインフラ構築、Claudeの内部アーキテクチャ、Constitutional AI/RLHF、埋め込み・ベクトルDB実装、Computer Use、画像解析、ストリーミングAPI実装、レート制限・料金計算、OAuth等の認証プロトコル詳細、特定クラウド(AWS/GCP/Azure)の設定、性能ベンチマーク、プロンプトキャッシュの実装詳細、トークナイゼーションの仕様</strong>など、より低レイヤーのインフラ・運用・研究領域</li></ul><p>つまり「Claudeをどう組み立て・制御し、ワークフローに組み込むか」は範囲内だが、「Claude自体をどう作るか」「周辺のクラウド/認証/運用インフラの詳細」は範囲外という境界になっている。</p>",
  "sections": [
    {
      "heading": "17. 付録:試験に登場する技術・概念",
      "groups": [
        {
          "label": "技術・概念一覧",
          "sentences": [
            {
              "ja": "Claude Agent SDK — エージェント定義、エージェント型ループ、stop_reasonの処理、フック(PostToolUse、ツール呼び出しの傍受)、Taskツールによるサブエージェント生成、allowedTools設定",
              "en": "Claude Agent SDK — agent definitions, agentic loops, stop_reason handling, hooks (PostToolUse, tool call interception), subagent spawning via Task tool, allowedTools configuration"
            },
            {
              "ja": "Model Context Protocol (MCP) — MCPサーバー、MCPツール、MCPリソース、isErrorフラグ、ツールの説明、ツールの配布、.mcp.json設定、環境変数の展開",
              "en": "Model Context Protocol (MCP) — MCP servers, MCP tools, MCP resources, isError flag, tool descriptions, tool distribution, .mcp.json configuration, environment variable expansion"
            },
            {
              "ja": "Claude Code — CLAUDE.md設定の階層(ユーザー/プロジェクト/ディレクトリ)、YAMLフロントマターでパスをスコープする.claude/rules/、スラッシュコマンド用の.claude/commands/、SKILL.mdフロントマター(context: fork、allowed-tools、argument-hint)を持つ.claude/skills/、プランモード、直接実行、/memoryコマンド、/compact、--resume、fork_session、Exploreサブエージェント",
              "en": "Claude Code — CLAUDE.md configuration hierarchy (user/project/directory), .claude/rules/ with YAML frontmatter path-scoping, .claude/commands/ for slash commands, .claude/skills/ with SKILL.md frontmatter (context: fork, allowed-tools, argument-hint), plan mode, direct execution, /memory command, /compact, --resume, fork_session, Explore subagent"
            },
            {
              "ja": "Claude Code CLI — 非対話モード用の-p / --printフラグ、--output-format json、構造化されたCI出力のための--json-schema",
              "en": "Claude Code CLI — -p / --print flag for non-interactive mode, --output-format json, --json-schema for structured CI output"
            },
            {
              "ja": "Claude API — JSON Schemaを伴うtool_use、tool_choiceのオプション(\"auto\"、\"any\"、強制的なツール選択)、stop_reasonの値(\"tool_use\"、\"end_turn\")、max_tokens、システムプロンプト",
              "en": "Claude API — tool_use with JSON schemas, tool_choice options (\"auto\", \"any\", forced tool selection), stop_reason values (\"tool_use\", \"end_turn\"), max_tokens, system prompts"
            },
            {
              "ja": "Message Batches API — コスト50%削減、最大24時間の処理ウィンドウ、リクエスト/レスポンスの対応付けのためのcustom_id、完了のポーリング、マルチターンのツール呼び出しは非対応",
              "en": "Message Batches API — 50% cost savings, up to 24-hour processing window, custom_id for request/response correlation, polling for completion, no multi-turn tool calling support"
            },
            {
              "ja": "JSON Schema — 必須フィールドと任意フィールド、enum型、null許容フィールド、\"other\" + 詳細文字列のパターン、構文エラーを排除するstrictモード",
              "en": "JSON Schema — required vs optional fields, enum types, nullable fields, \"other\" + detail string patterns, strict mode for syntax error elimination"
            },
            {
              "ja": "Pydantic — スキーマ検証、セマンティックな検証エラー、検証・再試行ループ",
              "en": "Pydantic — schema validation, semantic validation errors, validation-retry loops"
            },
            {
              "ja": "組み込みツール — Read、Write、Edit、Bash、Grep、Glob — それぞれの用途と選定基準",
              "en": "Built-in tools — Read, Write, Edit, Bash, Grep, Glob — their purposes and selection criteria"
            },
            {
              "ja": "Few-shotプロンプティング — あいまいなシナリオを狙った例示、フォーマットの提示、新規パターンへの一般化",
              "en": "Few-shot prompting — targeted examples for ambiguous scenarios, format demonstration, generalization to novel patterns"
            },
            {
              "ja": "プロンプトチェイニング — タスクを焦点を絞った複数のパスに順次分解すること",
              "en": "Prompt chaining — sequential task decomposition into focused passes"
            },
            {
              "ja": "コンテキストウィンドウ管理 — トークン予算、段階的な要約、lost-in-the-middle現象、コンテキストの抽出、スクラッチパッドファイル",
              "en": "Context window management — token budgets, progressive summarization, lost-in-the-middle effects, context extraction, scratchpad files"
            },
            {
              "ja": "セッション管理 — セッションの再開、fork_session、名前付きセッション、セッションのコンテキスト分離",
              "en": "Session management — session resumption, fork_session, named sessions, session context isolation"
            },
            {
              "ja": "信頼度スコアリング — フィールドレベルの信頼度、ラベル付き検証セットによるキャリブレーション、エラー率測定のための層別サンプリング",
              "en": "Confidence scoring — field-level confidence, calibration with labeled validation sets, stratified sampling for error rate measurement"
            }
          ]
        },
        {
          "label": "出題範囲内のトピック",
          "sentences": [
            {
              "ja": "エージェント型ループの実装:stop_reasonに基づく制御フロー、ツール結果の処理、ループ終了条件",
              "en": "Agentic loop implementation: control flow based on stop_reason, tool result handling, loop termination conditions"
            },
            {
              "ja": "マルチエージェントオーケストレーション:コーディネーター-サブエージェントパターン、タスク分解、並列サブエージェント実行、反復的改善ループ",
              "en": "Multi-agent orchestration: coordinator-subagent patterns, task decomposition, parallel subagent execution, iterative refinement loops"
            },
            {
              "ja": "サブエージェントのコンテキスト管理:明示的なコンテキストの受け渡し、構造化された状態の永続化、マニフェストを用いたクラッシュ復旧",
              "en": "Subagent context management: explicit context passing, structured state persistence, crash recovery using manifests"
            },
            {
              "ja": "ツールインターフェース設計:効果的なツールの説明の書き方、ツールの分割と統合、あいまいさを減らすツール命名",
              "en": "Tool interface design: writing effective tool descriptions, splitting vs consolidating tools, tool naming to reduce ambiguity"
            },
            {
              "ja": "MCPツールとリソースの設計:コンテンツカタログのためのリソース、アクションのためのツール、採用を促す説明の質",
              "en": "MCP tool and resource design: resources for content catalogs, tools for actions, description quality for adoption"
            },
            {
              "ja": "MCPサーバー設定:プロジェクトスコープとユーザースコープ、環境変数の展開、複数サーバーの同時アクセス",
              "en": "MCP server configuration: project vs user scope, environment variable expansion, multi-server simultaneous access"
            },
            {
              "ja": "エラー処理と伝播:構造化されたエラー応答、一時的エラー・業務エラー・権限エラーの区別、エスカレーション前のローカルでの復旧",
              "en": "Error handling and propagation: structured error responses, transient vs business vs permission errors, local recovery before escalation"
            },
            {
              "ja": "エスカレーションの意思決定:明示的な判断基準、顧客の希望の尊重、ポリシーの欠落の特定",
              "en": "Escalation decision-making: explicit criteria, honoring customer preferences, policy gap identification"
            },
            {
              "ja": "CLAUDE.md設定:階層構造(ユーザー/プロジェクト/ディレクトリ)、@importパターン、globパターンを用いた.claude/rules/",
              "en": "CLAUDE.md configuration: hierarchy (user/project/directory), @import patterns, .claude/rules/ with glob patterns"
            },
            {
              "ja": "カスタムコマンドとスキル:プロジェクトスコープとユーザースコープ、context: fork、allowed-tools、argument-hintフロントマター",
              "en": "Custom commands and skills: project vs user scope, context: fork, allowed-tools, argument-hint frontmatter"
            },
            {
              "ja": "プランモード対直接実行:複雑さの評価、アーキテクチャ上の意思決定、単一ファイルの変更",
              "en": "Plan mode vs direct execution: complexity assessment, architectural decisions, single-file changes"
            },
            {
              "ja": "反復的改善:入出力例、テスト駆動の反復、インタビューパターン、逐次的対並列的な課題解決",
              "en": "Iterative refinement: input/output examples, test-driven iteration, interview pattern, sequential vs parallel issue resolution"
            },
            {
              "ja": "tool_useによる構造化出力:スキーマ設計、tool_choiceの設定、ハルシネーションを防ぐためのnull許容フィールド",
              "en": "Structured output via tool_use: schema design, tool_choice configuration, nullable fields to prevent hallucination"
            },
            {
              "ja": "Few-shotプロンプティング:あいまいなシナリオの狙い方、フォーマットの一貫性、偽陽性の削減",
              "en": "Few-shot prompting: ambiguous scenario targeting, format consistency, false positive reduction"
            },
            {
              "ja": "バッチ処理:Message Batches APIの適用可否、レイテンシ許容度の評価、custom_idによる失敗処理",
              "en": "Batch processing: Message Batches API appropriateness, latency tolerance assessment, failure handling by custom_id"
            },
            {
              "ja": "コンテキストウィンドウの最適化:冗長なツール出力の削減、構造化された事実抽出、位置を意識した入力の並べ替え",
              "en": "Context window optimization: trimming verbose tool outputs, structured fact extraction, position-aware input ordering"
            },
            {
              "ja": "人間によるレビューワークフロー:信頼度のキャリブレーション、層別サンプリング、文書種別・フィールド別の精度分析",
              "en": "Human review workflows: confidence calibration, stratified sampling, accuracy segmentation by document type and field"
            },
            {
              "ja": "情報の出典管理:主張とソースの対応付け、時系列データの扱い、矛盾の注記、カバレッジの欠落報告",
              "en": "Information provenance: claim-source mappings, temporal data handling, conflict annotation, coverage gap reporting"
            }
          ]
        },
        {
          "label": "出題範囲外のトピック",
          "sentences": [
            {
              "ja": "Claudeモデルのファインチューニングやカスタムモデルの訓練",
              "en": "Fine-tuning Claude models or training custom models"
            },
            {
              "ja": "Claude APIの認証、課金、アカウント管理",
              "en": "Claude API authentication, billing, or account management"
            },
            {
              "ja": "特定のプログラミング言語やフレームワークの詳細な実装(ツールやスキーマの設定に必要な範囲を超えるもの)",
              "en": "Detailed implementation of specific programming languages or frameworks (beyond what's needed for tool and schema configuration)"
            },
            {
              "ja": "MCPサーバーのデプロイやホスティング(インフラ、ネットワーキング、コンテナオーケストレーション)",
              "en": "Deploying or hosting MCP servers (infrastructure, networking, container orchestration)"
            },
            {
              "ja": "Claudeの内部アーキテクチャ、訓練プロセス、モデルの重み",
              "en": "Claude's internal architecture, training process, or model weights"
            },
            {
              "ja": "Constitutional AI、RLHF、または安全性訓練の手法",
              "en": "Constitutional AI, RLHF, or safety training methodologies"
            },
            {
              "ja": "埋め込みモデルやベクトルデータベースの実装詳細",
              "en": "Embedding models or vector database implementation details"
            },
            {
              "ja": "Computer Use(ブラウザ自動操作、デスクトップ操作)",
              "en": "Computer use (browser automation, desktop interaction)"
            },
            {
              "ja": "画像解析・視覚認識機能",
              "en": "Vision/image analysis capabilities"
            },
            {
              "ja": "ストリーミングAPIの実装やサーバー送信イベント(SSE)",
              "en": "Streaming API implementation or server-sent events"
            },
            {
              "ja": "レート制限、クォータ、APIの料金計算",
              "en": "Rate limiting, quotas, or API pricing calculations"
            },
            {
              "ja": "OAuth、APIキーのローテーション、認証プロトコルの詳細",
              "en": "OAuth, API key rotation, or authentication protocol details"
            },
            {
              "ja": "特定のクラウドプロバイダー(AWS、GCP、Azure)の設定",
              "en": "Specific cloud provider configurations (AWS, GCP, Azure)"
            },
            {
              "ja": "パフォーマンスベンチマークやモデル比較の指標",
              "en": "Performance benchmarking or model comparison metrics"
            },
            {
              "ja": "プロンプトキャッシュの実装詳細(存在を知っている範囲を超えるもの)",
              "en": "Prompt caching implementation details (beyond knowing it exists)"
            },
            {
              "ja": "トークンカウントのアルゴリズムやトークナイゼーションの詳細",
              "en": "Token counting algorithms or tokenization specifics"
            }
          ]
        }
      ]
    },
    {
      "heading": "18. 文書管理(改訂履歴)",
      "groups": [
        {
          "label": "バージョン履歴",
          "sentences": [
            {
              "ja": "バージョン1.0:書式とレイアウトの更新(2026年7月)",
              "en": "Version 1.0: Formatting and layout updates (July 2026)"
            },
            {
              "ja": "バージョン0.2:草案の改訂(2026年6月)",
              "en": "Version 0.2: Draft revision (June 2026)"
            },
            {
              "ja": "バージョン0.1:初回草案(2026年2月)",
              "en": "Version 0.1: Initial draft (February 2026)"
            }
          ]
        }
      ]
    }
  ]
};
