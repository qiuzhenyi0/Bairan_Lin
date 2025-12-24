window.onload = function() {
  /** 1. 幸運計算 (固定日期隨機) **/
  function calcLuck() {
    // 取得當天日期字串，例如 "Wed Dec 24 2025"
    const s = new Date().toDateString();
    let n = 0;
    for (let i = 0; i < s.length; i++) {
      n += s.charCodeAt(i);
    }
    // 使用算式確保每天數字固定，n*13 是為了增加數值差異
    return (n * 13) % 101;
  }

  function luckPhrase(score) {
    if (score > 80) return "預言：今日宇宙偏向於你。";
    if (score > 60) return "預言：可嘗試，亦不保證。";
    if (score > 40) return "預言：平凡之日。";
    if (score > 20) return "預言：小心選擇你的疲憊。";
    return "預言：今日宜靜。";
  }

  /** 2. 顯示結果 **/
  const luckEl = document.getElementById('luck');
  if (luckEl) {
    const score = calcLuck();
    luckEl.textContent = score + " — " + luckPhrase(score);
  }

  /** 3. 小狗搖尾巴功能 **/
  const tail = document.getElementById('dogTail');
  const dog = document.getElementById('pixelDog');
  let wagTimeout;
  if (dog && tail) {
    dog.onclick = function() {
      // 旋轉尾巴標籤
      tail.style.transform = 'rotate(30deg)';
      clearTimeout(wagTimeout);
      // 0.3秒後轉回來
      wagTimeout = setTimeout(() => { 
        tail.style.transform = 'rotate(-6deg)'; 
      }, 300);
    };
  }

  /** 4. 自動流星效果 **/
  const sky = document.getElementById('sky');
  if (sky) {
    function spawnMeteor() {
      const m = document.createElement('div');
      // 需在 style.css 定義 .meteor 樣式
      m.className = 'meteor';
      m.style.position = 'fixed';
      m.style.width = '2px';
      m.style.height = '2px';
      m.style.background = 'white';
      m.style.left = (Math.random() * 80 + 5) + '%';
      m.style.top = (Math.random() * 20) + '%';
      m.style.opacity = '1';
      
      sky.appendChild(m);
      
      m.style.transition = 'transform 1200ms linear, opacity 1200ms linear';
      
      requestAnimationFrame(() => {
        m.style.transform = 'translateX(200px) translateY(120px) rotate(-30deg)';
        m.style.opacity = '0';
      });
      
      setTimeout(() => m.remove(), 1400);
    }
    // 每 5~13 秒隨機出現一顆流星
    setInterval(spawnMeteor, 5000 + Math.random() * 8000);
  }
};
