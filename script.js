const menu=document.querySelector('.menu');
const nav=document.querySelector('.header nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.header nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const tabs=document.querySelectorAll('.tab');
const specs=document.querySelectorAll('.spec');
function activateSpec(targetId, shouldScroll=false){
  const target=document.getElementById(targetId);
  const tab=document.querySelector(`.tab[data-target="${targetId}"]`);
  if(!target || !tab) return;
  tabs.forEach(x=>x.classList.remove('active'));
  specs.forEach(x=>x.classList.remove('active'));
  tab.classList.add('active');
  target.classList.add('active');
  if(shouldScroll){
    document.getElementById('rules')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
}

tabs.forEach(tab=>tab.addEventListener('click',()=>activateSpec(tab.dataset.target)));

function activateFromHash(){
  const hash=window.location.hash.replace('#','');
  if(['whoop-spec','aero-spec','blind-spec','common-spec'].includes(hash)){
    activateSpec(hash,false);
    requestAnimationFrame(()=>document.getElementById('rules')?.scrollIntoView({behavior:'smooth',block:'start'}));
  }
}
window.addEventListener('hashchange',activateFromHash);
activateFromHash();

document.querySelectorAll('.event-spec-link').forEach(link=>link.addEventListener('click',e=>{
  e.preventDefault();
  activateSpec(link.dataset.specTarget, true);
}));


const io=new IntersectionObserver(entries=>{
 entries.forEach(x=>{
  if(x.isIntersecting){x.target.classList.add('visible');io.unobserve(x.target)}
 })
},{threshold:.08});
document.querySelectorAll('.event-card,.time-item,.spec,.register-grid,.faq-list').forEach(x=>io.observe(x));

const targetDate=new Date('2026-11-10T23:59:59+05:30').getTime();
function tick(){const d=Math.max(0,targetDate-Date.now());const s=Math.floor(d/1000);const vals=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];['cdDays','cdHours','cdMinutes','cdSeconds'].forEach((id,i)=>document.getElementById(id).textContent=String(vals[i]).padStart(2,'0'));}
tick();setInterval(tick,1000);


/* V13 — Slow auto-slide for event cards, pauses on hover/touch */
const eventSlider=document.querySelector('.event-slider');
if(eventSlider){
  let eventTimer=null;
  const startEventSlide=()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(eventSlider.scrollWidth<=eventSlider.clientWidth) return;
    clearInterval(eventTimer);
    eventTimer=setInterval(()=>{
      const max=eventSlider.scrollWidth-eventSlider.clientWidth;
      const next=eventSlider.scrollLeft+1.1;
      if(next>=max-2){eventSlider.scrollTo({left:0,behavior:'smooth'});}
      else eventSlider.scrollLeft=next;
    },45);
  };
  const pauseEventSlide=()=>clearInterval(eventTimer);
  eventSlider.addEventListener('mouseenter',pauseEventSlide);
  eventSlider.addEventListener('mouseleave',startEventSlide);
  eventSlider.addEventListener('touchstart',pauseEventSlide,{passive:true});
  eventSlider.addEventListener('touchend',()=>setTimeout(startEventSlide,1800),{passive:true});
  startEventSlide();
}

/* V14 — Gentle pointer-controlled cinematic parallax for desktop */
(() => {
  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  if(!hero || !art || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0;
  const move = (e) => {
    if(window.innerWidth < 901) return;
    const r = hero.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-.5)*18;
    const y = ((e.clientY-r.top)/r.height-.5)*12;
    cancelAnimationFrame(raf);
    raf=requestAnimationFrame(()=>{
      art.style.setProperty('--mx', `${x}px`);
      art.style.setProperty('--my', `${y}px`);
    });
  };
  hero.addEventListener('pointermove', move, {passive:true});
  hero.addEventListener('pointerleave', ()=>{
    art.style.setProperty('--mx','0px');
    art.style.setProperty('--my','0px');
  }, {passive:true});
})();


/* V15 — live telemetry shimmer so the hero visibly feels active */
(() => {
  const readout = document.querySelector('.hero-readout');
  if (!readout || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const values = readout.querySelectorAll('b');
  if (values.length < 2) return;
  let speed = 126;
  let altitude = 42;
  setInterval(() => {
    speed += Math.round((Math.random() - 0.5) * 10);
    altitude += Math.round((Math.random() - 0.5) * 4);
    speed = Math.max(108, Math.min(148, speed));
    altitude = Math.max(34, Math.min(58, altitude));
    values[0].textContent = String(altitude).padStart(3,'0');
    values[1].textContent = String(speed).padStart(3,'0');
  }, 850);
})();
