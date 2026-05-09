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

/* ══ STICKY HEADER ══ */
// (function(){
//   const h = document.getElementById('siteHeader');
//   if(!h) return;
//   const upd = ()=> h.classList.toggle('scrolled', window.scrollY>50);
//   window.addEventListener('scroll', upd, {passive:true}); upd();
// })();

/* ══ HAMBURGER ══ */
(function(){
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if(!btn||!nav) return;
  btn.addEventListener('click',()=>{
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open')?'hidden':'';
  });
  document.addEventListener('click',e=>{
    if(nav.classList.contains('open')&&!nav.contains(e.target)&&!btn.contains(e.target)) closeMobileNav();
  });
})();
function closeMobileNav(){
  const nav=document.getElementById('mobileNav');
  const btn=document.getElementById('hamburger');
  if(nav) nav.classList.remove('open');
  if(btn) btn.classList.remove('active');
  document.body.style.overflow='';
}

/* ══ SCROLL REVEAL ══ */
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  },{threshold:.08, rootMargin:'0px 0px -55px 0px'});
  els.forEach(el=>obs.observe(el));
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

/* ══ FAQ ══ */
function toggleFaq(btn){
  const item=btn.closest('.faq-item');
  const open=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!open) item.classList.add('open');
}

/* ══ FORM SUBMIT ══ */
function handleSubmit(e){
  e.preventDefault();
  const m=document.getElementById('modalBg');
  if(m) m.classList.add('open');
  e.target.reset();
}
function closeModal(){
  const m=document.getElementById('modalBg');
  if(m) m.classList.remove('open');
}
document.addEventListener('DOMContentLoaded',()=>{
  const m=document.getElementById('modalBg');
  if(m) m.addEventListener('click',e=>{ if(e.target===m) closeModal(); });
});
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

/* ══ FLOATING WA ══ */
(function(){
  const btn=document.getElementById('floatWa');
  if(!btn) return;
  const upd=()=>btn.classList.toggle('show', window.scrollY>350);
  window.addEventListener('scroll',upd,{passive:true}); upd();
})();

/* ══ SMOOTH SCROLL ══ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const id=this.getAttribute('href');
    if(id==='#') return;
    const t=document.querySelector(id);
    if(!t) return;
    e.preventDefault();
    const hh=document.getElementById('siteHeader')?.offsetHeight||80;
    window.scrollTo({top: t.getBoundingClientRect().top+window.scrollY-hh-10, behavior:'smooth'});
  });
});

/* ══ SCROLL PROGRESS BAR ══ */
(function(){
  const bar=document.createElement('div');
  Object.assign(bar.style,{
    position:'fixed',top:'0',left:'0',height:'3px',width:'0%',
    background:'linear-gradient(90deg,#7a6532,#c8a84b,#e8c96a)',
    zIndex:'99999',transition:'width .1s linear',pointerEvents:'none'
  });
  document.body.appendChild(bar);
  window.addEventListener('scroll',()=>{
    const sc=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.width=(sc>0?(window.scrollY/sc)*100:0)+'%';
  },{passive:true});
})();

/* ══ TICKER PAUSE ══ */
(function(){
  const t=document.querySelector('.ticker-track');
  if(!t) return;
  t.addEventListener('mouseenter',()=>t.style.animationPlayState='paused');
  t.addEventListener('mouseleave',()=>t.style.animationPlayState='running');
})();

/* ══ CURSOR ══ */
(function(){
  if(window.innerWidth<768) return;
  const dot=document.getElementById('cursorDot');
  const ring=document.getElementById('cursorRing');
  if(!dot||!ring) return;
  let mx=-100,my=-100,rx=-100,ry=-100;
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
  (function loop(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ ring.style.width='50px'; ring.style.height='50px'; ring.style.borderColor='rgba(200,168,75,.9)'; });
    el.addEventListener('mouseleave',()=>{ ring.style.width='32px'; ring.style.height='32px'; ring.style.borderColor='rgba(200,168,75,.6)'; });
  });
})();
