// =================================================================
//  ⭕️ 改善後の軽量スクリプト（completed/js/main.js）
//  ・IntersectionObserver により、要素が画面に入った瞬間だけ1回発火
//  ・表示後は unobserve() で監視を解除し、メインスレッド負荷ゼロ
// =================================================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
