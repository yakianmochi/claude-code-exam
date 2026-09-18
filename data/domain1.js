window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["domain1"] = {
  "id": "domain1",
  "title": "Domain 1: Agentic Architecture & Orchestration",
  "titleJa": "ドメイン1: エージェント型アーキテクチャとオーケストレーション",
  "summaryHtml": "<h3>全体像</h3><p>このドメインは、<strong>Claudeを「単発の応答者」ではなく「自律的に動くエージェント」として動かすための設計・実装知識</strong>を扱う。7つのタスクは大きく4つの塊に分けられる。</p><h4>① 基本ループの理解(1.1)</h4><ul><li>エージェントは「リクエスト→stop_reasonの判定→ツール実行→結果を履歴に追加→次の反復」を繰り返す</li><li>終了判定は<strong>必ずstop_reason(\"end_turn\")で行う</strong>。テキストの内容解析や反復回数上限を主判定にするのはアンチパターン</li></ul><h4>② マルチエージェント設計(1.2・1.3)</h4><ul><li><strong>ハブアンドスポーク型</strong>:コーディネーターが全サブエージェントとの通信・エラー処理・情報ルーティングを一元管理</li><li>サブエージェントは<strong>コンテキストを自動継承しない</strong>ため、必要な情報(調査結果・メタデータ)はプロンプトに明示的に埋め込む</li><li>コーディネーターは「毎回全パイプラインを回す」のではなく、<strong>クエリに応じて動的にサブエージェントを選別</strong>し、範囲分担で重複を防ぎ、ギャップがあれば再委任するループを組む</li><li>並列実行は<strong>1回の応答内で複数Task呼び出しを同時発行</strong>することで実現(逐次ターンではない)</li><li>手順を細かく指示するより、<strong>目標と品質基準を渡して自律性を持たせる</strong>設計が推奨される</li></ul><h4>③ ワークフロー制御と保証(1.4・1.5)</h4><ul><li><strong>プロンプトによる指示だけでは失敗率がゼロにならない</strong>ため、本人確認や金額しきい値など「確実に守らせたいルール」はSDKの<strong>フック(PostToolUseなど)や前提条件ゲート</strong>でプログラム的に強制する</li><li>フックの2つの使い道:①ツール結果の正規化(異なるデータ形式の統一)、②ツール呼び出しの傍受による業務ルール強制(閾値超えの返金をブロックし人間対応へリダイレクト等)</li><li>人間へのエスカレーション時は、会話履歴を持たない担当者のために<strong>構造化された引き渡し要約</strong>(顧客ID・根本原因・金額・推奨対応)を作る</li></ul><h4>④ タスク分解とセッション管理(1.6・1.7)</h4><ul><li><strong>決まった手順のレビュー</strong>→プロンプトチェイニング(ファイル単位分析→クロスファイル統合)</li><li><strong>オープンエンドな調査</strong>→動的分解(発見に応じて計画を更新)</li><li>セッションは<code>--resume</code>で名前付き継続、<code>fork_session</code>で分岐探索。<strong>古い情報での再開より、要約を注入した新規セッションの方が信頼性が高い</strong>場合がある点に注意</li></ul><h4>覚えるべき「対比のキーワード」まとめ表</h4><table><thead><tr><th>観点</th><th>良いプラクティス</th><th>アンチパターン</th></tr></thead><tbody><tr><td>ループ終了判定</td><td>stop_reason == \"end_turn\"</td><td>テキスト解析／反復回数上限</td></tr><tr><td>サブエージェント選択</td><td>クエリに応じ動的選定</td><td>常に全パイプライン実行</td></tr><tr><td>コンテキスト伝達</td><td>プロンプトに明示的に含める</td><td>自動継承を前提にする</td></tr><tr><td>ルール強制</td><td>フック(決定論的)</td><td>プロンプトのみ(確率的)</td></tr><tr><td>コードレビュー分解</td><td>チェイニング(ファイル→統合)</td><td>一括で全部見る</td></tr><tr><td>調査タスク分解</td><td>動的・適応的計画</td><td>固定シーケンス</td></tr><tr><td>セッション再開</td><td>変更点を明示 or 要約注入で新規開始</td><td>古いツール結果のまま再開</td></tr></tbody></table>",
  "sections": [
    {
      "heading": "タスクステートメント1.1: 自律的なタスク実行のためのエージェント型ループの設計と実装",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "エージェント型ループのライフサイクル: Claudeへのリクエスト送信、stop_reason(「tool_use」対「end_turn」)の確認、要求されたツールの実行、次の反復のための結果の返却",
              "en": "The agentic loop lifecycle: sending requests to Claude, inspecting stop_reason (\"tool_use\" vs \"end_turn\"), executing requested tools, and returning results for the next iteration"
            },
            {
              "ja": "ツールの結果が会話履歴にどのように追加され、モデルが次のアクションについて推論できるようになるか",
              "en": "How tool results are appended to conversation history so the model can reason about the next action"
            },
            {
              "ja": "モデル主導の意思決定(Claudeがコンテキストに基づいて次に呼び出すツールを推論する)と、事前設定された決定木やツールのシーケンスとの違い",
              "en": "The distinction between model-driven decision-making (Claude reasons about which tool to call next based on context) and pre-configured decision trees or tool sequences"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "stop_reasonが「tool_use」の場合は継続し、「end_turn」の場合は終了するエージェント型ループの制御フローの実装",
              "en": "Implementing agentic loop control flow that continues when stop_reason is \"tool_use\" and terminates when stop_reason is \"end_turn\""
            },
            {
              "ja": "モデルが新しい情報を推論に取り込めるように、反復間で会話コンテキストにツール結果を追加する",
              "en": "Adding tool results to conversation context between iterations so the model can incorporate new information into its reasoning"
            },
            {
              "ja": "自然言語の信号を解析してループ終了を判断する、任意の反復回数上限を主要な停止機構として設定する、アシスタントのテキストコンテンツを完了指標としてチェックするなどのアンチパターンを回避する",
              "en": "Avoiding anti-patterns such as parsing natural language signals to determine loop termination, setting arbitrary iteration caps as the primary stopping mechanism, or checking for assistant text content as a completion indicator"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント1.2: コーディネーター-サブエージェントパターンによるマルチエージェントシステムのオーケストレーション",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "コーディネーターエージェントがサブエージェント間のすべての通信、エラー処理、情報のルーティングを管理するハブアンドスポーク型アーキテクチャ",
              "en": "Hub-and-spoke architecture where a coordinator agent manages all inter-subagent communication, error handling, and information routing"
            },
            {
              "ja": "サブエージェントが分離されたコンテキストで動作する方法—コーディネーターの会話履歴を自動的に継承しない",
              "en": "How subagents operate with isolated context—they do not inherit the coordinator's conversation history automatically"
            },
            {
              "ja": "タスクの分解、委任、結果の集約、クエリの複雑さに基づいてどのサブエージェントを呼び出すかを決定する際のコーディネーターの役割",
              "en": "The role of the coordinator in task decomposition, delegation, result aggregation, and deciding which subagents to invoke based on query complexity"
            },
            {
              "ja": "コーディネーターによる過度に狭いタスク分解のリスク、それにより広範な研究テーマの網羅性が不十分になること",
              "en": "Risks of overly narrow task decomposition by the coordinator, leading to incomplete coverage of broad research topics"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "クエリの要件を分析し、常に全パイプラインを経由するのではなく、動的にどのサブエージェントを呼び出すかを選択するコーディネーターエージェントの設計",
              "en": "Designing coordinator agents that analyze query requirements and dynamically select which subagents to invoke rather than always routing through the full pipeline"
            },
            {
              "ja": "重複を最小化するために、サブエージェント間で研究範囲を分割する(例:各エージェントに異なるサブトピックやソースタイプを割り当てる)",
              "en": "Partitioning research scope across subagents to minimize duplication (e.g., assigning distinct subtopics or source types to each agent)"
            },
            {
              "ja": "コーディネーターが統合出力のギャップを評価し、対象を絞ったクエリで検索・分析サブエージェントに再委任し、カバレッジが十分になるまで統合を再度呼び出す反復的改善ループの実装",
              "en": "Implementing iterative refinement loops where the coordinator evaluates synthesis output for gaps, re-delegates to search and analysis subagents with targeted queries, and re-invokes synthesis until coverage is sufficient"
            },
            {
              "ja": "可観測性、一貫したエラー処理、制御された情報フローのために、すべてのサブエージェント通信をコーディネーター経由でルーティングする",
              "en": "Routing all subagent communication through the coordinator for observability, consistent error handling, and controlled information flow"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント1.3: サブエージェントの呼び出し、コンテキストの受け渡し、生成の設定",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "サブエージェントを生成するメカニズムとしてのTaskツール、およびコーディネーターがサブエージェントを呼び出すためにallowedToolsに「Task」を含める必要があるという要件",
              "en": "The Task tool as the mechanism for spawning subagents, and the requirement that allowedTools must include \"Task\" for a coordinator to invoke subagents"
            },
            {
              "ja": "サブエージェントのコンテキストはプロンプトで明示的に提供する必要がある—サブエージェントは親のコンテキストを自動的に継承したり、呼び出し間でメモリを共有したりしない",
              "en": "That subagent context must be explicitly provided in the prompt—subagents do not automatically inherit parent context or share memory between invocations"
            },
            {
              "ja": "各サブエージェントタイプの説明、システムプロンプト、ツール制限を含むAgentDefinition設定",
              "en": "The AgentDefinition configuration including descriptions, system prompts, and tool restrictions for each subagent type"
            },
            {
              "ja": "共有された分析のベースラインから異なるアプローチを探索するためのフォークベースのセッション管理",
              "en": "Fork-based session management for exploring divergent approaches from a shared analysis baseline"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "事前のエージェントからの完全な調査結果をサブエージェントのプロンプトに直接含める(例:ウェブ検索結果や文書分析の出力を統合サブエージェントに渡す)",
              "en": "Including complete findings from prior agents directly in the subagent's prompt (e.g., passing web search results and document analysis outputs to the synthesis subagent)"
            },
            {
              "ja": "エージェント間でコンテキストを渡す際に、帰属を保持するために構造化データ形式を使用してコンテンツとメタデータ(ソースURL、文書名、ページ番号)を分離する",
              "en": "Using structured data formats to separate content from metadata (source URLs, document names, page numbers) when passing context between agents to preserve attribution"
            },
            {
              "ja": "別々のターンではなく、1つのコーディネーターの応答で複数のTaskツール呼び出しを発行することで並列サブエージェントを生成する",
              "en": "Spawning parallel subagents by emitting multiple Task tool calls in a single coordinator response rather than across separate turns"
            },
            {
              "ja": "サブエージェントの適応性を可能にするために、段階的な手順の指示ではなく、研究目標と品質基準を指定するコーディネーターのプロンプトを設計する",
              "en": "Designing coordinator prompts that specify research goals and quality criteria rather than step-by-step procedural instructions, to enable subagent adaptability"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント1.4: 強制と引き渡しパターンを備えたマルチステップワークフローの実装",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "プログラム的な強制(フック、前提条件ゲート)とワークフローの順序に関するプロンプトベースのガイダンスとの違い",
              "en": "The difference between programmatic enforcement (hooks, prerequisite gates) and prompt-based guidance for workflow ordering"
            },
            {
              "ja": "決定論的な準拠が必要な場合(例:金融操作の前に本人確認を行う)、プロンプトの指示だけではゼロではない失敗率がある",
              "en": "When deterministic compliance is required (e.g., identity verification before financial operations), prompt instructions alone have a non-zero failure rate"
            },
            {
              "ja": "顧客の詳細、根本原因分析、推奨されるアクションを含む、対応途中でのエスカレーションのための構造化された引き渡しプロトコル",
              "en": "Structured handoff protocols for mid-process escalation that include customer details, root cause analysis, and recommended actions"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "前提条件のステップが完了するまで下流のツール呼び出しをブロックするプログラム的な前提条件の実装(例:get_customerが確認済みの顧客IDを返すまでprocess_refundをブロックする)",
              "en": "Implementing programmatic prerequisites that block downstream tool calls until prerequisite steps have completed (e.g., blocking process_refund until get_customer has returned a verified customer ID)"
            },
            {
              "ja": "複数の懸念事項を含む顧客からのリクエストを個別の項目に分解し、共有コンテキストを使用して各項目を並行して調査した後、統一された解決策を統合する",
              "en": "Decomposing multi-concern customer requests into distinct items, then investigating each in parallel using shared context before synthesizing a unified resolution"
            },
            {
              "ja": "会話の記録にアクセスできない人間のエージェントにエスカレーションする際、構造化された引き渡しの要約(顧客ID、根本原因、返金額、推奨されるアクション)をまとめる",
              "en": "Compiling structured handoff summaries (customer ID, root cause, refund amount, recommended action) when escalating to human agents who lack access to the conversation transcript"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント1.5: ツール呼び出しの傍受とデータ正規化のためのAgent SDKフックの適用",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "モデルが処理する前にツールの結果を傍受して変換するフックパターン(例:PostToolUse)",
              "en": "Hook patterns (e.g., PostToolUse) that intercept tool results for transformation before the model processes them"
            },
            {
              "ja": "準拠ルールを強制するために送信ツール呼び出しを傍受するフックパターン(例:一定額を超える返金をブロックする)",
              "en": "Hook patterns that intercept outgoing tool calls to enforce compliance rules (e.g., blocking refunds above a threshold)"
            },
            {
              "ja": "決定論的な保証のためにフックを使用することと、確率的な準拠のためにプロンプトの指示に依存することの違い",
              "en": "The distinction between using hooks for deterministic guarantees versus relying on prompt instructions for probabilistic compliance"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "エージェントが処理する前に、異なるMCPツールからの異種のデータ形式(Unixタイムスタンプ、ISO 8601、数値のステータスコード)を正規化するPostToolUseフックの実装",
              "en": "Implementing PostToolUse hooks to normalize heterogeneous data formats (Unix timestamps, ISO 8601, numeric status codes) from different MCP tools before the agent processes them"
            },
            {
              "ja": "ポリシーに違反するアクション(例:500ドルを超える返金)をブロックし、代替のワークフロー(例:人間へのエスカレーション)にリダイレクトするツール呼び出し傍受フックの実装",
              "en": "Implementing tool call interception hooks that block policy-violating actions (e.g., refunds exceeding $500) and redirect to alternative workflows (e.g., human escalation)"
            },
            {
              "ja": "業務ルールが保証された準拠を要求する場合に、プロンプトベースの強制よりもフックを選択する",
              "en": "Choosing hooks over prompt-based enforcement when business rules require guaranteed compliance"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント1.6: 複雑なワークフローのためのタスク分解戦略の設計",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "固定的な順次パイプライン(プロンプトチェイニング)を使用する場合と、中間的な調査結果に基づく動的な適応的分解を使用する場合の違い",
              "en": "When to use fixed sequential pipelines (prompt chaining) versus dynamic adaptive decomposition based on intermediate findings"
            },
            {
              "ja": "レビューを順次的なステップに分解するプロンプトチェイニングパターン(例:各ファイルを個別に分析した後、ファイル間の統合パスを実行する)",
              "en": "Prompt chaining patterns that break reviews into sequential steps (e.g., analyze each file individually, then run a cross-file integration pass)"
            },
            {
              "ja": "各ステップで発見された内容に基づいてサブタスクを生成する適応的な調査計画の価値",
              "en": "The value of adaptive investigation plans that generate subtasks based on what is discovered at each step"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "ワークフローに適したタスク分解パターンの選択:予測可能な多面的レビューにはプロンプトチェイニング、オープンエンドな調査タスクには動的分解",
              "en": "Selecting task decomposition patterns appropriate to the workflow: prompt chaining for predictable multi-aspect reviews, dynamic decomposition for open-ended investigation tasks"
            },
            {
              "ja": "大規模なコードレビューを、ファイルごとの個別分析パスと、注意の分散を避けるための別のファイル間統合パスに分割する",
              "en": "Splitting large code reviews into per-file local analysis passes plus a separate cross-file integration pass to avoid attention dilution"
            },
            {
              "ja": "オープンエンドなタスク(例:「レガシーコードベースに包括的なテストを追加する」)を、まず構造をマッピングし、影響の大きい領域を特定し、依存関係が発見されるにつれて適応する優先順位付けされた計画を作成することによって分解する",
              "en": "Decomposing open-ended tasks (e.g., \"add comprehensive tests to a legacy codebase\") by first mapping structure, identifying high-impact areas, then creating a prioritized plan that adapts as dependencies are discovered"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント1.7: セッション状態、再開、フォークの管理",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "特定の以前の会話を継続するために名前付きセッションを再開する--resume <session-name>の使用",
              "en": "Named session resumption using --resume <session-name> to continue a specific prior conversation"
            },
            {
              "ja": "共有された分析のベースラインから独立したブランチを作成し、異なるアプローチを探索するためのfork_session",
              "en": "fork_session for creating independent branches from a shared analysis baseline to explore divergent approaches"
            },
            {
              "ja": "コードの変更後にセッションを再開する際に、以前に分析したファイルへの変更をエージェントに知らせることの重要性",
              "en": "The importance of informing the agent about changes to previously analyzed files when resuming sessions after code modifications"
            },
            {
              "ja": "古くなったツール結果で再開するよりも、構造化された要約で新しいセッションを開始する方が信頼性が高い理由",
              "en": "Why starting a new session with a structured summary is more reliable than resuming with stale tool results"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "--resumeを名前付きセッションと共に使用して、複数の作業セッションにわたって名前付きの調査セッションを継続する",
              "en": "Using --resume with session names to continue named investigation sessions across work sessions"
            },
            {
              "ja": "fork_sessionを使用して並行的な探索ブランチを作成する(例:共有されたコードベース分析から2つのテスト戦略やリファクタリングアプローチを比較する)",
              "en": "Using fork_session to create parallel exploration branches (e.g., comparing two testing strategies or refactoring approaches from a shared codebase analysis)"
            },
            {
              "ja": "セッションの再開(以前のコンテキストが概ね有効な場合)と、要約を挿入して新規に開始する(以前のツール結果が古くなっている場合)との選択",
              "en": "Choosing between session resumption (when prior context is mostly valid) and starting fresh with injected summaries (when prior tool results are stale)"
            },
            {
              "ja": "完全な再探索を要求するのではなく、対象を絞った再分析のために特定のファイル変更を再開されたセッションに知らせる",
              "en": "Informing a resumed session about specific file changes for targeted re-analysis rather than requiring full re-exploration"
            }
          ]
        }
      ]
    }
  ]
};
