window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["domain2"] = {
  "id": "domain2",
  "title": "Domain 2: Tool Design & MCP Integration",
  "titleJa": "ドメイン2: ツール設計とMCP統合",
  "summaryHtml": "<h3>全体像</h3><p>このドメインは、<strong>エージェントが正しいツールを正しく選び、失敗しても適切に回復できるようにするための設計知識</strong>を扱う。5つのタスクは大きく3つの塊に分けられる。</p><h4>① ツール記述の設計(2.1)</h4><ul><li>LLMのツール選択は<strong>ツール記述の文言そのもの</strong>に強く依存する。曖昧・重複した記述は誤選択(ミスルーティング)を招く</li><li>入力形式・例・境界条件を明記し、似たツール同士は<strong>名前と説明で明確に差別化</strong>する。汎用ツールは目的別に分割する</li></ul><h4>② エラー設計とツール配分(2.2・2.3)</h4><ul><li>MCPの<code>isError</code>フラグと、<strong>一過性・検証・ビジネス・権限エラーの分類</strong>を使い、<code>errorCategory</code>や<code>isRetryable</code>などの構造化メタデータを返す</li><li>1エージェントに持たせるツール数を絞り(例:18個ではなく4〜5個)、役割外のツールを持たせない。<code>tool_choice</code>(auto/any/forced)で選択を制御する</li></ul><h4>③ MCP統合とビルトインツール活用(2.4・2.5)</h4><ul><li><code>.mcp.json</code>(プロジェクト共有)と<code>~/.claude.json</code>(個人用)でMCPサーバーをスコープし、環境変数展開でシークレットを扱う。MCPリソースでカタログを事前公開し探索的呼び出しを減らす</li><li>Grep/Glob/Read/Write/Edit/Bashを適材適所で使い分け、Editが失敗したらRead+Writeにフォールバックする</li></ul>",
  "sections": [
    {
      "heading": "タスクステートメント2.1: 明確な説明と境界を持つ効果的なツールインターフェースの設計",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "LLMがツールを選択する際の主要なメカニズムとしてのツール記述—最小限の記述は類似ツール間での信頼性の低い選択につながる",
              "en": "Tool descriptions as the primary mechanism LLMs use for tool selection; minimal descriptions lead to unreliable selection among similar tools"
            },
            {
              "ja": "ツール記述に入力形式、クエリの例、エッジケース、境界の説明を含めることの重要性",
              "en": "The importance of including input formats, example queries, edge cases, and boundary explanations in tool descriptions"
            },
            {
              "ja": "曖昧または重複するツール記述がどのように誤選択を引き起こすか(例:ほぼ同一の記述を持つanalyze_content対analyze_document)",
              "en": "How ambiguous or overlapping tool descriptions cause misrouting (e.g., analyze_content vs analyze_document with near-identical descriptions)"
            },
            {
              "ja": "システムプロンプトの文言がツール選択に与える影響:キーワードに敏感な指示が意図しないツールの関連付けを生み出す可能性がある",
              "en": "The impact of system prompt wording on tool selection: keyword-sensitive instructions can create unintended tool associations"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "各ツールの目的、想定される入力・出力、類似する代替ツールとの使い分けを明確に区別するツール記述の記述",
              "en": "Writing tool descriptions that clearly differentiate each tool's purpose, expected inputs, outputs, and when to use it versus similar alternatives"
            },
            {
              "ja": "機能的な重複を排除するためにツールの名前と記述を変更する(例:analyze_contentをウェブ特有の記述を持つextract_web_resultsに改名する)",
              "en": "Renaming tools and updating descriptions to eliminate functional overlap (e.g., renaming analyze_content to extract_web_results with a web-specific description)"
            },
            {
              "ja": "汎用ツールを、定義された入出力契約を持つ目的別のツールに分割する(例:汎用のanalyze_documentをextract_data_points、summarize_content、verify_claim_against_sourceに分割する)",
              "en": "Splitting generic tools into purpose-specific tools with defined input/output contracts (e.g., splitting a generic analyze_document into extract_data_points, summarize_content, and verify_claim_against_source)"
            },
            {
              "ja": "うまく書かれたツール記述を上書きしてしまう可能性のあるキーワードに敏感な指示について、システムプロンプトを見直す",
              "en": "Reviewing system prompts for keyword-sensitive instructions that might override well-written tool descriptions"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント2.2: MCPツールのための構造化されたエラーレスポンスの実装",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "ツールの失敗をエージェントに伝えるためのMCPのisErrorフラグパターン",
              "en": "The MCP isError flag pattern for communicating tool failures back to the agent"
            },
            {
              "ja": "一過性エラー(タイムアウト、サービス利用不可)、検証エラー(無効な入力)、ビジネスエラー(ポリシー違反)、権限エラーの区別",
              "en": "The distinction between transient errors (timeouts, service unavailability), validation errors (invalid input), business errors (policy violations), and permission errors"
            },
            {
              "ja": "一様なエラーレスポンス(汎用的な「処理に失敗しました」)がなぜエージェントの適切な回復判断を妨げるのか",
              "en": "Why uniform error responses (generic \"Operation failed\") prevent the agent from making appropriate recovery decisions"
            },
            {
              "ja": "再試行可能なエラーと再試行不可能なエラーの違い、および構造化されたメタデータを返すことが無駄な再試行を防ぐ方法",
              "en": "The difference between retryable and non-retryable errors, and how returning structured metadata prevents wasted retry attempts"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "errorCategory(一過性/検証/権限)、isRetryableのブール値、人間が読める説明を含む構造化されたエラーメタデータを返す",
              "en": "Returning structured error metadata including errorCategory (transient/validation/permission), isRetryable boolean, and human-readable descriptions"
            },
            {
              "ja": "エージェントが適切に伝達できるように、ビジネスルール違反に対してretriable: falseフラグと顧客向けの分かりやすい説明を含める",
              "en": "Including retriable: false flags and customer-friendly explanations for business rule violations so the agent can communicate appropriately"
            },
            {
              "ja": "一過性の失敗に対してサブエージェント内でローカルなエラー回復を実装し、ローカルで解決できないエラーのみを、部分的な結果と試みた内容と共にコーディネーターに伝播させる",
              "en": "Implementing local error recovery within subagents for transient failures, propagating to the coordinator only errors that cannot be resolved locally along with partial results and what was attempted"
            },
            {
              "ja": "(再試行の判断を必要とする)アクセス失敗と、(一致するものがない成功したクエリを表す)有効な空の結果を区別する",
              "en": "Distinguishing between access failures (needing retry decisions) and valid empty results (representing successful queries with no matches)"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント2.3: エージェント間でのツールの適切な配分とツール選択の設定",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "エージェントに過剰な数のツールへのアクセスを与える(例:4〜5個ではなく18個)ことは、意思決定の複雑さを増大させることでツール選択の信頼性を低下させるという原則",
              "en": "The principle that giving an agent access to too many tools (e.g., 18 instead of 4-5) degrades tool selection reliability by increasing decision complexity"
            },
            {
              "ja": "専門分野外のツールを持つエージェントがそれらを誤用しがちな理由(例:統合エージェントがウェブ検索を試みる)",
              "en": "Why agents with tools outside their specialization tend to misuse them (e.g., a synthesis agent attempting web searches)"
            },
            {
              "ja": "スコープを絞ったツールアクセス:各エージェントにその役割に必要なツールのみを与え、特定の高頻度ニーズのために限定的なクロスロールツールを用意する",
              "en": "Scoped tool access: giving agents only the tools needed for their role, with limited cross-role tools for specific high-frequency needs"
            },
            {
              "ja": "tool_choiceの設定オプション:「auto」、「any」、強制的なツール選択({\"type\": \"tool\", \"name\": \"...\"})",
              "en": "tool_choice configuration options: \"auto\", \"any\", and forced tool selection ({\"type\": \"tool\", \"name\": \"...\"})"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "各サブエージェントのツールセットをその役割に関連するものに制限し、専門分野を越えた誤用を防ぐ",
              "en": "Restricting each subagent's tool set to those relevant to its role, preventing cross-specialization misuse"
            },
            {
              "ja": "汎用ツールを制約付きの代替ツールに置き換える(例:fetch_urlを、文書URLを検証するload_documentに置き換える)",
              "en": "Replacing generic tools with constrained alternatives (e.g., replacing fetch_url with load_document that validates document URLs)"
            },
            {
              "ja": "高頻度のニーズに対してスコープを絞ったクロスロールツールを提供しつつ(例:統合エージェント用のverify_factツール)、複雑なケースはコーディネーター経由で処理する",
              "en": "Providing scoped cross-role tools for high-frequency needs (e.g., a verify_fact tool for the synthesis agent) while routing complex cases through the coordinator"
            },
            {
              "ja": "特定のツールが最初に呼び出されることを保証するためにtool_choiceの強制選択を使用する(例:拡張ツールの前にextract_metadataを強制する)、その後の手順は後続のターンで処理する",
              "en": "Using tool_choice forced selection to ensure a specific tool is called first (e.g., forcing extract_metadata before enrichment tools), then processing subsequent steps in follow-up turns"
            },
            {
              "ja": "モデルが会話的なテキストを返すのではなく必ずツールを呼び出すことを保証するために、tool_choice: \"any\"を設定する",
              "en": "Setting tool_choice: \"any\" to guarantee the model calls a tool rather than returning conversational text"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント2.4: MCPサーバーをClaude Codeとエージェントワークフローに統合する",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "MCPサーバーのスコープ:チーム共有ツール用のプロジェクトレベル(.mcp.json)対、個人用/実験用のユーザーレベル(~/.claude.json)",
              "en": "MCP server scoping: project-level (.mcp.json) for shared team tooling vs user-level (~/.claude.json) for personal/experimental servers"
            },
            {
              "ja": "シークレットをコミットせずに認証情報を管理するための.mcp.json内の環境変数展開(例:${GITHUB_TOKEN})",
              "en": "Environment variable expansion in .mcp.json (e.g., ${GITHUB_TOKEN}) for credential management without committing secrets"
            },
            {
              "ja": "設定されたすべてのMCPサーバーからのツールが接続時に発見され、エージェントに同時に利用可能になること",
              "en": "That tools from all configured MCP servers are discovered at connection time and available simultaneously to the agent"
            },
            {
              "ja": "探索的なツール呼び出しを減らすために、コンテンツカタログ(例:issueの要約、ドキュメントの階層、データベーススキーマ)をエージェントに公開するメカニズムとしてのMCPリソース",
              "en": "MCP resources as a mechanism for exposing content catalogs (e.g., issue summaries, documentation hierarchies, database schemas) to reduce exploratory tool calls"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "認証トークンのための環境変数展開を用いて、プロジェクトスコープの.mcp.jsonで共有MCPサーバーを設定する",
              "en": "Configuring shared MCP servers in project-scoped .mcp.json with environment variable expansion for authentication tokens"
            },
            {
              "ja": "ユーザースコープの~/.claude.jsonで個人用/実験用のMCPサーバーを設定する",
              "en": "Configuring personal/experimental MCP servers in user-scoped ~/.claude.json"
            },
            {
              "ja": "エージェントが(Grepのような)組み込みツールを、より高機能なMCPツールよりも優先してしまうことを防ぐために、MCPツールの記述を強化し能力や出力を詳細に説明する",
              "en": "Enhancing MCP tool descriptions to explain capabilities and outputs in detail, preventing the agent from preferring built-in tools (like Grep) over more capable MCP tools"
            },
            {
              "ja": "標準的な統合(例:Jira)については既存のコミュニティMCPサーバーを選び、カスタムサーバーはチーム固有のワークフロー用に確保する",
              "en": "Choosing existing community MCP servers over custom implementations for standard integrations (e.g., Jira), reserving custom servers for team-specific workflows"
            },
            {
              "ja": "探索的なツール呼び出しを必要とせずにエージェントが利用可能なデータを把握できるように、コンテンツカタログをMCPリソースとして公開する",
              "en": "Exposing content catalogs as MCP resources to give agents visibility into available data without requiring exploratory tool calls"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント2.5: 組み込みツール(Read、Write、Edit、Bash、Grep、Glob)を効果的に選択・適用する",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "コンテンツ検索のためのGrep(関数名、エラーメッセージ、importステートメントなどのパターンについてファイルの内容を検索する)",
              "en": "Grep for content search (searching file contents for patterns like function names, error messages, or import statements)"
            },
            {
              "ja": "ファイルパスのパターンマッチングのためのGlob(名前や拡張子のパターンでファイルを見つける)",
              "en": "Glob for file path pattern matching (finding files by name or extension patterns)"
            },
            {
              "ja": "完全なファイル操作のためのRead/Write、一意なテキストマッチングを用いた対象を絞った変更のためのEdit",
              "en": "Read/Write for full file operations; Edit for targeted modifications using unique text matching"
            },
            {
              "ja": "テキストの一致が一意でないためにEditが失敗した場合、信頼性の高いファイル変更のためにRead + Writeをフォールバックとして使用する",
              "en": "When Edit fails due to non-unique text matches, using Read + Write as a fallback for reliable file modifications"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "コードベース全体でコード内容を検索するためにGrepを選択する(例:関数のすべての呼び出し元を見つける、エラーメッセージを特定する)",
              "en": "Selecting Grep for searching code content across a codebase (e.g., finding all callers of a function, locating error messages)"
            },
            {
              "ja": "命名パターンに一致するファイルを見つけるためにGlobを選択する(例:**/*.test.tsx)",
              "en": "Selecting Glob for finding files matching naming patterns (e.g., **/*.test.tsx)"
            },
            {
              "ja": "Editが一意な目印となるテキストを見つけられない場合に、完全なファイル内容を読み込むためにReadを使用し、その後Writeを使用する",
              "en": "Using Read to load full file contents followed by Write when Edit cannot find unique anchor text"
            },
            {
              "ja": "コードベースの理解を段階的に構築する:すべてのファイルを事前に読み込むのではなく、まずGrepでエントリーポイントを見つけ、次にReadでインポートをたどりフローを追跡する",
              "en": "Building codebase understanding incrementally: starting with Grep to find entry points, then using Read to follow imports and trace flows, rather than reading all files upfront"
            },
            {
              "ja": "まずすべてのエクスポート名を特定し、次にコードベース全体で各名前を検索することで、ラッパーモジュールを越えて関数の使用状況を追跡する",
              "en": "Tracing function usage across wrapper modules by first identifying all exported names, then searching for each name across the codebase"
            }
          ]
        }
      ]
    }
  ]
};
