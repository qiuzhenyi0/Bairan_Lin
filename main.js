window.onload = function() {
  console.log("Project Zero 腳本啟動中...");

  // 1. 幸運計算邏輯 (固定日期隨機)
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

  // 2. 渲染籤詩
  function renderLuck() {
    const el = document.getElementById('luck');
    if (el) {
      const score = calcLuck();
      el.textContent = score + " — " + luckPhrase(score);
    }
  }

  // 3. 綁定按鈕
  const refreshBtn = document.getElementById('refreshLuck');
  if (refreshBtn) {
    refreshBtn.onclick = function() {
      // 點擊按鈕時稍微閃一下表示有在抽
      const el = document.getElementById('luck');
      el.textContent = "正在請求神諭...";
      setTimeout(renderLuck, 300);
    };
  }

  // 4. 小狗搖尾巴 (增加安全檢查)
  const tail = document.getElementById('dogTail');
  const dog = document.getElementById('pixelDog');
  let wagTimeout;
  if (dog && tail) {
    dog.onclick = function() {
      tail.style.transform = 'rotate(30deg)';
      clearTimeout(wagTimeout);
      wagTimeout = setTimeout(() => { tail.style.transform = 'rotate(-6deg)'; }, 300);
    };
  }

  // 5. 流星 spawner (增加安全檢查)
  const sky = document.getElementById('sky');
  if (sky) {
    function spawnMeteor() {
      const m = document.createElement('div');
      m.className = 'meteor';
      m.style.left = (Math.random() * 80 + 5) + '%';
      m.style.top = (Math.random() * 20) + '%';
      sky.appendChild(m);
      m.style.transition = 'transform 1200ms linear, opacity 1200ms linear';
      requestAnimationFrame(() => {
        m.style.transform = 'translateX(200px) translateY(120px) rotate(-30deg)';
        m.style.opacity = '0';
      });
      setTimeout(() => m.remove(), 1400);
    }
    setInterval(spawnMeteor, 5000 + Math.random() * 8000);
  }

  // 啟動執行
  renderLuck();
};
