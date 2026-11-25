// =================================================================
//  ❌ 改善前の重いスクリプト（starter/js/main.js）
//  1. 読み込み時にメインスレッドを約450ミリ秒ロックする重い初期化ループ（TBT悪化の原因）
//  2. スクロールするたびに毎回全要素の座標を計算する旧来の scroll イベント監視（INP悪化の原因）
//
//  👉 TODO [Step 6]:
//  ① index.html の <script> タグに defer 属性を付けよう！
//  ② 下の「❌ 改善前のコード」を削除（またはコメントアウト）し、
//     「⭕️ 改善後のコード（IntersectionObserver）」を有効化しよう！
// =================================================================

// --- ❌ 改善前のコード（ここから） ---
const startTime = performance.now();
while (performance.now() - startTime < 450) {
  // 初期読み込み時の重い同期処理（メインスレッドをブロックし、画面描画を止めてしまう）
}

function checkScrollFadeIn() {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add("is-visible");
    }
  });
}

window.addEventListener("scroll", checkScrollFadeIn);
window.addEventListener("DOMContentLoaded", checkScrollFadeIn);
// --- ❌ 改善前のコード（ここまで） ---


/* --- ⭕️ 改善後のコード（IntersectionObserver：コメントを外して使おう！） ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target); // 1回表示したら監視を解除してメモリを節約！
    }
  });
});

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
*/
