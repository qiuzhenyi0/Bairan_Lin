
// main front-end behaviors: luck calc, terminal, pixel dog tail wag, meteor spawner
(function(){
  // luck (cold oracle voice)
  function calcLuck(dateStr){
    const s = dateStr || new Date().toDateString();
    let n = 0;
    for(let i=0;i<s.length;i++) n += s.charCodeAt(i);
    return n % 101;
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
    const score = calcLuck();
    el.textContent = score + " — " + luckPhrase(score);
    el.title = "冷淡神諭者：「" + luckPhrase(score) + "」";
  }
  document.getElementById('refreshLuck').addEventListener('click',renderLuck);
  renderLuck();

  // pixel dog tail wag
  const tail = document.getElementById('dogTail');
  const dog = document.getElementById('pixelDog');
  let wagTimeout;
  dog.addEventListener('click',()=>{
    tail.style.transform = 'rotate(30deg)';
    clearTimeout(wagTimeout);
    wagTimeout = setTimeout(()=>{ tail.style.transform = 'rotate(-6deg)'; },300);
  });

  // terminal emulator (fake)
  const term = document.getElementById('terminal');
  const input = document.getElementById('cmd');
  const cmds = {
    help: "可用指令：help, about, luck, diary, clear",
    about: "Project Zero / 零計畫 — 偽素派個人站。持有者：小狗。",
    luck: ()=> document.getElementById('luck').textContent,
    diary: "最近日記：2025-12-04, 2025-12-03 ...",
    clear: "__clear__"
  };
  function termPrint(text){
    const p = document.createElement('div');
    p.textContent = text;
    term.appendChild(p);
    term.scrollTop = term.scrollHeight;
  }
  termPrint("Welcome to Project Zero terminal.");
  input.addEventListener('keydown',function(e){
    if(e.key==='Enter'){
      const v = input.value.trim();
      if(!v){ input.value=''; return; }
      termPrint("> " + v);
      const cmd = v.split(' ')[0];
      const out = cmds[cmd];
      if(!out) termPrint("未知指令: " + cmd + "（輸入 help）");
      else {
        if(out === "__clear__"){ term.innerHTML=''; }
        else if(typeof out === 'function'){ termPrint(out()); }
        else termPrint(out);
      }
      input.value='';
    }
  });

  // meteor spawner
  const sky = document.getElementById('sky');
  function spawnMeteor(){
    const m = document.createElement('div');
    m.className='meteor';
    const left = Math.random()*80 + 5;
    m.style.left = left + '%';
    m.style.top = Math.random()*20 + '%';
    sky.appendChild(m);
    // animate
    m.style.transition = 'transform 1200ms linear, opacity 1200ms linear';
    requestAnimationFrame(()=> {
      m.style.transform = 'translateX(200px) translateY(120px) rotate(-30deg)';
      m.style.opacity = '0';
    });
    setTimeout(()=> m.remove(),1400);
  }
  setInterval(spawnMeteor, 5000 + Math.random()*8000);
})();
