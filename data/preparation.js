window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["preparation"] = {
  "id": "preparation",
  "title": "How to Prepare & Exercises",
  "titleJa": "学習の進め方・演習問題",
  "summaryHtml": "<h3>全体像</h3><p>本セクションは、試験対策として推奨される<strong>7つの学習アクション</strong>と、実践力を養う<strong>4つの演習問題</strong>をまとめている。</p><h4>学習の進め方</h4><ul><li>Agent SDKでのエージェント型ループの実装、実プロジェクトでのClaude Code設定、MCPツールの設計・テスト、構造化データ抽出パイプラインの構築、プロンプトエンジニアリング、コンテキスト管理パターン、エスカレーション/人間参加型ワークフローという7領域を横断的に練習することが推奨されている</li></ul><h4>4つの演習問題</h4><ul><li>演習1:エスカレーションロジック付きマルチツールエージェント(ドメイン1・2・5を強化)</li><li>演習2:チーム開発向けのClaude Code設定(ドメイン3・2を強化)</li><li>演習3:構造化データ抽出パイプライン(ドメイン4・5を強化)</li><li>演習4:マルチエージェント研究パイプラインの設計とデバッグ(ドメイン1・2・5を強化)</li></ul><p>いずれの演習も、単一ドメインではなく複数の試験ドメインを同時に補強するよう設計されている。</p>",
  "sections": [
    {
      "heading": "7. 学習の進め方",
      "groups": [
        {
          "label": "推奨される準備",
          "sentences": [
            {
              "ja": "Claude Agent SDKを使ってエージェントを構築する:ツール呼び出し、エラー処理、セッション管理を含む完全なエージェント型ループを実装する。サブエージェントの生成と、サブエージェント間でのコンテキストの受け渡しを練習する。",
              "en": "Build an agent with the Claude Agent SDK: implement a complete agentic loop with tool calling, error handling, and session management. Practice spawning subagents and passing context between them."
            },
            {
              "ja": "実際のプロジェクト向けにClaude Codeを設定する:設定階層を持つCLAUDE.mdを構築し、.claude/rules/にパス固有のルールを作成し、フロントマターオプション(context: fork、allowed-tools)を使ったカスタムスキルを作成し、少なくとも1つのMCPサーバーを統合する。",
              "en": "Configure Claude Code for a real project: set up CLAUDE.md with a configuration hierarchy, create path-specific rules in .claude/rules/, build custom skills with frontmatter options (context: fork, allowed-tools), and integrate at least one MCP server."
            },
            {
              "ja": "MCPツールを設計・テストする:類似したツールを明確に区別するツール説明を書く。エラーカテゴリと再試行可能フラグを持つ構造化エラーレスポンスを実装する。曖昧なリクエストに対するツール選択の信頼性をテストする。",
              "en": "Design and test MCP tools: write tool descriptions that clearly differentiate similar tools. Implement structured error responses with error categories and retryable flags. Test tool selection reliability with ambiguous requests."
            },
            {
              "ja": "構造化データ抽出パイプラインを構築する:JSONスキーマを用いたtool_useを使用し、検証・再試行ループを実装し、任意/null許容フィールドを持つスキーマを設計し、Message Batches APIを用いたバッチ処理を練習する。",
              "en": "Build a structured data extraction pipeline: use tool_use with JSON schemas, implement validation-retry loops, design schemas with optional/nullable fields, and practice batch processing with the Message Batches API."
            },
            {
              "ja": "プロンプトエンジニアリングの手法を練習する:曖昧なシナリオに対するfew-shot例を書く。誤検知を減らすための明示的なレビュー基準を定義する。大規模なコードレビューのための多段階レビューアーキテクチャを設計する。",
              "en": "Practice prompt engineering techniques: write few-shot examples for ambiguous scenarios. Define explicit review criteria to reduce false positives. Design multi-pass review architectures for large code reviews."
            },
            {
              "ja": "コンテキスト管理パターンを学習する:冗長なツール出力から構造化された事実を抽出する練習、長時間セッション用のスクラッチパッドファイルの実装、コンテキスト上限を管理するためのサブエージェントへの委任の設計を行う。",
              "en": "Study context management patterns: practice extracting structured facts from verbose tool outputs, implementing scratchpad files for long sessions, and designing subagent delegation to manage context limits."
            },
            {
              "ja": "エスカレーションとヒューマンインザループのパターンを見直す:自律的に解決すべき場合と、エスカレーションすべき場合(ポリシーの欠落、顧客からの要求、進行不能)を理解する。信頼度に基づくルーティングを用いた人間によるレビューワークフローの設計を練習する。",
              "en": "Review escalation and human-in-the-loop patterns: understand when to escalate (policy gaps, customer requests, inability to progress) versus resolve autonomously. Practice designing human review workflows with confidence-based routing."
            }
          ]
        }
      ]
    },
    {
      "heading": "8. 演習問題",
      "groups": [
        {
          "label": "演習1: エスカレーションロジックを備えたマルチツールエージェントの構築",
          "sentences": [
            {
              "ja": "ツール統合、構造化エラー処理、エスカレーションパターンを備えたエージェント型ループの設計を練習する。",
              "en": "Objective: Practice designing an agentic loop with tool integration, structured error handling, and escalation patterns."
            },
            {
              "ja": "各ツールの目的、期待される入力、境界条件を明確に区別する詳細な説明を持つ3〜4個のMCPツールを定義する。選択の混乱を避けるために注意深い説明を要する、類似機能を持つツールを少なくとも2つ含める。",
              "en": "Define 3-4 MCP tools with detailed descriptions that clearly differentiate each tool's purpose, expected inputs, and boundary conditions. Include at least two tools with similar functionality that require careful description to avoid selection confusion."
            },
            {
              "ja": "ツール実行を継続するか最終応答を提示するかを判断するためにstop_reasonを確認するエージェント型ループを実装する。「tool_use」と「end_turn」の両方の停止理由を正しく処理する。",
              "en": "Implement an agentic loop that checks stop_reason to determine whether to continue tool execution or present the final response. Handle both \"tool_use\" and \"end_turn\" stop reasons correctly."
            },
            {
              "ja": "ツールに構造化エラーレスポンスを追加する:errorCategory(transient/validation/permission)、isRetryableのブール値、人間が読める説明を含める。エージェントが各エラータイプを適切に処理すること(一時的エラーは再試行し、業務エラーはユーザーに説明する)をテストする。",
              "en": "Add structured error responses to your tools: include errorCategory (transient/validation/permission), isRetryable boolean, and human-readable descriptions. Test that the agent handles each error type appropriately (retrying transient errors, explaining business errors to the user)."
            },
            {
              "ja": "業務ルールを強制するためにツール呼び出しを傍受するプログラム的なフックを実装する(例:一定額を超える操作をブロックする)。トリガーされた場合はエスカレーションワークフローにリダイレクトする。",
              "en": "Implement a programmatic hook that intercepts tool calls to enforce a business rule (e.g., blocking operations above a threshold amount), redirecting to an escalation workflow when triggered."
            },
            {
              "ja": "複数の懸念事項を含むメッセージ(例:複数の問題を含むリクエスト)でテストし、エージェントがリクエストを分解し、各懸念事項を処理し、統一された応答に統合することを確認する。",
              "en": "Test with multi-concern messages (e.g., requests involving multiple issues) and verify the agent decomposes the request, handles each concern, and synthesizes a unified response."
            },
            {
              "ja": "強化されるドメイン:ドメイン1(エージェント型アーキテクチャとオーケストレーション)、ドメイン2(ツール設計とMCP統合)、ドメイン5(コンテキスト管理と信頼性)",
              "en": "Domains reinforced: Domain 1 (Agentic Architecture & Orchestration), Domain 2 (Tool Design & MCP Integration), Domain 5 (Context Management & Reliability)"
            }
          ]
        },
        {
          "label": "演習2: チーム開発ワークフロー向けのClaude Code設定",
          "sentences": [
            {
              "ja": "複数の開発者が関わるプロジェクトのために、CLAUDE.mdの階層、カスタムスラッシュコマンド、パス固有のルール、MCPサーバー統合を設定する練習をする。",
              "en": "Objective: Practice configuring CLAUDE.md hierarchies, custom slash commands, path-specific rules, and MCP server integration for a multi-developer project."
            },
            {
              "ja": "共通のコーディング規約とテスト規約を持つプロジェクトレベルのCLAUDE.mdを作成する。プロジェクトレベルに配置された指示がすべてのチームメンバーに一貫して適用されることを確認する。",
              "en": "Create a project-level CLAUDE.md with universal coding standards and testing conventions. Verify that instructions placed at the project level are consistently applied across all team members."
            },
            {
              "ja": "異なるコード領域に対して、YAMLフロントマターのglobパターンを持つ.claude/rules/ファイルを作成する(例:API規約にはpaths: [\"src/api/**/*\"]、テスト規約にはpaths: [\"**/*.test.*\"])。一致するファイルを編集する際にのみルールが読み込まれることをテストする。",
              "en": "Create .claude/rules/ files with YAML frontmatter glob patterns for different code areas (e.g., paths: [\"src/api/**/*\"] for API conventions, paths: [\"**/*.test.*\"] for testing conventions). Test that rules load only when editing matching files."
            },
            {
              "ja": "context: forkとallowed-toolsの制限を持つプロジェクトスコープのスキルを.claude/skills/に作成する。そのスキルがメインの会話コンテキストを汚染せずに独立して実行されることを確認する。",
              "en": "Create a project-scoped skill in .claude/skills/ with context: fork and allowed-tools restrictions. Verify the skill runs in isolation without polluting the main conversation context."
            },
            {
              "ja": ".mcp.jsonに、認証情報のための環境変数展開を用いたMCPサーバーを設定する。~/.claude.jsonに個人用の実験的なMCPサーバーを追加し、両方が同時に利用可能であることを確認する。",
              "en": "Configure an MCP server in .mcp.json with environment variable expansion for credentials. Add a personal experimental MCP server in ~/.claude.json and verify both are available simultaneously."
            },
            {
              "ja": "複雑さの異なるタスク(単一ファイルのバグ修正、複数ファイルにわたるライブラリ移行、複数の妥当な実装アプローチがある新機能)でプランモードと直接実行を比較テストする。プランモードがどのような場合に価値を発揮するかを観察する。",
              "en": "Test plan mode versus direct execution on tasks of varying complexity: a single-file bug fix, a multi-file library migration, and a new feature with multiple valid implementation approaches. Observe when plan mode provides value."
            },
            {
              "ja": "強化されるドメイン:ドメイン3(Claude Code設定とワークフロー)、ドメイン2(ツール設計とMCP統合)",
              "en": "Domains reinforced: Domain 3 (Claude Code Configuration & Workflows), Domain 2 (Tool Design & MCP Integration)"
            }
          ]
        },
        {
          "label": "演習3: 構造化データ抽出パイプラインの構築",
          "sentences": [
            {
              "ja": "JSONスキーマの設計、構造化出力のためのtool_useの使用、検証・再試行ループの実装、バッチ処理戦略の設計を練習する。",
              "en": "Objective: Practice designing JSON schemas, using tool_use for structured output, implementing validation-retry loops, and designing batch processing strategies."
            },
            {
              "ja": "必須フィールドと任意フィールド、「other」+詳細文字列パターンを持つenum、ソース文書に存在しない可能性がある情報のためのnull許容フィールドを含むJSONスキーマを持つ抽出ツールを定義する。一部のフィールドが欠落している文書を処理し、モデルが値を作り出すのではなくnullを返すことを確認する。",
              "en": "Define an extraction tool with a JSON schema containing required and optional fields, an enum with an \"other\" + detail string pattern, and nullable fields for information that may not exist in source documents. Process documents where some fields are absent and verify the model returns null rather than fabricating values."
            },
            {
              "ja": "検証・再試行ループを実装する:PydanticやJSONスキーマの検証が失敗した場合、文書、失敗した抽出結果、具体的な検証エラーを含む追加リクエストを送信する。再試行で解決可能なエラー(形式の不一致)と解決不可能なエラー(ソースに情報が存在しない)を区別して追跡する。",
              "en": "Implement a validation-retry loop: when Pydantic or JSON schema validation fails, send a follow-up request including the document, the failed extraction, and the specific validation error. Track which errors are resolvable via retry (format mismatches) versus which are not (information absent from source)."
            },
            {
              "ja": "様々な形式の文書(例:インライン引用と参考文献リスト、説明文と構造化された表)からの抽出を示すfew-shot例を追加し、構造的な多様性への対応が改善されることを確認する。",
              "en": "Add few-shot examples demonstrating extraction from documents with varied formats (e.g., inline citations vs bibliographies, narrative descriptions vs structured tables) and verify improved handling of structural variety."
            },
            {
              "ja": "バッチ処理戦略を設計する:Message Batches APIを使用して100件の文書のバッチを送信し、custom_idごとに失敗を処理し、修正を加えて(例:サイズが大きすぎる文書を分割して)失敗した文書を再送信し、SLA制約に対する総処理時間を計算する。",
              "en": "Design a batch processing strategy: submit a batch of 100 documents using the Message Batches API, handle failures by custom_id, resubmit failed documents with modifications (e.g., chunking oversized documents), and calculate total processing time relative to SLA constraints."
            },
            {
              "ja": "人間によるレビューへのルーティング戦略を実装する:モデルにフィールドレベルの信頼度スコアを出力させ、信頼度の低い抽出結果を人間のレビューに回し、文書タイプとフィールドごとに精度を分析して一貫した性能を確認する。",
              "en": "Implement a human review routing strategy: have the model output field-level confidence scores, route low-confidence extractions to human review, and analyze accuracy by document type and field to verify consistent performance."
            },
            {
              "ja": "強化されるドメイン:ドメイン4(プロンプトエンジニアリングと構造化出力)、ドメイン5(コンテキスト管理と信頼性)",
              "en": "Domains reinforced: Domain 4 (Prompt Engineering & Structured Output), Domain 5 (Context Management & Reliability)"
            }
          ]
        },
        {
          "label": "演習4: マルチエージェント研究パイプラインの設計とデバッグ",
          "sentences": [
            {
              "ja": "サブエージェントのオーケストレーション、コンテキストの受け渡しの管理、エラー伝播の実装、出典追跡を伴う統合処理を練習する。",
              "en": "Objective: Practice orchestrating subagents, managing context passing, implementing error propagation, and handling synthesis with provenance tracking."
            },
            {
              "ja": "少なくとも2つのサブエージェント(例:ウェブ検索と文書分析)に委任するコーディネーターエージェントを構築する。コーディネーターのallowedToolsに「Task」が含まれていること、および各サブエージェントが自動的なコンテキスト継承に依存せず調査結果をプロンプトに直接受け取ることを確認する。",
              "en": "Build a coordinator agent that delegates to at least two subagents (e.g., web search and document analysis). Ensure the coordinator's allowedTools includes \"Task\" and that each subagent receives its research findings directly in its prompt rather than relying on automatic context inheritance."
            },
            {
              "ja": "コーディネーターが1回の応答内で複数のTaskツール呼び出しを発行することで、サブエージェントの並列実行を実装する。逐次実行と比較したレイテンシの改善を測定する。",
              "en": "Implement parallel subagent execution by having the coordinator emit multiple Task tool calls in a single response. Measure the latency improvement compared to sequential execution."
            },
            {
              "ja": "コンテンツとメタデータを分離するサブエージェントの構造化出力を設計する:各発見事項には主張、証拠となる引用、ソースURL/文書名、公開日を含める。統合サブエージェントが発見事項を組み合わせる際にソースの帰属を保持することを確認する。",
              "en": "Design structured output for subagents that separates content from metadata: each finding should include a claim, evidence excerpt, source URL/document name, and publication date. Verify that the synthesis subagent preserves source attribution when combining findings."
            },
            {
              "ja": "エラー伝播を実装する:サブエージェントのタイムアウトをシミュレートし、コーディネーターが構造化されたエラーコンテキスト(失敗の種類、試行したクエリ、部分的な結果)を受け取ることを確認する。コーディネーターが部分的な結果で処理を継続でき、最終出力にカバレッジのギャップを注記できることをテストする。",
              "en": "Implement error propagation: simulate a subagent timeout and verify the coordinator receives structured error context (failure type, attempted query, partial results). Test that the coordinator can proceed with partial results and annotate the final output with coverage gaps."
            },
            {
              "ja": "矛盾するソースデータ(例:異なる統計値を示す2つの信頼できるソース)でテストし、統合出力が一方を任意に選ぶのではなく両方の値をソースの帰属と共に保持すること、また確立された知見と論争のある知見を区別する形でレポートを構成することを確認する。",
              "en": "Test with conflicting source data (e.g., two credible sources with different statistics) and verify the synthesis output preserves both values with source attribution rather than arbitrarily selecting one, and structures the report to distinguish well-established from contested findings."
            },
            {
              "ja": "強化されるドメイン:ドメイン1(エージェント型アーキテクチャとオーケストレーション)、ドメイン2(ツール設計とMCP統合)、ドメイン5(コンテキスト管理と信頼性)",
              "en": "Domains reinforced: Domain 1 (Agentic Architecture & Orchestration), Domain 2 (Tool Design & MCP Integration), Domain 5 (Context Management & Reliability)"
            }
          ]
        }
      ]
    }
  ]
};
