const menu=document.querySelector('.menu');
const nav=document.querySelector('.header nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.header nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const tabs=document.querySelectorAll('.tab');
const specs=document.querySelectorAll('.spec');
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  specs.forEach(x=>x.classList.remove('active'));
  tab.classList.add('active');
  document.getElementById(tab.dataset.target).classList.add('active');
}));

document.getElementById('pilotForm')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  document.getElementById('formStatus').textContent='Enquiry captured locally. Connect this form to your official registration service before publishing.';
});

const io=new IntersectionObserver(entries=>{
 entries.forEach(x=>{
  if(x.isIntersecting){x.target.classList.add('visible');io.unobserve(x.target)}
 })
},{threshold:.08});
document.querySelectorAll('.event-card,.time-item,.spec,.register-grid,.faq-list').forEach(x=>io.observe(x));

document.getElementById('pilotForm')?.addEventListener('submit',e=>{
 e.preventDefault();
 document.getElementById('formStatus').textContent='Demo enquiry submitted locally. Connect this form to the official registration backend before launch.';
});

const targetDate=new Date('2026-11-10T23:59:59+05:30').getTime();
function tick(){const d=Math.max(0,targetDate-Date.now());const s=Math.floor(d/1000);const vals=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];['cdDays','cdHours','cdMinutes','cdSeconds'].forEach((id,i)=>document.getElementById(id).textContent=String(vals[i]).padStart(2,'0'));}
tick();setInterval(tick,1000);
