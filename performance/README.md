# 授業ハンズオン：LUMINA EXHIBITION 2026（Webサイトパフォーマンス改善）

デジタルアート展「**LUMINA EXHIBITION 2026**」の特設LP（`index.html`）を題材に、Chrome DevTools の **Lighthouse** と **Networkタブ** でスコア・通信量を計測しながら、段階的に高速化を実装していくハンズオン演習データです。

---

## 1. Before（`starter/`）と After（`completed/`）の比較

| 項目 | ❌ 改善前（`starter/`） | ⭕️ 改善後（`completed/`） |
| --- | --- | --- |
| **画像合計サイズ** | **約 12.6 MB**（未圧縮・巨大PNG 5枚） | **約 41 KB**（WebP / AVIF / SVG：約 **99.6% 削減**） |
| **LCP（最大視覚コンテンツ）** | 3.5MBのメイン画像に誤って `loading="lazy"` が付いており大幅に遅延 | 19KBのAVIF/WebP ＋ `fetchpriority="high"` で瞬時に表示 |
| **CLS（レイアウトシフト）** | `<img>` に `width` / `height` がなく、読み込み時に下がガタンとズレる | 全画像に `width` / `height`、マップ枠に `aspect-ratio: 16 / 9` を指定し **CLS 0.000** |
| **TBT / INP（応答性・JS）** | `<head>` 内の同期JS＋450msの初期化ブロック＋`scroll` イベント監視 | `defer` 属性 ＋ `IntersectionObserver` ＋ GPU合成（`transform`）で **TBT 0ms** |
| **Webフォント・CSS** | CSS内の `@import` で6ウェイト全てを直列読み込み（`display=swap` なし） | `<head>` 内の `preconnect` ＋ 2ウェイト（400, 700）のみ ＋ `display=swap` ＋ CSS圧縮 |

---

## 2. ハンズオンの進め方（全6ステップ）

講義資料『`06_Webサイトパフォーマンス.md`』の各章にある **【🛠 ハンズオン Step 0 〜 Step 6】** に沿って進めます。

- **Step 0（3章）**：改善前のスコアと容量を Networkタブ・Lighthouse で計測する
- **Step 1（4-1）**：巨大PNG4枚をリサイズ＆WebP変換し、ロゴを `logo.svg` に差し替える
- **Step 2（4-4）**：Live Sass Compiler の出力形式を `compressed` に設定する
- **Step 3（5章）**：全 `<img>` に `width` / `height` 属性を追加し、`.access__map` に `aspect-ratio: 16 / 9;` を指定する
- **Step 4（6-2）**：`style.scss` の `@import` を削除し、`<head>` に `preconnect` ＋ 2ウェイト（`400;700`）＋ `display=swap` を追加する
- **Step 5（6-3）**：`.hero__img` の `loading="lazy"` を削除して `fetchpriority="high"` にし、下部カード画像3枚と Googleマップの `<iframe>` に `loading="lazy"` を追加する
- **Step 6（6-6）**：`<script>` に `defer` を付け、`main.js` を `IntersectionObserver` に切り替え、`.fade-in` を `transform: translateY(24px)` に変更して Lighthouse で再計測する
