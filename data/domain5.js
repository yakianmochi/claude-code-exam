window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["domain5"] = {
  "id": "domain5",
  "title": "Domain 5: Context Management & Reliability",
  "titleJa": "ドメイン5: コンテキスト管理と信頼性",
  "summaryHtml": "<h3>全体像</h3><p>このドメインは、<strong>長時間かつ複数エージェントにわたる対話でコンテキストを正しく保持し、システムを壊れにくくするための設計知識</strong>を扱う。6つのタスクは大きく3つの塊に分けられる。</p><h4>① コンテキストの保持と劣化対策(5.1・5.4)</h4><ul><li>要約は数値・日付・顧客の期待などを曖昧にしてしまうリスクがあり、「中間で失われる」効果にも注意が必要</li><li><strong>「ケースファクト」のような永続レイヤー</strong>に重要事実を抜き出し、冗長なツール結果は関連フィールドのみに絞り込む</li><li>大規模コードベース探索では<strong>スクラッチパッドファイル</strong>や<strong>マニフェストによる状態エクスポート</strong>を使い、コンテキスト劣化やクラッシュに対応する</li></ul><h4>② エスカレーションとエラー伝播(5.2・5.3)</h4><ul><li>感情や自己申告の確信度は複雑さの代理指標として不十分。<strong>明示的な基準とfew-shot例</strong>でエスカレーション判断を明確化する</li><li>サブエージェントは<strong>構造化されたエラーコンテキスト</strong>(失敗の種類・試行内容・部分結果・代替案)を返し、エラーの隠蔽やワークフロー全停止を避ける</li></ul><h4>③ 人間レビューと出典管理(5.5・5.6)</h4><ul><li>全体の精度指標は特定のセグメントの低性能を隠すことがある。<strong>層化サンプリングとフィールドレベルの確信度</strong>でレビューを最適配分する</li><li>複数ソースの統合時は<strong>主張とソースの対応関係・公開日</strong>を保持し、矛盾する値は任意に選ばず注釈を付ける</li></ul>",
  "sections": [
    {
      "heading": "タスクステートメント5.1: 長時間の対話全体にわたって重要な情報を保持するための会話コンテキストの管理",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "段階的な要約のリスク:数値、パーセンテージ、日付、顧客が述べた期待事項を曖昧な要約に凝縮してしまうこと",
              "en": "Progressive summarization risks: condensing numerical values, percentages, dates, and customer-stated expectations into vague summaries"
            },
            {
              "ja": "「中間で失われる」効果:モデルは長い入力の冒頭と末尾の情報は確実に処理するが、中間部分の調査結果を省略する可能性がある",
              "en": "The \"lost in the middle\" effect: models reliably process information at the beginning and end of long inputs but may omit findings from middle sections"
            },
            {
              "ja": "ツールの結果がコンテキスト内に蓄積し、その関連性に対して不釣り合いにトークンを消費する仕組み(例:注文の照会で40以上のフィールドが返されるが、関連するのは5つだけの場合)",
              "en": "How tool results accumulate in context and consume tokens disproportionately to their relevance (e.g., 40+ fields per order lookup when only 5 are relevant)"
            },
            {
              "ja": "会話の一貫性を維持するために、後続のAPIリクエストで完全な会話履歴を渡すことの重要性",
              "en": "The importance of passing complete conversation history in subsequent API requests to maintain conversational coherence"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "トランザクションの事実(金額、日付、注文番号、状態)を、要約された履歴の外側で各プロンプトに含まれる永続的な「ケースファクト」ブロックに抽出する",
              "en": "Extracting transactional facts (amounts, dates, order numbers, statuses) into a persistent \"case facts\" block included in each prompt, outside summarized history"
            },
            {
              "ja": "複数の問題を扱うセッションのために、構造化された問題データ(注文ID、金額、状態)を別のコンテキスト層に抽出して永続化する",
              "en": "Extracting and persisting structured issue data (order IDs, amounts, statuses) into a separate context layer for multi-issue sessions"
            },
            {
              "ja": "冗長なツールの出力がコンテキストに蓄積する前に、関連するフィールドのみに絞り込む(例:注文照会から返品に関連するフィールドのみを保持する)",
              "en": "Trimming verbose tool outputs to only relevant fields before they accumulate in context (e.g., keeping only return-relevant fields from order lookups)"
            },
            {
              "ja": "位置効果を緩和するために、集約された入力の冒頭に主要な調査結果の要約を配置し、詳細な結果を明示的なセクション見出しで整理する",
              "en": "Placing key findings summaries at the beginning of aggregated inputs and organizing detailed results with explicit section headers to mitigate position effects"
            },
            {
              "ja": "下流での正確な統合を支援するために、サブエージェントに構造化された出力にメタデータ(日付、ソースの場所、方法論的背景)を含めることを要求する",
              "en": "Requiring subagents to include metadata (dates, source locations, methodological context) in structured outputs to support accurate downstream synthesis"
            },
            {
              "ja": "下流のエージェントのコンテキスト予算が限られている場合、上流のエージェントを変更して、冗長なコンテンツや推論の連鎖の代わりに構造化データ(主要な事実、引用、関連性スコア)を返すようにする",
              "en": "Modifying upstream agents to return structured data (key facts, citations, relevance scores) instead of verbose content and reasoning chains when downstream agents have limited context budgets"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント5.2: 効果的なエスカレーションと曖昧さ解消パターンの設計",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "適切なエスカレーションのトリガー:顧客が人間対応を要求する場合、ポリシーの例外・欠落(複雑な事案だけではない)、有意な進展ができない場合",
              "en": "Appropriate escalation triggers: customer requests for a human, policy exceptions/gaps (not just complex cases), and inability to make meaningful progress"
            },
            {
              "ja": "顧客が明示的に要求した場合に即座にエスカレーションすることと、問題が単純な場合に解決を提案することとの違い",
              "en": "The distinction between escalating immediately when a customer explicitly demands it versus offering to resolve when the issue is straightforward"
            },
            {
              "ja": "感情に基づくエスカレーションや自己申告の確信度スコアが、実際の事案の複雑さの代理指標として信頼できない理由",
              "en": "Why sentiment-based escalation and self-reported confidence scores are unreliable proxies for actual case complexity"
            },
            {
              "ja": "複数の顧客が一致する場合、ヒューリスティックな選択ではなく、明確化(追加の識別情報の要求)が必要である仕組み",
              "en": "How multiple customer matches require clarification (requesting additional identifiers) rather than heuristic selection"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "エスカレーションすべき場合と自律的に解決すべき場合を示すfew-shot例とともに、明示的なエスカレーション基準をシステムプロンプトに追加する",
              "en": "Adding explicit escalation criteria with few-shot examples to the system prompt demonstrating when to escalate versus resolve autonomously"
            },
            {
              "ja": "人間の担当者を求める顧客の明示的な要求を、まず調査を試みることなく直ちに尊重する",
              "en": "Honoring explicit customer requests for human agents immediately without first attempting investigation"
            },
            {
              "ja": "問題がエージェントの対応能力の範囲内にある場合、不満を認めつつ解決を提案し、顧客が希望を繰り返した場合にのみエスカレーションする",
              "en": "Acknowledging frustration while offering resolution when the issue is within the agent's capability, escalating only if the customer reiterates their preference"
            },
            {
              "ja": "ポリシーが顧客の特定の要求について曖昧または言及がない場合にエスカレーションする(例:ポリシーが自社サイトの価格調整のみを扱っている場合の競合他社の価格対応)",
              "en": "Escalating when policy is ambiguous or silent on the customer's specific request (e.g., competitor price matching when policy only addresses own-site adjustments)"
            },
            {
              "ja": "ツールの結果が複数の一致を返した場合、ヒューリスティックに基づいて選択するのではなく、追加の識別情報を尋ねるようエージェントに指示する",
              "en": "Instructing the agent to ask for additional identifiers when tool results return multiple matches, rather than selecting based on heuristics"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント5.3: マルチエージェントシステム全体でのエラー伝播戦略の実装",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "構造化されたエラーコンテキスト(失敗の種類、試行したクエリ、部分的な結果、代替アプローチ)が、コーディネーターによる賢明な復旧の意思決定を可能にすること",
              "en": "Structured error context (failure type, attempted query, partial results, alternative approaches) as enabling intelligent coordinator recovery decisions"
            },
            {
              "ja": "アクセス失敗(再試行の判断が必要なタイムアウト)と正当な空の結果(一致なしで成功したクエリ)との違い",
              "en": "The distinction between access failures (timeouts needing retry decisions) and valid empty results (successful queries with no matches)"
            },
            {
              "ja": "汎用的なエラー状態(「検索利用不可」など)がコーディネーターから有用なコンテキストを隠してしまう理由",
              "en": "Why generic error statuses (\"search unavailable\") hide valuable context from the coordinator"
            },
            {
              "ja": "エラーを黙って抑制すること(空の結果を成功として返すこと)と、単一の失敗でワークフロー全体を終了することの両方がアンチパターンである理由",
              "en": "Why silently suppressing errors (returning empty results as success) or terminating entire workflows on single failures are both anti-patterns"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "コーディネーターの復旧を可能にするために、失敗の種類、試行内容、部分的な結果、考えられる代替案を含む構造化されたエラーコンテキストを返す",
              "en": "Returning structured error context including failure type, what was attempted, partial results, and potential alternatives to enable coordinator recovery"
            },
            {
              "ja": "コーディネーターが適切な判断を下せるように、エラー報告においてアクセス失敗と正当な空の結果を区別する",
              "en": "Distinguishing access failures from valid empty results in error reporting so the coordinator can make appropriate decisions"
            },
            {
              "ja": "サブエージェントに一時的な失敗に対するローカルな復旧を実装させ、解決できないエラーのみを、試行内容と部分的な結果とともに伝播させる",
              "en": "Having subagents implement local recovery for transient failures and only propagate errors they cannot resolve, including what was attempted and partial results"
            },
            {
              "ja": "どの調査結果が十分に裏付けられているか、どのトピック領域がソース不足によってギャップがあるかを示すカバレッジ注釈とともに、統合出力を構造化する",
              "en": "Structuring synthesis output with coverage annotations indicating which findings are well-supported versus which topic areas have gaps due to unavailable sources"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント5.4: 大規模なコードベース探索におけるコンテキストの効果的な管理",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "長時間のセッションにおけるコンテキストの劣化:モデルは一貫性のない回答を返し始め、以前に発見した特定のクラスではなく「典型的なパターン」を参照するようになる",
              "en": "Context degradation in extended sessions: models start giving inconsistent answers and referencing \"typical patterns\" rather than specific classes discovered earlier"
            },
            {
              "ja": "コンテキストの境界を越えて主要な調査結果を永続化するためのスクラッチパッドファイルの役割",
              "en": "The role of scratchpad files for persisting key findings across context boundaries"
            },
            {
              "ja": "メインエージェントが高レベルの理解を統括する一方で、冗長な探索出力を分離するためのサブエージェントへの委任",
              "en": "Subagent delegation for isolating verbose exploration output while the main agent coordinates high-level understanding"
            },
            {
              "ja": "クラッシュからの復旧のための構造化された状態の永続化:各エージェントが既知の場所に状態をエクスポートし、コーディネーターが再開時にマニフェストを読み込む",
              "en": "Structured state persistence for crash recovery: each agent exports state to a known location, and the coordinator loads a manifest on resume"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "メインエージェントが高レベルの統括を維持しながら、特定の質問(例:「すべてのテストファイルを見つける」「返金フローの依存関係を追跡する」)を調査するためにサブエージェントを生成する",
              "en": "Spawning subagents to investigate specific questions (e.g., \"find all test files,\" \"trace refund flow dependencies\") while the main agent preserves high-level coordination"
            },
            {
              "ja": "コンテキストの劣化に対抗するために、エージェントに主要な調査結果を記録するスクラッチパッドファイルを維持させ、後続の質問でそれらを参照させる",
              "en": "Having agents maintain scratchpad files recording key findings, referencing them for subsequent questions to counteract context degradation"
            },
            {
              "ja": "次の段階のサブエージェントを生成する前に、ある探索段階の主要な調査結果を要約し、その要約を初期コンテキストに注入する",
              "en": "Summarizing key findings from one exploration phase before spawning sub-agents for the next phase, injecting summaries into initial context"
            },
            {
              "ja": "コーディネーターが再開時に読み込み、エージェントのプロンプトに注入する構造化されたエージェント状態エクスポート(マニフェスト)を用いてクラッシュからの復旧を設計する",
              "en": "Designing crash recovery using structured agent state exports (manifests) that the coordinator loads on resume and injects into agent prompts"
            },
            {
              "ja": "冗長な発見の出力でコンテキストが満たされた場合、長時間の探索セッション中に/compactを使用してコンテキストの使用量を削減する",
              "en": "Using /compact to reduce context usage during extended exploration sessions when context fills with verbose discovery output"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント5.5: 人間によるレビューワークフローと確信度の調整の設計",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "集計された精度指標(例:全体で97%)が、特定の文書タイプやフィールドにおける性能の低さを隠してしまうリスク",
              "en": "The risk that aggregate accuracy metrics (e.g., 97% overall) may mask poor performance on specific document types or fields"
            },
            {
              "ja": "高確信度の抽出におけるエラー率の測定と新規のエラーパターンの検出のための層化ランダムサンプリング",
              "en": "Stratified random sampling for measuring error rates in high-confidence extractions and detecting novel error patterns"
            },
            {
              "ja": "レビューの注意をルーティングするために、ラベル付きの検証セットを用いて調整されたフィールドレベルの確信度スコア",
              "en": "Field-level confidence scores calibrated using labeled validation sets for routing review attention"
            },
            {
              "ja": "高確信度の抽出を自動化する前に、文書タイプとフィールドのセグメントごとに精度を検証することの重要性",
              "en": "The importance of validating accuracy by document type and field segment before automating high-confidence extractions"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "継続的なエラー率の測定と新規パターンの検出のために、高確信度の抽出に対する層化ランダムサンプリングを実装する",
              "en": "Implementing stratified random sampling of high-confidence extractions for ongoing error rate measurement and novel pattern detection"
            },
            {
              "ja": "人間によるレビューを削減する前に、文書タイプとフィールドごとに精度を分析し、すべてのセグメントで一貫した性能を確認する",
              "en": "Analyzing accuracy by document type and field to verify consistent performance across all segments before reducing human review"
            },
            {
              "ja": "モデルにフィールドレベルの確信度スコアを出力させ、その後ラベル付きの検証セットを用いてレビューのしきい値を調整する",
              "en": "Having models output field-level confidence scores, then calibrating review thresholds using labeled validation sets"
            },
            {
              "ja": "モデルの確信度が低い抽出や、曖昧・矛盾するソース文書を人間によるレビューにルーティングし、限られたレビュー担当者の対応能力を優先付けする",
              "en": "Routing extractions with low model confidence or ambiguous/contradictory source documents to human review, prioritizing limited reviewer capacity"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント5.6: 複数ソースの統合における情報の出典の保持と不確実性の取り扱い",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "主張とソースの対応関係を保持せずに調査結果を圧縮すると、要約の段階でソースの帰属が失われてしまう仕組み",
              "en": "How source attribution is lost during summarization steps when findings are compressed without preserving claim-source mappings"
            },
            {
              "ja": "統合エージェントが調査結果を結合する際に保持・統合しなければならない、構造化された主張とソースの対応関係の重要性",
              "en": "The importance of structured claim-source mappings that the synthesis agent must preserve and merge when combining findings"
            },
            {
              "ja": "信頼できるソース間で統計が矛盾する場合の対処方法:一つの値を任意に選択するのではなく、ソースの帰属を付記して矛盾に注釈を付ける",
              "en": "How to handle conflicting statistics from credible sources: annotating conflicts with source attribution rather than arbitrarily selecting one value"
            },
            {
              "ja": "時系列データ:時期の違いが矛盾として誤解されるのを防ぐために、構造化された出力に公開日・収集日を要求すること",
              "en": "Temporal data: requiring publication/collection dates in structured outputs to prevent temporal differences from being misinterpreted as contradictions"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "サブエージェントに、下流のエージェントが統合を通じて保持する構造化された主張とソースの対応関係(ソースURL、文書名、関連する抜粋)を出力するよう要求する",
              "en": "Requiring subagents to output structured claim-source mappings (source URLs, document names, relevant excerpts) that downstream agents preserve through synthesis"
            },
            {
              "ja": "確立された調査結果と論争のある調査結果を区別する明示的なセクションでレポートを構造化し、元のソースの特徴付けと方法論的背景を保持する",
              "en": "Structuring reports with explicit sections distinguishing well-established findings from contested ones, preserving original source characterizations and methodological context"
            },
            {
              "ja": "矛盾する値を含めて明示的に注釈を付けた上で文書分析を完了し、統合に渡す前にどのように調整するかをコーディネーターに判断させる",
              "en": "Completing document analysis with conflicting values included and explicitly annotated, letting the coordinator decide how to reconcile before passing to synthesis"
            },
            {
              "ja": "正しい時系列の解釈を可能にするために、サブエージェントに構造化された出力へ公開日またはデータ収集日を含めることを要求する",
              "en": "Requiring subagents to include publication or data collection dates in structured outputs to enable correct temporal interpretation"
            },
            {
              "ja": "統合出力において、すべてを統一的な形式に変換するのではなく、コンテンツの種類に応じて適切に表現する—財務データは表、ニュースは文章、技術的な調査結果は構造化されたリストとして",
              "en": "Rendering different content types appropriately in synthesis outputs—financial data as tables, news as prose, technical findings as structured lists—rather than converting everything to a uniform format"
            }
          ]
        }
      ]
    }
  ]
};
