(() => {
  'use strict';
  const SIZE = 20, TILE = 24, KEY = 'lucas-snake-best-v1';
  const canvas = document.getElementById('board'), ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score'), bestEl = document.getElementById('best'), statusEl = document.getElementById('status'), startEl = document.getElementById('start');
  let snake, fruit, dir, nextDir, score, state = 'idle', timer;
  let best = 0;
  try { best = Math.max(0, Number(localStorage.getItem(KEY)) || 0); } catch {}
  bestEl.textContent = best;
  const same = (a, b) => a.x === b.x && a.y === b.y;
  function newFruit() {
    const free = [];
    for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
      const p = {x, y}; if (!snake.some(part => same(part, p))) free.push(p);
    }
    return free.length ? free[Math.floor(Math.random() * free.length)] : null;
  }
  function draw() {
    ctx.fillStyle = '#dce9de'; ctx.fillRect(0, 0, 480, 480);
    ctx.strokeStyle = '#ccded0'; ctx.lineWidth = 1;
    for (let i = 1; i < SIZE; i++) { const v = i * TILE + .5; ctx.beginPath(); ctx.moveTo(v, 0); ctx.lineTo(v, 480); ctx.moveTo(0, v); ctx.lineTo(480, v); ctx.stroke(); }
    if (fruit) { ctx.fillStyle = '#d67951'; ctx.beginPath(); ctx.arc(fruit.x*TILE+12, fruit.y*TILE+12, 8, 0, 2*Math.PI); ctx.fill(); }
    snake.forEach((p, i) => { ctx.fillStyle = i ? '#4e9a79' : '#185b4d'; ctx.beginPath(); ctx.roundRect(p.x*TILE+2, p.y*TILE+2, 20, 20, 5); ctx.fill(); });
  }
  function update() {
    scoreEl.textContent = score; bestEl.textContent = best;
    statusEl.textContent = {idle:'Tocá Jugar para empezar.',playing:'Flechas, WASD o deslizá el tablero.',paused:'En pausa. Tocá Reanudar o espacio.',over:'Terminó la partida. ¿Otra?',won:'¡Llenaste el tablero!'}[state];
    startEl.textContent = state === 'playing' ? 'Pausar' : state === 'paused' ? 'Reanudar' : 'Jugar';
    draw();
  }
  function stop(s) { clearTimeout(timer); timer = null; state = s; update(); }
  function step() {
    if (state !== 'playing') return;
    dir = nextDir;
    const head = {x:snake[0].x+dir.x, y:snake[0].y+dir.y};
    const eat = fruit && same(head, fruit);
    if (head.x < 0 || head.y < 0 || head.x >= SIZE || head.y >= SIZE || snake.slice(0, eat ? undefined : -1).some(p => same(p, head))) { stop('over'); return; }
    snake.unshift(head);
    if (eat) {
      score += 10;
      if (score > best) { best = score; try { localStorage.setItem(KEY, String(best)); } catch {} }
      fruit = newFruit(); if (!fruit) { stop('won'); return; }
    } else snake.pop();
    update(); timer = setTimeout(step, Math.max(75, 160 - score / 12));
  }
  function start() {
    clearTimeout(timer); snake = [{x:8,y:10},{x:7,y:10},{x:6,y:10}];
    dir = {x:1,y:0}; nextDir = dir; score = 0; fruit = newFruit(); state = 'playing'; update(); canvas.focus({preventScroll:true}); timer = setTimeout(step, 160);
  }
  function toggle() { if (state === 'playing') stop('paused'); else if (state === 'paused') { state='playing'; update(); timer=setTimeout(step,Math.max(75,160-score/12)); } else start(); }
  function turn(name) {
    const dirs={up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}}; const d=dirs[name];
    if (!d) return;
    if (state === 'idle' || state === 'over' || state === 'won') start();
    if (d.x === -dir.x && d.y === -dir.y) return;
    nextDir = d;
  }
  startEl.addEventListener('click', toggle);
  document.querySelectorAll('[data-dir]').forEach(button => button.addEventListener('click', () => turn(button.dataset.dir)));
  document.addEventListener('keydown', e => {
    const dirs={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
    if (e.code === 'Space' && !e.altKey && !e.ctrlKey && !e.metaKey) { e.preventDefault(); toggle(); }
    else if (dirs[e.key] && !e.altKey && !e.ctrlKey && !e.metaKey) { e.preventDefault(); turn(dirs[e.key]); }
  });
  let touch;
  canvas.addEventListener('touchstart', e => { const t=e.changedTouches[0]; touch=[t.clientX,t.clientY]; }, {passive:true});
  canvas.addEventListener('touchend', e => { if(!touch)return; const t=e.changedTouches[0], dx=t.clientX-touch[0],dy=t.clientY-touch[1]; touch=null; if(Math.max(Math.abs(dx),Math.abs(dy))<24)return; turn(Math.abs(dx)>Math.abs(dy) ? (dx>0?'right':'left') : (dy>0?'down':'up')); }, {passive:true});
  snake = [{x:8,y:10},{x:7,y:10},{x:6,y:10}]; dir={x:1,y:0}; nextDir=dir; score=0; fruit={x:14,y:10}; update();
})();
