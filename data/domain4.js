window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["domain4"] = {
  "id": "domain4",
  "title": "Domain 4: Prompt Engineering & Structured Output",
  "titleJa": "ドメイン4: プロンプトエンジニアリングと構造化出力",
  "summaryHtml": "<h3>全体像</h3><p>このドメインは、<strong>Claudeの出力を「正確・一貫・構造化された」ものにするためのプロンプト設計と検証の技法</strong>を扱う。6つのタスクは大きく3つの塊に分けられる。</p><h4>① プロンプト品質の基礎(4.1・4.2)</h4><ul><li><strong>曖昧な指示(「保守的に」「高確信度のみ報告」)は精度を改善しない</strong>。報告すべき/除外すべき事象を具体的な基準で定義することが必要</li><li><strong>few-shot例</strong>は詳細な指示だけでは達成できない出力の一貫性・曖昧ケースの判断・ハルシネーション低減に最も効果的な手法</li></ul><h4>② 構造化出力の保証と検証(4.3・4.4)</h4><ul><li><strong>tool_use + JSONスキーマ</strong>は構文エラーを排除する最も信頼できる手段だが、<strong>意味的な誤り(合計値の不一致など)は防げない</strong></li><li>tool_choiceは「auto」「any」「特定ツール強制」の3種類で使い分ける</li><li>再試行は<strong>形式的な誤りには有効だが、情報がそもそも存在しない場合は無効</strong></li></ul><h4>③ スケールと品質保証の設計(4.5・4.6)</h4><ul><li><strong>Message Batches API</strong>はコスト50%削減・最大24時間処理だが<strong>レイテンシSLAなし</strong>。ブロッキングworkflowには不向き</li><li><strong>自己レビューは生成時の推論コンテキストを引き継ぐため甘くなりがち</strong>。独立したインスタンスによるレビューやファイル単位+統合パスの多段レビューが有効</li></ul>",
  "sections": [
    {
      "heading": "タスクステートメント4.1: 精度を高め誤検知を減らすための明示的な基準を持つプロンプト設計",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "曖昧な指示よりも明示的な基準を用いることの重要性(例:「主張された挙動が実際のコードの挙動と矛盾する場合にのみコメントにフラグを立てる」と「コメントが正確であることを確認する」の比較)",
              "en": "The importance of explicit criteria over vague instructions (e.g., \"flag comments only when claimed behavior contradicts actual code behavior\" vs \"check that comments are accurate\")"
            },
            {
              "ja": "「保守的に」や「高確信度の発見のみ報告する」といった一般的な指示が、具体的なカテゴリ別基準に比べて精度の改善に失敗する理由",
              "en": "How general instructions like \"be conservative\" or \"only report high-confidence findings\" fail to improve precision compared to specific categorical criteria"
            },
            {
              "ja": "誤検知率が開発者の信頼に与える影響:誤検知の多いカテゴリが、正確なカテゴリへの信頼まで損なうこと",
              "en": "The impact of false positive rates on developer trust: high false positive categories undermine confidence in accurate categories"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "確信度に基づくフィルタリングに依存するのではなく、報告すべき問題(バグ、セキュリティ)と省略すべき問題(軽微なスタイル、ローカルなパターン)を定義する具体的なレビュー基準を書く",
              "en": "Writing specific review criteria that define which issues to report (bugs, security) versus skip (minor style, local patterns) rather than relying on confidence-based filtering"
            },
            {
              "ja": "誤検知率の高いカテゴリを一時的に無効化して開発者の信頼を回復させ、その間にそのカテゴリのプロンプトを改善する",
              "en": "Temporarily disabling high false-positive categories to restore developer trust while improving prompts for those categories"
            },
            {
              "ja": "各重大度レベルについて具体的なコード例を伴う明示的な重大度基準を定義し、一貫した分類を実現する",
              "en": "Defining explicit severity criteria with concrete code examples for each severity level to achieve consistent classification"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント4.2: 出力の一貫性と品質を高めるためのfew-shotプロンプティングの適用",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "詳細な指示だけでは一貫性のない結果になる場合に、一貫してフォーマットされた実用的な出力を得るための最も効果的な手法としてのfew-shot例",
              "en": "Few-shot examples as the most effective technique for achieving consistently formatted, actionable output when detailed instructions alone produce inconsistent results"
            },
            {
              "ja": "曖昧なケースの処理(例:曖昧なリクエストに対するツール選択、ブランチレベルのテストカバレッジのギャップ)を示す上でのfew-shot例の役割",
              "en": "The role of few-shot examples in demonstrating ambiguous-case handling (e.g., tool selection for ambiguous requests, branch-level test coverage gaps)"
            },
            {
              "ja": "few-shot例が、事前に指定されたケースにのみ一致させるのではなく、モデルが新しいパターンに判断を一般化できるようにする方法",
              "en": "How few-shot examples enable the model to generalize judgment to novel patterns rather than matching only pre-specified cases"
            },
            {
              "ja": "抽出タスクにおけるハルシネーション低減のためのfew-shot例の有効性(例:非公式な計測値や様々な文書構造の処理)",
              "en": "The effectiveness of few-shot examples for reducing hallucination in extraction tasks (e.g., handling informal measurements, varied document structures)"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "曖昧なシナリオに対して、妥当な代替案の中からあるアクションが選ばれた理由の推論を示す2〜4個の的を絞ったfew-shot例を作成する",
              "en": "Creating 2-4 targeted few-shot examples for ambiguous scenarios that show reasoning for why one action was chosen over plausible alternatives"
            },
            {
              "ja": "一貫性を実現するために、望ましい出力形式(場所、問題、重大度、修正案)を具体的に示すfew-shot例を含める",
              "en": "Including few-shot examples that demonstrate specific desired output format (location, issue, severity, suggested fix) to achieve consistency"
            },
            {
              "ja": "許容できるコードパターンと本当の問題を区別するfew-shot例を提供し、一般化を可能にしつつ誤検知を減らす",
              "en": "Providing few-shot examples distinguishing acceptable code patterns from genuine issues to reduce false positives while enabling generalization"
            },
            {
              "ja": "様々な文書構造(インライン引用と参考文献一覧、方法論セクションと本文中の埋め込み詳細)の正しい処理を示すためにfew-shot例を用いる",
              "en": "Using few-shot examples to demonstrate correct handling of varied document structures (inline citations vs bibliographies, methodology sections vs embedded details)"
            },
            {
              "ja": "必須フィールドの空/null抽出という問題に対応するため、様々な形式の文書からの正しい抽出例を示すfew-shot例を追加する",
              "en": "Adding few-shot examples showing correct extraction from documents with varied formats to address empty/null extraction of required fields"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント4.3: ツール使用とJSONスキーマによる構造化出力の強制",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "スキーマに準拠した構造化出力を保証し、JSON構文エラーを排除する最も信頼できるアプローチとしてのJSONスキーマを用いたツール使用(tool_use)",
              "en": "Tool use (tool_use) with JSON schemas as the most reliable approach for guaranteed schema-compliant structured output, eliminating JSON syntax errors"
            },
            {
              "ja": "tool_choice: 「auto」(モデルはツールを呼ばずテキストを返してもよい)、「any」(モデルは必ずツールを呼ぶがどのツールかは選べる)、強制的なツール選択(モデルは特定の指定されたツールを必ず呼ぶ)の違い",
              "en": "The distinction between tool_choice: \"auto\" (model may return text instead of calling a tool), \"any\" (model must call a tool but can choose which), and forced tool selection (model must call a specific named tool)"
            },
            {
              "ja": "ツール使用による厳格なJSONスキーマは構文エラーを排除するが、意味的な誤り(合計と一致しない項目、間違ったフィールドに入った値など)は防げないこと",
              "en": "That strict JSON schemas via tool use eliminate syntax errors but do not prevent semantic errors (e.g., line items that don't sum to total, values in wrong fields)"
            },
            {
              "ja": "スキーマ設計上の考慮事項:必須フィールドと任意フィールド、拡張可能なカテゴリのための「other」+詳細文字列パターンを伴う列挙フィールド",
              "en": "Schema design considerations: required vs optional fields, enum fields with \"other\" + detail string patterns for extensible categories"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "JSONスキーマを入力パラメータとする抽出用ツールを定義し、tool_useレスポンスから構造化データを抽出する",
              "en": "Defining extraction tools with JSON schemas as input parameters and extracting structured data from the tool_use response"
            },
            {
              "ja": "複数の抽出スキーマが存在し文書タイプが不明な場合に、構造化出力を保証するためtool_choice: 「any」を設定する",
              "en": "Setting tool_choice: \"any\" to guarantee structured output when multiple extraction schemas exist and the document type is unknown"
            },
            {
              "ja": "エンリッチメントステップの前に特定の抽出を必ず実行させるため、tool_choice: {\"type\": \"tool\", \"name\": \"extract_metadata\"}のように特定のツールを強制する",
              "en": "Forcing a specific tool with tool_choice: {\"type\": \"tool\", \"name\": \"extract_metadata\"} to ensure a particular extraction runs before enrichment steps"
            },
            {
              "ja": "元の文書に情報が含まれていない場合があるスキーマフィールドを任意(nullable)に設計し、モデルが必須フィールドを満たすために値を作り出すことを防ぐ",
              "en": "Designing schema fields as optional (nullable) when source documents may not contain the information, preventing the model from fabricating values to satisfy required fields"
            },
            {
              "ja": "曖昧なケース用の「unclear」のような列挙値と、拡張可能な分類のための「other」+詳細フィールドを追加する",
              "en": "Adding enum values like \"unclear\" for ambiguous cases and \"other\" + detail fields for extensible categorization"
            },
            {
              "ja": "元データの表記の不整合に対応するため、厳格な出力スキーマと併せてプロンプト内に形式正規化ルールを含める",
              "en": "Including format normalization rules in prompts alongside strict output schemas to handle inconsistent source formatting"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント4.4: 抽出品質のための検証・再試行・フィードバックループの実装",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "エラーフィードバックを伴う再試行:再試行時に具体的な検証エラーをプロンプトに追加し、モデルを修正へと導く",
              "en": "Retry-with-error-feedback: appending specific validation errors to the prompt on retry to guide the model toward correction"
            },
            {
              "ja": "再試行の限界:必要な情報が単に元の文書に存在しない場合(形式や構造上の誤りの場合とは異なり)、再試行は効果がない",
              "en": "The limits of retry: retries are ineffective when the required information is simply absent from the source document (vs format or structural errors)"
            },
            {
              "ja": "フィードバックループの設計:どのコード構造が発見事項を引き起こしたかを追跡する(detected_patternフィールド)ことで、却下パターンの体系的な分析を可能にする",
              "en": "Feedback loop design: tracking which code constructs trigger findings (detected_pattern field) to enable systematic analysis of dismissal patterns"
            },
            {
              "ja": "意味的な検証エラー(値が合計と一致しない、フィールドの配置が誤っている)と、(ツール使用によって排除される)スキーマ構文エラーとの違い",
              "en": "The difference between semantic validation errors (values don't sum, wrong field placement) and schema syntax errors (eliminated by tool use)"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "元の文書、失敗した抽出結果、具体的な検証エラーを含むフォローアップリクエストを実装し、モデルによる自己修正を可能にする",
              "en": "Implementing follow-up requests that include the original document, the failed extraction, and specific validation errors for model self-correction"
            },
            {
              "ja": "再試行が効果がないケース(例:情報が提供されていない外部文書にのみ存在する場合)と、成功するケース(形式の不一致、構造上の出力エラー)を見分ける",
              "en": "Identifying when retries will be ineffective (e.g., information exists only in an external document not provided) versus when they will succeed (format mismatches, structural output errors)"
            },
            {
              "ja": "開発者が発見事項を却下した際の誤検知パターンの分析を可能にするため、構造化された発見事項にdetected_patternフィールドを追加する",
              "en": "Adding detected_pattern fields to structured findings to enable analysis of false positive patterns when developers dismiss findings"
            },
            {
              "ja": "自己修正の検証フローを設計する:不一致を検出するために「stated_total」と並行して「calculated_total」を抽出する、矛盾するソースデータのために「conflict_detected」のブール値を追加する",
              "en": "Designing self-correction validation flows: extracting \"calculated_total\" alongside \"stated_total\" to flag discrepancies, adding \"conflict_detected\" booleans for inconsistent source data"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント4.5: 効率的なバッチ処理戦略の設計",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "Message Batches API:コストを50%削減できるが、最大24時間の処理ウィンドウがあり、保証されたレイテンシSLAはない",
              "en": "The Message Batches API: 50% cost savings, up to 24-hour processing window, no guaranteed latency SLA"
            },
            {
              "ja": "バッチ処理は非ブロッキングでレイテンシに寛容なワークロード(夜間レポート、週次監査、夜間テスト生成)に適しており、ブロッキング型のワークフロー(マージ前チェック)には不適切であること",
              "en": "Batch processing is appropriate for non-blocking, latency-tolerant workloads (overnight reports, weekly audits, nightly test generation) and inappropriate for blocking workflows (pre-merge checks)"
            },
            {
              "ja": "バッチAPIは1つのリクエスト内でのマルチターンのツール呼び出しをサポートしないこと(リクエストの途中でツールを実行して結果を返すことはできない)",
              "en": "The batch API does not support multi-turn tool calling within a single request (cannot execute tools mid-request and return results)"
            },
            {
              "ja": "バッチのリクエストとレスポンスの対応付けのためのcustom_idフィールド",
              "en": "custom_id fields for correlating batch request/response pairs"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "ワークフローのレイテンシ要件にAPIアプローチを合わせる:ブロッキング型のマージ前チェックには同期API、夜間・週次の分析にはバッチAPI",
              "en": "Matching API approach to workflow latency requirements: synchronous API for blocking pre-merge checks, batch API for overnight/weekly analysis"
            },
            {
              "ja": "SLA制約に基づいてバッチの投入頻度を計算する(例:24時間のバッチ処理で30時間のSLAを保証するために4時間ごとのウィンドウとする)",
              "en": "Calculating batch submission frequency based on SLA constraints (e.g., 4-hour windows to guarantee 30-hour SLA with 24-hour batch processing)"
            },
            {
              "ja": "バッチの失敗を処理する:custom_idで識別された失敗した文書のみを、適切な修正(例:コンテキスト上限を超えた文書のチャンク分割)を加えて再投入する",
              "en": "Handling batch failures: resubmitting only failed documents (identified by custom_id) with appropriate modifications (e.g., chunking documents that exceeded context limits)"
            },
            {
              "ja": "大量のバッチ処理を行う前にサンプルセットでプロンプトを改善し、初回成功率を最大化して反復的な再投入コストを減らす",
              "en": "Using prompt refinement on a sample set before batch-processing large volumes to maximize first-pass success rates and reduce iterative resubmission costs"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント4.6: 複数インスタンス・複数パスによるレビューアーキテクチャの設計",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "自己レビューの限界:モデルは生成時の推論コンテキストを保持しているため、同じセッション内で自身の判断に疑問を持ちにくい",
              "en": "Self-review limitations: a model retains reasoning context from generation, making it less likely to question its own decisions in the same session"
            },
            {
              "ja": "(事前の推論コンテキストを持たない)独立したレビュー用インスタンスは、自己レビューの指示や拡張思考よりも微妙な問題を捉えるのに効果的であること",
              "en": "Independent review instances (without prior reasoning context) are more effective at catching subtle issues than self-review instructions or extended thinking"
            },
            {
              "ja": "複数パスレビュー:大規模なレビューを、注意の分散や矛盾する発見事項を避けるために、ファイルごとのローカル分析パスとファイル間の統合パスに分割する",
              "en": "Multi-pass review: splitting large reviews into per-file local analysis passes plus cross-file integration passes to avoid attention dilution and contradictory findings"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "生成側の推論コンテキストを持たない、第2の独立したClaudeインスタンスを使って生成されたコードをレビューする",
              "en": "Using a second independent Claude instance to review generated code without the generator's reasoning context"
            },
            {
              "ja": "大規模な複数ファイルのレビューを、ローカルな問題のための集中的なファイルごとのパスと、ファイル間のデータフロー分析のための別の統合パスに分割する",
              "en": "Splitting large multi-file reviews into focused per-file passes for local issues plus separate integration passes for cross-file data flow analysis"
            },
            {
              "ja": "モデルが各発見事項とともに自身の確信度を自己報告する検証パスを実行し、確信度に応じたレビューのルーティングを可能にする",
              "en": "Running verification passes where the model self-reports confidence alongside each finding to enable calibrated review routing"
            }
          ]
        }
      ]
    }
  ]
};
