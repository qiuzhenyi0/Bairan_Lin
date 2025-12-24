<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
    <meta charset="UTF-8">
    <title>Project Zero - 今日幸運指數</title>
    <style>
        /* 基礎樣式 */
        body { background: #000; color: #ccc; font-family: monospace; margin: 0; overflow-x: hidden; }
        .layout { display: flex; min-height: 100vh; }
        
        /* 側邊欄 */
        .sidebar { width: 150px; border-right: 1px solid #333; padding: 20px; background: #0a0a0a; }
        .sidebar a { display: block; color: #666; text-decoration: none; margin-bottom: 15px; font-size: 14px; }
        .sidebar a:hover { color: #fff; }

        /* 主要內容 */
        .content { flex: 1; padding: 40px; position: relative; z-index: 10; }
        #luck { font-size: 40px; color: #fff; text-shadow: 0 0 10px #fff; }
        
        /* 流星 */
        #sky { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
        .meteor {
            position: absolute; width: 2px; height: 2px; background: #fff;
            box-shadow: 0 0 10px #fff, 0 0 20px #fff;
        }

        /* 終端機 */
        #terminal { background: rgba(0,0,0,0.8); border: 1px solid #333; padding: 10px; 
                    height: 150px; overflow-y: auto; margin-top: 50px; font-size: 12px; color: #0f0; }
        #cmd { background: transparent; border: none; color: #0f0; width: 80%; outline: none; font-family: monospace; }

        /* 小狗 */
        #pixelDog { cursor: pointer; position: relative; width: 50px; margin-top: 30px; }
        #dogTail { 
            width: 10px; height: 4px; background: #666; position: absolute; 
            bottom: 5px; right: -5px; transform-origin: left center;
            transition: transform 0.3s; transform: rotate(-6deg);
        }
    </style>
</head>
<body>

<div id="sky"></div>

<div class="layout">
    <div class="sidebar">
        <a href="#">自介</a>
        <a href="#">日記</a>
        <a href="#">部落格</a>
        <a href="#">幸運指數</a>

        <div id="pixelDog">
            🐕 <div id="dogTail"></div>
            <p style="font-size:10px">點我搖尾巴</p>
        </div>
    </div>

    <div class="content">
        <h2>今日幸運指數：</h2>
        <p id="luck">載入中...</p>
        <button id="refreshLuck" style="background:#222; color:#eee; border:1px solid #444; cursor:pointer;">刷新預言</button>

        <div id="terminal"></div>
        <span>> </span><input type="text" id="cmd" placeholder="輸入指令 (help)...">
    </div>
</div>

<script>
(function(){
  // --- 幸運計算 ---
  function calcLuck(dateStr){
    const s = dateStr || new Date().toDateString();
    let n = 0;
    for(let i=0; i<s.length; i++) n += s.charCodeAt(i);
    // 加入一點隨機感但保持當天固定
    return (n * 13) % 101;
  }

  function luckPhrase(score){
    if(score>80) return "預言：今日宇宙偏向於你。";
    if(score>60) return "預言：可嘗試，亦不保證。";
    if(score>40) return "預言：平凡之日。";
    if(score>20) return "預言：小心選擇你的疲憊。";
    return "預言：今日宜靜。";
  }

  function renderLuck(){
    const el = document.getElementById('luck');
    if(!el) return;
    const score = calcLuck();
    el.textContent = score + " — " + luckPhrase(score);
  }

  const refreshBtn = document.getElementById('refreshLuck');
  if(refreshBtn) refreshBtn.addEventListener('click', renderLuck);

  // --- 小狗搖尾巴 ---
  const tail = document.getElementById('dogTail');
  const dog = document.getElementById('pixelDog');
  let wagTimeout;
  if(dog && tail) {
    dog.addEventListener('click',()=>{
      tail.style.transform = 'rotate(45deg)';
      clearTimeout(wagTimeout);
      wagTimeout = setTimeout(()=>{ tail.style.transform = 'rotate(-6deg)'; }, 300);
    });
  }

  // --- 終端機 ---
  const term = document.getElementById('terminal');
  const input = document.getElementById('cmd');
  if(term && input) {
    const cmds = {
      help: "可用指令：help, about, luck, clear",
      about: "Project Zero — 偽素派個人站。",
      luck: ()=> document.getElementById('luck').textContent,
      clear: "__clear__"
    };
    function termPrint(text){
      const p = document.createElement('div');
      p.textContent = text;
      term.appendChild(p);
      term.scrollTop = term.scrollHeight;
    }
    termPrint("Welcome to Project Zero terminal.");
    input.addEventListener('keydown', (e) => {
      if(e.key==='Enter'){
        const v = input.value.trim();
        if(!v) return;
        termPrint("> " + v);
        const out = cmds[v.toLowerCase()];
        if(!out) termPrint("未知指令: " + v);
        else if(out === "__clear__") term.innerHTML = '';
        else if(typeof out === 'function') termPrint(out());
        else termPrint(out);
        input.value = '';
      }
    });
  }

  // --- 流星產生器 ---
  const sky = document.getElementById('sky');
  if(sky) {
    function spawnMeteor(){
      const m = document.createElement('div');
      m.className='meteor';
      m.style.left = (Math.random()*80 + 10) + '%';
      m.style.top = (Math.random()*30) + '%';
      sky.appendChild(m);
      m.style.transition = 'transform 1s linear, opacity 1s linear';
      requestAnimationFrame(()=> {
        m.style.transform = 'translateX(150px) translateY(100px) rotate(-30deg)';
        m.style.opacity = '0';
      });
      setTimeout(()=> m.remove(), 1000);
    }
    setInterval(spawnMeteor, 4000);
  }

  renderLuck();
})();
</script>
</body>
</html>
