window.EXAM_DATA = window.EXAM_DATA || {};
window.EXAM_DATA["domain3"] = {
  "id": "domain3",
  "title": "Domain 3: Claude Code Configuration & Workflows",
  "titleJa": "ドメイン3: Claude Code設定とワークフロー",
  "summaryHtml": "<h3>全体像</h3><p>このドメインは、<strong>Claude Codeを日々の開発ワークフローに組み込むための設定・運用知識</strong>を扱う。6つのタスクは大きく3つの塊に分けられる。</p><h4>① メモリ・カスタマイズ設定(3.1・3.2)</h4><ul><li>CLAUDE.mdには<strong>ユーザー・プロジェクト・ディレクトリ</strong>の3階層があり、ユーザーレベルはバージョン管理でチームに共有されない点に注意</li><li><code>@import</code>や<code>.claude/rules/</code>で<strong>モノリシックなCLAUDE.mdを分割</strong>し、モジュール化する</li><li>カスタムスラッシュコマンドやスキル(SKILL.md)は<strong>プロジェクトスコープ(チーム共有)とユーザースコープ(個人用)</strong>を区別し、<code>context: fork</code>で冗長な出力を本流の会話から隔離する</li></ul><h4>② 条件付きルールと実行モードの選択(3.3・3.4)</h4><ul><li><code>.claude/rules/</code>の<strong>グロブパターンによるパス限定ルール</strong>は、該当ファイルを編集するときだけ読み込まれ、無駄なコンテキストを削減する</li><li><strong>プランモード</strong>は大規模・多面的で設計判断を伴う変更に、<strong>直接実行</strong>は範囲が明確な単純な変更に向く</li></ul><h4>③ 反復的改善とCI/CD統合(3.5・3.6)</h4><ul><li><strong>具体的な入出力例・テスト駆動反復・インタビューパターン</strong>によって、曖昧な自然言語指示のずれを減らす</li><li>相互作用する問題は<strong>一括で伝え</strong>、独立した問題は<strong>逐次修正</strong>する</li><li>CI/CDでは<code>-p</code>フラグで非対話実行し、<code>--output-format json</code>で構造化出力を強制。<strong>コードを生成した同一セッションはレビューに不向き</strong>で、独立したレビューインスタンスを使うべき</li></ul><table><thead><tr><th>観点</th><th>良いプラクティス</th><th>アンチパターン</th></tr></thead><tbody><tr><td>CLAUDE.md共有</td><td>プロジェクトレベルで管理</td><td>個人設定に依存</td></tr><tr><td>ルールの粒度</td><td>パス指定ルールで分割</td><td>肥大化した単一ファイル</td></tr><tr><td>実行方針</td><td>複雑さに応じプラン/直接を選択</td><td>常に同じモードで実行</td></tr><tr><td>要件伝達</td><td>具体例・テストで明確化</td><td>プロセス文のみ</td></tr><tr><td>CIレビュー</td><td>独立セッションで実施</td><td>生成元セッションで自己レビュー</td></tr></tbody></table>",
  "sections": [
    {
      "heading": "タスクステートメント3.1: 適切な階層・スコープ・モジュール構成でCLAUDE.mdファイルを設定する",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "CLAUDE.mdの設定階層: ユーザーレベル(~/.claude/CLAUDE.md)、プロジェクトレベル(.claude/CLAUDE.mdまたはルートのCLAUDE.md)、ディレクトリレベル(サブディレクトリのCLAUDE.mdファイル)",
              "en": "The CLAUDE.md configuration hierarchy: user-level (~/.claude/CLAUDE.md), project-level (.claude/CLAUDE.md or root CLAUDE.md), and directory-level (subdirectory CLAUDE.md files)"
            },
            {
              "ja": "ユーザーレベルの設定はそのユーザーのみに適用される—~/.claude/CLAUDE.md内の指示はバージョン管理を通じてチームメイトと共有されない",
              "en": "That user-level settings apply only to that user—instructions in ~/.claude/CLAUDE.md are not shared with teammates via version control"
            },
            {
              "ja": "CLAUDE.mdをモジュール化するために外部ファイルを参照する@importの構文(例:各パッケージに関連する特定の標準ファイルをインポートする)",
              "en": "The @import syntax for referencing external files to keep CLAUDE.md modular (e.g., importing specific standards files relevant to each package)"
            },
            {
              "ja": "モノリシックなCLAUDE.mdの代替として、トピック別のルールファイルを整理するための.claude/rules/ディレクトリ",
              "en": ".claude/rules/ directory for organizing topic-specific rule files as an alternative to a monolithic CLAUDE.md"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "設定階層に関する問題の診断(例:新しいチームメンバーがプロジェクトレベルではなくユーザーレベルの設定にいるために指示を受け取れていない)",
              "en": "Diagnosing configuration hierarchy issues (e.g., a new team member not receiving instructions because they're in user-level rather than project-level configuration)"
            },
            {
              "ja": "メンテナーのドメイン知識に基づき、各パッケージのCLAUDE.mdに関連する標準ファイルを選択的に含めるために@importを使用する",
              "en": "Using @import to selectively include relevant standards files in each package's CLAUDE.md based on maintainer domain knowledge"
            },
            {
              "ja": "大規模なCLAUDE.mdファイルを、.claude/rules/内のトピック別の焦点を絞ったファイルに分割する(例:testing.md、api-conventions.md、deployment.md)",
              "en": "Splitting large CLAUDE.md files into focused topic-specific files in .claude/rules/ (e.g., testing.md, api-conventions.md, deployment.md)"
            },
            {
              "ja": "どのメモリファイルが読み込まれているかを確認し、セッション間の一貫性のない動作を診断するために/memoryコマンドを使用する",
              "en": "Using the /memory command to verify which memory files are loaded and diagnose inconsistent behavior across sessions"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント3.2: カスタムスラッシュコマンドとスキルの作成と設定",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "バージョン管理で共有されるプロジェクトスコープの.claude/commands/内のコマンドと、個人用のユーザースコープの~/.claude/commands/内のコマンドの違い",
              "en": "Project-scoped commands in .claude/commands/ (shared via version control) vs user-scoped commands in ~/.claude/commands/ (personal)"
            },
            {
              "ja": "context: fork、allowed-tools、argument-hintを含むフロントマター設定をサポートするSKILL.mdファイルを持つ.claude/skills/内のスキル",
              "en": "Skills in .claude/skills/ with SKILL.md files that support frontmatter configuration including context: fork, allowed-tools, and argument-hint"
            },
            {
              "ja": "スキルを分離されたサブエージェントコンテキストで実行し、スキルの出力がメインの会話を汚染しないようにするcontext: forkフロントマターオプション",
              "en": "The context: fork frontmatter option for running skills in an isolated sub-agent context, preventing skill outputs from polluting the main conversation"
            },
            {
              "ja": "個人用のスキルカスタマイズ: チームメイトに影響を与えないよう異なる名前で~/.claude/skills/内に個人用のバリアントを作成する",
              "en": "Personal skill customization: creating personal variants in ~/.claude/skills/ with different names to avoid affecting teammates"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "チーム全体での利用可能性のために、.claude/commands/内にプロジェクトスコープのスラッシュコマンドをバージョン管理を通じて作成する",
              "en": "Creating project-scoped slash commands in .claude/commands/ for team-wide availability via version control"
            },
            {
              "ja": "冗長な出力(例:コードベース分析)や探索的なコンテキスト(例:代替案のブレインストーミング)を生成するスキルをメインセッションから分離するためにcontext: forkを使用する",
              "en": "Using context: fork to isolate skills that produce verbose output (e.g., codebase analysis) or exploratory context (e.g., brainstorming alternatives) from the main session"
            },
            {
              "ja": "スキル実行中のツールアクセスを制限するために、スキルのフロントマターでallowed-toolsを設定する(例:破壊的な操作を防ぐためファイル書き込み操作のみに制限する)",
              "en": "Configuring allowed-tools in skill frontmatter to restrict tool access during skill execution (e.g., limiting to file write operations to prevent destructive actions)"
            },
            {
              "ja": "開発者が引数なしでスキルを呼び出した際に必要なパラメータを促すためにargument-hintフロントマターを使用する",
              "en": "Using argument-hint frontmatter to prompt developers for required parameters when they invoke the skill without arguments"
            },
            {
              "ja": "スキル(タスク固有のワークフローのためのオンデマンド呼び出し)とCLAUDE.md(常時読み込まれる汎用的な標準)の選択",
              "en": "Choosing between skills (on-demand invocation for task-specific workflows) and CLAUDE.md (always-loaded universal standards)"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント3.3: 条件付き規約読み込みのためのパス固有ルールの適用",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "条件付きルール有効化のためのグロブパターンを含むpathsフィールドを持つYAMLフロントマターの.claude/rules/ファイル",
              "en": ".claude/rules/ files with YAML frontmatter paths fields containing glob patterns for conditional rule activation"
            },
            {
              "ja": "パス指定ルールが一致するファイルを編集する際にのみ読み込まれ、無関係なコンテキストとトークン使用量を削減する方法",
              "en": "How path-scoped rules load only when editing matching files, reducing irrelevant context and token usage"
            },
            {
              "ja": "複数のディレクトリにまたがる規約(例:コードベース全体に散らばったテストファイル)に対して、ディレクトリレベルのCLAUDE.mdファイルよりもグロブパターンルールが優れている点",
              "en": "The advantage of glob-pattern rules over directory-level CLAUDE.md files for conventions that span multiple directories (e.g., test files spread throughout a codebase)"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "一致するファイルを編集する際にのみルールが読み込まれるように、YAMLフロントマターでパスをスコープした.claude/rules/ファイルを作成する(例:paths: [\"terraform/**/*\"])",
              "en": "Creating .claude/rules/ files with YAML frontmatter path scoping (e.g., paths: [\"terraform/**/*\"]) so rules load only when editing matching files"
            },
            {
              "ja": "ディレクトリの場所にかかわらずファイルの種類ごとに規約を適用するために、パス固有ルールでグロブパターンを使用する(例:すべてのテストファイルに対する**/*.test.tsx)",
              "en": "Using glob patterns in path-specific rules to apply conventions to files by type regardless of directory location (e.g., **/*.test.tsx for all test files)"
            },
            {
              "ja": "規約がコードベース全体に散らばったファイルに適用される必要がある場合に、サブディレクトリのCLAUDE.mdファイルよりもパス固有ルールを選択する",
              "en": "Choosing path-specific rules over subdirectory CLAUDE.md files when conventions must apply to files spread across the codebase"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント3.4: プランモードと直接実行のどちらを使うべきかを判断する",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "プランモードは、大規模な変更、複数の妥当なアプローチ、アーキテクチャ上の決定、複数ファイルにわたる変更を伴う複雑なタスクのために設計されている",
              "en": "Plan mode is designed for complex tasks involving large-scale changes, multiple valid approaches, architectural decisions, and multi-file modifications"
            },
            {
              "ja": "直接実行は、単純で範囲の明確な変更に適している(例:1つの関数に単一の検証チェックを追加する)",
              "en": "Direct execution is appropriate for simple, well-scoped changes (e.g., adding a single validation check to one function)"
            },
            {
              "ja": "プランモードは変更を確定する前に安全なコードベース探索と設計を可能にし、コストのかかる手戻りを防ぐ",
              "en": "Plan mode enables safe codebase exploration and design before committing to changes, preventing costly rework"
            },
            {
              "ja": "冗長な発見結果を分離し、メインの会話にサマリーを返すためのExploreサブエージェント",
              "en": "The Explore subagent for isolating verbose discovery output and returning summaries to preserve main conversation context"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "アーキテクチャ上の影響を伴うタスクにプランモードを選択する(例:マイクロサービスの再構成、45以上のファイルに影響するライブラリ移行、異なるインフラ要件を持つ統合アプローチ間の選択)",
              "en": "Selecting plan mode for tasks with architectural implications (e.g., microservice restructuring, library migrations affecting 45+ files, choosing between integration approaches with different infrastructure requirements)"
            },
            {
              "ja": "明確な範囲を持つ理解しやすい変更に直接実行を選択する(例:明確なスタックトレースを伴う単一ファイルのバグ修正、日付検証の条件分岐の追加)",
              "en": "Selecting direct execution for well-understood changes with clear scope (e.g., a single-file bug fix with a clear stack trace, adding a date validation conditional)"
            },
            {
              "ja": "複数フェーズのタスク中にコンテキストウィンドウの枯渇を防ぐために、冗長な発見フェーズにExploreサブエージェントを使用する",
              "en": "Using the Explore subagent for verbose discovery phases to prevent context window exhaustion during multi-phase tasks"
            },
            {
              "ja": "調査にはプランモードを、実装には直接実行を組み合わせる(例:ライブラリ移行を計画してから、計画したアプローチを実行する)",
              "en": "Combining plan mode for investigation with direct execution for implementation (e.g., planning a library migration, then executing the planned approach)"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント3.5: 段階的改善のための反復的改善技法の適用",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "文章による説明が一貫性なく解釈される場合に、期待する変換を伝える最も効果的な方法としての具体的な入出力例",
              "en": "Concrete input/output examples as the most effective way to communicate expected transformations when prose descriptions are interpreted inconsistently"
            },
            {
              "ja": "テスト駆動の反復: まずテストスイートを書き、テストの失敗を共有することで段階的な改善を導く",
              "en": "Test-driven iteration: writing test suites first, then iterating by sharing test failures to guide progressive improvement"
            },
            {
              "ja": "実装前に開発者が想定していなかった検討事項を明らかにするために、Claudeに質問をさせるインタビューパターン",
              "en": "The interview pattern: having Claude ask questions to surface considerations the developer may not have anticipated before implementing"
            },
            {
              "ja": "すべての問題を1つのメッセージで提示する場合(相互作用する問題)と、順番に修正する場合(独立した問題)の使い分け",
              "en": "When to provide all issues in a single message (interacting problems) versus fixing them sequentially (independent problems)"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "自然言語による説明が一貫しない結果を生む場合に、変換要件を明確にするために2〜3個の具体的な入出力例を提示する",
              "en": "Providing 2-3 concrete input/output examples to clarify transformation requirements when natural language descriptions produce inconsistent results"
            },
            {
              "ja": "実装前に期待される動作・エッジケース・パフォーマンス要件をカバーするテストスイートを書き、テストの失敗を共有することで反復する",
              "en": "Writing test suites covering expected behavior, edge cases, and performance requirements before implementation, then iterating by sharing test failures"
            },
            {
              "ja": "馴染みのないドメインで解決策を実装する前に、設計上の検討事項(例:キャッシュ無効化戦略、失敗モード)を明らかにするためにインタビューパターンを使用する",
              "en": "Using the interview pattern to surface design considerations (e.g., cache invalidation strategies, failure modes) before implementing solutions in unfamiliar domains"
            },
            {
              "ja": "エッジケースの処理を修正するために、具体的な入力例と期待される出力を含む特定のテストケースを提示する(例:移行スクリプトでのnull値)",
              "en": "Providing specific test cases with example input and expected output to fix edge case handling (e.g., null values in migration scripts)"
            },
            {
              "ja": "修正が相互に影響する場合は1つの詳細なメッセージで複数の相互作用する問題に対処し、独立した問題の場合は逐次的な反復を行う",
              "en": "Addressing multiple interacting issues in a single detailed message when fixes interact, versus sequential iteration for independent issues"
            }
          ]
        }
      ]
    },
    {
      "heading": "タスクステートメント3.6: CI/CDパイプラインへのClaude Codeの統合",
      "groups": [
        {
          "label": "知識",
          "sentences": [
            {
              "ja": "自動化されたパイプラインでClaude Codeを非対話モードで実行するための-p(または--print)フラグ",
              "en": "The -p (or --print) flag for running Claude Code in non-interactive mode in automated pipelines"
            },
            {
              "ja": "CIコンテキストで構造化出力を強制するための--output-format jsonおよび--json-schemaのCLIフラグ",
              "en": "--output-format json and --json-schema CLI flags for enforcing structured output in CI contexts"
            },
            {
              "ja": "CI呼び出しのClaude Codeにプロジェクトのコンテキスト(テスト基準、フィクスチャの規約、レビュー基準)を提供するメカニズムとしてのCLAUDE.md",
              "en": "CLAUDE.md as the mechanism for providing project context (testing standards, fixture conventions, review criteria) to CI-invoked Claude Code"
            },
            {
              "ja": "セッションコンテキストの分離: コードを生成した同一のClaudeセッションが、独立したレビューインスタンスと比較して自身の変更をレビューする際に効果が低い理由",
              "en": "Session context isolation: why the same Claude session that generated code is less effective at reviewing its own changes compared to an independent review instance"
            }
          ]
        },
        {
          "label": "スキル",
          "sentences": [
            {
              "ja": "対話的な入力によるハングを防ぐために、CIで-pフラグを付けてClaude Codeを実行する",
              "en": "Running Claude Code in CI with the -p flag to prevent interactive input hangs"
            },
            {
              "ja": "自動化されたインラインPRコメント投稿のために、機械解析可能な構造化された所見を生成するよう--output-format jsonを--json-schemaと共に使用する",
              "en": "Using --output-format json with --json-schema to produce machine-parseable structured findings for automated posting as inline PR comments"
            },
            {
              "ja": "新しいコミット後にレビューを再実行する際、重複したコメントを避けるために新しい未対応の問題のみを報告するようClaudeに指示しつつ、以前のレビュー結果をコンテキストに含める",
              "en": "Including prior review findings in context when re-running reviews after new commits, instructing Claude to report only new or still-unaddressed issues to avoid duplicate comments"
            },
            {
              "ja": "テスト生成が既存のテストスイートで既にカバーされている重複したシナリオを提案しないように、既存のテストファイルをコンテキストに提供する",
              "en": "Providing existing test files in context so test generation avoids suggesting duplicate scenarios already covered by the test suite"
            }
          ]
        }
      ]
    }
  ]
};
