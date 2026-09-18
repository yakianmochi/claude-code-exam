window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["samplequestions2"] = {
  "id": "samplequestions2",
  "title": "Sample Questions (2)",
  "titleJa": "サンプル問題(後半)",
  "summaryHtml": "<h3>全体像</h3><p>このチャンクは2つのシナリオ・計6問で構成される。前半の「マルチエージェント・リサーチシステム」(Q7〜9)は<strong>ドメイン1(エージェント型アーキテクチャ)</strong>の実践編で、コーディネーターのタスク分解が狭すぎるとカバレッジ漏れが起きること、サブエージェントの失敗は構造化されたエラーコンテキストで返すべきこと、頻出する単純作業(85%のファクトチェック)には最小権限のスコープ付きツールを与え残りはコーディネーター経由にする設計判断を問う。後半の「CI向けClaude Code」(Q10〜12)は<code>-p</code>フラグによる非対話実行、Message Batches APIの50%コスト削減とレイテンシSLA不在のトレードオフ(ブロッキング処理には不向き)、多ファイルPRレビューでの注意力低下を防ぐファイル単位分析+統合パスという分解パターンを扱う。総じて「症状ではなく根本原因を特定する」「最小権限・確実性・レイテンシ制約を踏まえて最適なアーキテクチャを選ぶ」という出題傾向が読み取れる。</p>",
  "sections": [
    {
      "heading": "シナリオ: マルチエージェント・リサーチシステム",
      "groups": [
        {
          "label": "Question 7",
          "sentences": [
            {
              "ja": "【問題】「AIがクリエイティブ産業に与える影響」というトピックでシステムを実行したところ、各サブエージェントはいずれも正常に完了した。ウェブ検索エージェントは関連記事を見つけ、文書分析エージェントは論文を正しく要約し、統合エージェントは一貫した出力を生成した。しかし最終レポートは視覚芸術のみを扱い、音楽・文筆・映像制作を完全に見落としていた。コーディネーターのログを確認すると、トピックを「デジタルアートにおけるAI」「グラフィックデザインにおけるAI」「写真におけるAI」という3つのサブタスクに分解していたことがわかった。最も可能性の高い根本原因は何か。",
              "en": "After running the system on the topic \"impact of AI on creative industries,\" you observe that each subagent completes successfully: the web search agent finds relevant articles, the document analysis agent summarizes papers correctly, and the synthesis agent produces coherent output. However, the final reports cover only visual arts, completely missing music, writing, and film production. When you examine the coordinator's logs, you see it decomposed the topic into three subtasks: \"AI in digital art creation,\" \"AI in graphic design,\" and \"AI in photography.\" What is the most likely root cause?"
            },
            {
              "ja": "A. 統合エージェントには、他のエージェントから受け取った調査結果のカバレッジギャップを特定するための指示が欠けている。",
              "en": "A. The synthesis agent lacks instructions for identifying coverage gaps in the findings it receives from other agents."
            },
            {
              "ja": "B. コーディネーターエージェントのタスク分解が狭すぎるため、サブエージェントへの割り当てがトピックの関連領域をすべて網羅していない。",
              "en": "B. The coordinator agent's task decomposition is too narrow, resulting in subagent assignments that don't cover all relevant domains of the topic."
            },
            {
              "ja": "C. ウェブ検索エージェントのクエリが十分に網羅的でないため、より多くのクリエイティブ産業セクターをカバーするように拡張する必要がある。",
              "en": "C. The web search agent's queries are not comprehensive enough and need to be expanded to cover more creative industry sectors."
            },
            {
              "ja": "D. 文書分析エージェントが、過度に厳しい関連性基準のために、視覚芸術以外のクリエイティブ産業に関する出典を除外してしまっている。",
              "en": "D. The document analysis agent is filtering out sources related to non-visual creative industries due to overly restrictive relevance criteria."
            },
            {
              "ja": "【正解】B。コーディネーターのログが根本原因を直接示している。「クリエイティブ産業」を視覚芸術のサブタスク(デジタルアート、グラフィックデザイン、写真)だけに分解し、音楽・文筆・映像を完全に省いてしまっていた。サブエージェントは割り当てられたタスクを正しく実行しており、問題は割り当てそのものにある。選択肢A・C・Dは、割り当てられた範囲内で正しく機能している下流のエージェントを誤って非難している。",
              "en": "Correct Answer: B. The coordinator's logs reveal the root cause directly: it decomposed \"creative industries\" into only visual arts subtasks (digital art, graphic design, photography), completely omitting music, writing, and film. The subagents executed their assigned tasks correctly—the problem is what they were assigned. Options A, C, and D incorrectly blame downstream agents that are working correctly within their assigned scope."
            }
          ]
        },
        {
          "label": "Question 8",
          "sentences": [
            {
              "ja": "【問題】複雑なトピックを調査中に、ウェブ検索サブエージェントがタイムアウトした。この失敗情報がコーディネーターエージェントにどのように伝わるかを設計する必要がある。インテリジェントな復旧を最もよく可能にするエラー伝播アプローチはどれか。",
              "en": "The web search subagent times out while researching a complex topic. You need to design how this failure information flows back to the coordinator agent. Which error propagation approach best enables intelligent recovery?"
            },
            {
              "ja": "A. 失敗の種類、試行したクエリ、部分的な結果、および代替アプローチの可能性を含む構造化されたエラーコンテキストをコーディネーターに返す。",
              "en": "A. Return structured error context to the coordinator including the failure type, the attempted query, any partial results, and potential alternative approaches."
            },
            {
              "ja": "B. サブエージェント内で指数バックオフによる自動リトライロジックを実装し、すべてのリトライを使い切った後のみ、汎用的な「検索利用不可」ステータスを返す。",
              "en": "B. Implement automatic retry logic with exponential backoff within the subagent, returning a generic \"search unavailable\" status only after all retries are exhausted."
            },
            {
              "ja": "C. サブエージェント内でタイムアウトを捕捉し、成功としてマークされた空の結果セットを返す。",
              "en": "C. Catch the timeout within the subagent and return an empty result set marked as successful."
            },
            {
              "ja": "D. タイムアウト例外を、リサーチワークフロー全体を終了させるトップレベルのハンドラーに直接伝播させる。",
              "en": "D. Propagate the timeout exception directly to a top-level handler that terminates the entire research workflow."
            },
            {
              "ja": "【正解】A。構造化されたエラーコンテキストがあれば、コーディネーターは、クエリを修正して再試行するか、別のアプローチを試すか、部分的な結果で進めるかといった、インテリジェントな復旧の判断を下すための情報を得られる。選択肢Bの汎用的なステータスは、コーディネーターから有用なコンテキストを隠し、判断に基づく意思決定を妨げる。選択肢Cは失敗を成功としてマークすることでエラーを隠蔽し、復旧を不可能にし、不完全な調査結果のリスクを生む。選択肢Dは、復旧戦略が成功しうる場面で、ワークフロー全体を不必要に終了させてしまう。",
              "en": "Correct Answer: A. Structured error context gives the coordinator the information it needs to make intelligent recovery decisions—whether to retry with a modified query, try an alternative approach, or proceed with partial results. Option B's generic status hides valuable context from the coordinator, preventing informed decisions. Option C suppresses the error by marking failure as success, which prevents any recovery and risks incomplete research outputs. Option D terminates the entire workflow unnecessarily when recovery strategies could succeed."
            }
          ]
        },
        {
          "label": "Question 9",
          "sentences": [
            {
              "ja": "【問題】テスト中に、統合エージェントが調査結果を組み合わせる際に特定の主張を頻繁に検証する必要があることに気づいた。現在、検証が必要な場合、統合エージェントはコーディネーターに制御を戻し、コーディネーターがウェブ検索エージェントを呼び出し、その結果を使って統合エージェントを再度呼び出している。これによりタスクごとに2〜3回の往復が発生し、レイテンシが40%増加している。評価によると、これらの検証の85%は単純なファクトチェック(日付、名前、統計)であり、15%はより深い調査を要する。信頼性を維持しながらオーバーヘッドを削減する最も効果的なアプローチは何か。",
              "en": "During testing, you observe that the synthesis agent frequently needs to verify specific claims while combining findings. Currently, when verification is needed, the synthesis agent returns control to the coordinator, which invokes the web search agent, then re-invokes synthesis with results. This adds 2-3 round trips per task and increases latency by 40%. Your evaluation shows that 85% of these verifications are simple fact-checks (dates, names, statistics) while 15% require deeper investigation. What's the most effective approach to reduce overhead while maintaining system reliability?"
            },
            {
              "ja": "A. 統合エージェントに単純な検索用のスコープ限定されたverify_factツールを与え、複雑な検証はコーディネーター経由でウェブ検索エージェントに委任し続ける。",
              "en": "A. Give the synthesis agent a scoped verify_fact tool for simple lookups, while complex verifications continue delegating to the web search agent through the coordinator."
            },
            {
              "ja": "B. 統合エージェントにすべての検証ニーズを蓄積させ、パスの終わりにまとめてコーディネーターに返し、コーディネーターがそれらを一括でウェブ検索エージェントに送る。",
              "en": "B. Have the synthesis agent accumulate all verification needs and return them as a batch to the coordinator at the end of its pass, which then sends them all to the web search agent at once."
            },
            {
              "ja": "C. 統合エージェントにすべてのウェブ検索ツールへのアクセスを与え、コーディネーターを経由せずにあらゆる検証ニーズを直接処理できるようにする。",
              "en": "C. Give the synthesis agent access to all web search tools so it can handle any verification need directly without round-trips through the coordinator."
            },
            {
              "ja": "D. ウェブ検索エージェントに、統合エージェントが後で検証しそうな内容を先読みして、初回の調査時に各ソース周辺の追加コンテキストを積極的にキャッシュさせる。",
              "en": "D. Have the web search agent proactively cache extra context around each source during initial research, anticipating what the synthesis agent might need to verify."
            },
            {
              "ja": "【正解】A。選択肢Aは最小権限の原則を適用し、85%の一般的なケース(単純なファクト検証)に必要な最小限のものだけを統合エージェントに与えつつ、複雑なケースについては既存の協調パターンを維持している。選択肢Bのバッチ化アプローチは、統合のステップが以前に検証された事実に依存する場合があるため、ブロッキングの依存関係を生む。選択肢Cは統合エージェントに過剰な権限を与え、関心の分離に反する。選択肢Dは、統合エージェントが何を検証する必要があるかを確実に予測できない投機的なキャッシュに依存している。",
              "en": "Correct Answer: A. Option A applies the principle of least privilege by giving the synthesis agent only what it needs for the 85% common case (simple fact verification) while preserving the existing coordination pattern for complex cases. Option B's batching approach creates blocking dependencies since synthesis steps may depend on earlier verified facts. Option C over-provisions the synthesis agent, violating separation of concerns. Option D relies on speculative caching that cannot reliably predict what the synthesis agent will need to verify."
            }
          ]
        }
      ]
    },
    {
      "heading": "シナリオ: CI(継続的インテグレーション)のためのClaude Code",
      "groups": [
        {
          "label": "Question 10",
          "sentences": [
            {
              "ja": "【問題】あなたのパイプラインスクリプトは claude \"Analyze this pull request for security issues\" を実行しているが、ジョブが無期限にハングする。ログはClaude Codeが対話的な入力を待っていることを示している。自動化パイプラインでClaude Codeを実行するための正しいアプローチは何か。",
              "en": "Your pipeline script runs claude \"Analyze this pull request for security issues\" but the job hangs indefinitely. Logs indicate Claude Code is waiting for interactive input. What's the correct approach to run Claude Code in an automated pipeline?"
            },
            {
              "ja": "A. -pフラグを追加する: claude -p \"Analyze this pull request for security issues\"",
              "en": "A. Add the -p flag: claude -p \"Analyze this pull request for security issues\""
            },
            {
              "ja": "B. コマンドを実行する前に環境変数CLAUDE_HEADLESS=trueを設定する。",
              "en": "B. Set the environment variable CLAUDE_HEADLESS=true before running the command"
            },
            {
              "ja": "C. 標準入力を/dev/nullからリダイレクトする: claude \"Analyze this pull request for security issues\" < /dev/null",
              "en": "C. Redirect stdin from /dev/null: claude \"Analyze this pull request for security issues\" < /dev/null"
            },
            {
              "ja": "D. --batchフラグを追加する: claude --batch \"Analyze this pull request for security issues\"",
              "en": "D. Add the --batch flag: claude --batch \"Analyze this pull request for security issues\""
            },
            {
              "ja": "【正解】A。-p(または--print)フラグは、Claude Codeを非対話モードで実行するための正式な方法である。プロンプトを処理し、結果を標準出力に出力し、ユーザー入力を待たずに終了する—CI/CDパイプラインが必要としている動作そのものである。他の選択肢は存在しない機能(CLAUDE_HEADLESS環境変数、--batchフラグ)を参照しているか、Claude Codeのコマンド構文に適切に対応しないUnix的な回避策を使用している。",
              "en": "Correct Answer: A. The -p (or --print) flag is the documented way to run Claude Code in non-interactive mode. It processes the prompt, outputs the result to stdout, and exits without waiting for user input—exactly what CI/CD pipelines require. The other options reference non-existent features (CLAUDE_HEADLESS environment variable, --batch flag) or use Unix workarounds that don't properly address Claude Code's command syntax."
            }
          ]
        },
        {
          "label": "Question 11",
          "sentences": [
            {
              "ja": "【問題】あなたのチームは自動分析のAPIコストを削減したいと考えている。現在、リアルタイムのClaude呼び出しが2つのワークフローを支えている:(1) 開発者がマージする前に完了しなければならないブロッキング型のマージ前チェック、(2) 翌朝レビューするために夜間に生成される技術的負債レポート。マネージャーは、50%のコスト削減を理由に両方をMessage Batches APIに切り替えることを提案している。この提案をどのように評価すべきか。",
              "en": "Your team wants to reduce API costs for automated analysis. Currently, real-time Claude calls power two workflows: (1) a blocking pre-merge check that must complete before developers can merge, and (2) a technical debt report generated overnight for review the next morning. Your manager proposes switching both to the Message Batches API for its 50% cost savings. How should you evaluate this proposal?"
            },
            {
              "ja": "A. 技術的負債レポートのみをバッチ処理にし、マージ前チェックはリアルタイム呼び出しのままにする。",
              "en": "A. Use batch processing for the technical debt reports only; keep real-time calls for pre-merge checks."
            },
            {
              "ja": "B. 両方のワークフローをバッチ処理に切り替え、完了を確認するためにステータスをポーリングする。",
              "en": "B. Switch both workflows to batch processing with status polling to check for completion."
            },
            {
              "ja": "C. バッチ結果の順序に関する問題を避けるため、両方のワークフローともリアルタイム呼び出しのままにする。",
              "en": "C. Keep real-time calls for both workflows to avoid batch result ordering issues."
            },
            {
              "ja": "D. 両方をバッチ処理に切り替え、バッチの処理に時間がかかりすぎる場合はリアルタイムにフォールバックするタイムアウト機構を設ける。",
              "en": "D. Switch both to batch processing with a timeout fallback to real-time if batches take too long."
            },
            {
              "ja": "【正解】A。Message Batches APIは50%のコスト削減を提供するが、処理時間が最大24時間かかる可能性があり、レイテンシに関する保証(SLA)がない。これは、開発者が結果を待つブロッキング型のマージ前チェックには不向きだが、技術的負債レポートのような夜間バッチジョブには適している。選択肢Bは、「多くの場合は速い」という完了時間への期待に依存しており、ブロッキング型のワークフローには受け入れられないため誤り。選択肢Cは誤解に基づいている—バッチ結果はcustom_idフィールドで関連付けることができる。選択肢Dは、各APIを適切な用途にマッチさせるというより単純な解決策があるにもかかわらず、不要な複雑さを加えている。",
              "en": "Correct Answer: A. The Message Batches API offers 50% cost savings but has processing times up to 24 hours with no guaranteed latency SLA. This makes it unsuitable for blocking pre-merge checks where developers wait for results, but ideal for overnight batch jobs like technical debt reports. Option B is wrong because relying on \"often faster\" completion isn't acceptable for blocking workflows. Option C reflects a misconception—batch results can be correlated using custom_id fields. Option D adds unnecessary complexity when the simpler solution is matching each API to its appropriate use case."
            }
          ]
        },
        {
          "label": "Question 12",
          "sentences": [
            {
              "ja": "【問題】あるプルリクエストは、株式トラッキングモジュール内の14個のファイルを変更している。すべてのファイルを一括で分析するシングルパスのレビューは一貫性のない結果を生んでいる:一部のファイルには詳細なフィードバックがあるが他は表面的なコメントのみ、明らかなバグの見落とし、そして矛盾したフィードバック—同じPR内の別の場所にある同一のコードを承認しながら、あるファイルでは同じパターンを問題視してフラグを立てている。レビューをどのように再構成すべきか。",
              "en": "A pull request modifies 14 files across the stock tracking module. Your single-pass review analyzing all files together produces inconsistent results: detailed feedback for some files but superficial comments for others, obvious bugs missed, and contradictory feedback—flagging a pattern as problematic in one file while approving identical code elsewhere in the same PR. How should you restructure the review?"
            },
            {
              "ja": "A. 焦点を絞った複数のパスに分割する:各ファイルを個別に分析してローカルな問題を検出し、その後ファイル間のデータフローを検証する別の統合パスを実行する。",
              "en": "A. Split into focused passes: analyze each file individually for local issues, then run a separate integration-focused pass examining cross-file data flow."
            },
            {
              "ja": "B. 自動レビューが実行される前に、開発者に大規模なPRを3〜4ファイルの小さな提出に分割するよう求める。",
              "en": "B. Require developers to split large PRs into smaller submissions of 3-4 files before the automated review runs."
            },
            {
              "ja": "C. 14ファイルすべてに一度のパスで十分な注意を払えるよう、より大きなコンテキストウィンドウを持つ上位モデルに切り替える。",
              "en": "C. Switch to a higher-tier model with a larger context window to give all 14 files adequate attention in one pass."
            },
            {
              "ja": "D. PR全体に対して3回の独立したレビューパスを実行し、3回中2回以上で現れた問題のみをフラグとして報告する。",
              "en": "D. Run three independent review passes on the full PR and only flag issues that appear in at least two of the three runs."
            },
            {
              "ja": "【正解】A。レビューを焦点を絞ったパスに分割することは、根本原因—多数のファイルを一度に処理する際の注意力の分散—に直接対処する。ファイルごとの分析により一貫した深さが保証され、別の統合パスがファイル間の問題を捕捉する。選択肢Bはシステムを改善せずに負担を開発者に移すだけである。選択肢Cは、より大きなコンテキストウィンドウが注意力の質の問題を解決するわけではないという誤解に基づいている。選択肢Dは、断続的にしか検出されない問題について合意を要求することで、実際にはバグ検出をむしろ抑制してしまう。",
              "en": "Correct Answer: A. Splitting reviews into focused passes directly addresses the root cause: attention dilution when processing many files at once. File-by-file analysis ensures consistent depth, while a separate integration pass catches cross-file issues. Option B shifts burden to developers without improving the system. Option C misunderstands that larger context windows don't solve attention quality issues. Option D would actually suppress detection of real bugs by requiring consensus on issues that may only be caught intermittently."
            }
          ]
        }
      ]
    }
  ]
};
