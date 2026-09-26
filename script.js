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

document.getElementById('pilotForm')?.addEventListener('submit',e=>{
 e.preventDefault();
 document.getElementById('formStatus').textContent='Enquiry captured. Please use the official registration form above to complete registration.';
});

const targetDate=new Date('2026-11-10T23:59:59+05:30').getTime();
function tick(){const d=Math.max(0,targetDate-Date.now());const s=Math.floor(d/1000);const vals=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];['cdDays','cdHours','cdMinutes','cdSeconds'].forEach((id,i)=>document.getElementById(id).textContent=String(vals[i]).padStart(2,'0'));}
tick();setInterval(tick,1000);
