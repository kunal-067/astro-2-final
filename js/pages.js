/* ============================================================
   ACHARYA GURU JI — pages.js  (shared inner-page script)
   ============================================================ */
'use strict';

/* ══ STAR CANVAS ══ */
(function(){
  const canvas = document.getElementById('pageCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars=[], W, H, frame=0;

  function resize(){
    W = canvas.width  = canvas.parentElement.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    stars=[];
    const n = Math.floor((W*H)/2600);
    for(let i=0;i<n;i++) stars.push({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*1.7+.15,
      a:Math.random()*.75+.1,
      s:Math.random()*.5+.04,
      p:Math.random()*Math.PI*2,
      gold:Math.random()<.07,
      dx:(Math.random()-.5)*.07
    });
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    frame+=.016;
    stars.forEach(s=>{
      const tw = Math.max(0,Math.min(1, s.a+Math.sin(frame*s.s+s.p)*.27));
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle = s.gold ? `rgba(200,168,75,${tw})` : `rgba(255,255,255,${tw*.85})`;
      ctx.fill();
      s.x+=s.dx;
      if(s.x<-5) s.x=W+5;
      if(s.x>W+5) s.x=-5;
    });
    requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener('resize',()=>setTimeout(resize,200));
})();

/* ══ STAGGER CARDS ══ */
(function(){
  [
    {p:'.causes-grid',  c:'.cause-card'},
    {p:'.why-guru-grid',c:'.wg-card'},
    {p:'.stories-grid', c:'.story-card'},
    {p:'.signs-grid',   c:'.sign-item'},
    {p:'.solution-steps',c:'.sol-step'},
  ].forEach(({p,c})=>{
    const parent = document.querySelector(p);
    if(!parent) return;
    const kids = parent.querySelectorAll(c);
    kids.forEach((el,i)=>{
      el.style.opacity='0';
      el.style.transform='translateY(30px)';
      el.style.transition=`opacity .55s ease ${i*.1}s, transform .55s ease ${i*.1}s`;
    });
    const obs = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        kids.forEach(el=>{ el.style.opacity='1'; el.style.transform='translateY(0)'; });
        obs.disconnect();
      }
    },{threshold:.08});
    obs.observe(parent);
  });
})();

/* ══ COUNTER ══ */
(function(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const obs = new IntersectionObserver(entries=>{
      if(!entries[0].isIntersecting) return;
      const t=parseInt(el.dataset.count); const d=1600; const s=performance.now();
      (function tick(n){
        const p=Math.min((n-s)/d,1), e=1-Math.pow(1-p,3);
        el.textContent=Math.floor(e*t).toLocaleString();
        if(p<1) requestAnimationFrame(tick); else el.textContent=t.toLocaleString();
      })(s);
      obs.disconnect();
    },{threshold:.5});
    obs.observe(el);
  });
})();

document.addEventListener('DOMContentLoaded',()=>{
  const m=document.getElementById('modalBg');
  if(m) m.addEventListener('click',e=>{ if(e.target===m) closeModal(); });
});
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });