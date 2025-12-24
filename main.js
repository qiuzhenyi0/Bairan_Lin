window.onload = function() {
  // --- 1. 幸運計算 (日期固定隨機) ---
  function calcLuck() {
    const s = new Date().toDateString();
    let n = 0;
    for (let i = 0; i < s.length; i++) n += s.charCodeAt(i);
    return (n * 13) % 101; 
  }

  function luckPhrase(score) {
    if (score > 80) return "預言：今日宇宙偏向於你。";
    if (score > 60) return "預言：可嘗試，亦不保證。";
    if (score > 40) return "預言：平凡之日。";
    if (score > 20) return "預言：小心選擇你的疲憊。";
    return "預言：今日宜靜。";
  }

  const luckEl = document.getElementById('luck');
  if (luckEl) {
    const score = calcLuck();
    luckEl.textContent = score + " — " + luckPhrase(score);
  }

  // --- 2. 小狗搖尾巴 ---
  const tail = document.getElementById('dogTail');
  const dog = document.getElementById('pixelDog');
  let wagTimeout;

  if (dog && tail) {
    dog.onclick = function() {
      tail.style.transform = 'rotate(40deg)'; // 尾巴向上翹
      clearTimeout(wagTimeout);
      wagTimeout = setTimeout(() => {
        tail.style.transform = 'rotate(-6deg)'; // 回到原位
      }, 300);
    };
  }

  // --- 3. 自動流星 (純視覺裝飾) ---
  const sky = document.getElementById('sky');
  if (sky) {
    function spawnMeteor() {
      const m = document.createElement('div');
      m.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: white;
        box-shadow: 0 0 5px white;
        left: ${Math.random() * 80 + 10}%;
        top: ${Math.random() * 20}%;
        z-index: 1;
        opacity: 1;
        transition: transform 1.2s linear, opacity 1.2s linear;
      `;
      sky.appendChild(m);
      requestAnimationFrame(() => {
        m.style.transform = 'translateX(200px) translateY(120px) rotate(-30deg)';
        m.style.opacity = '0';
      });
      setTimeout(() => m.remove(), 1300);
    }
    setInterval(spawnMeteor, 6000);
  }
};
