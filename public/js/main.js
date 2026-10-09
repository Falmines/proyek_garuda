document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));

const lightbox=document.querySelector('.image-lightbox');
if(lightbox){
 const image=lightbox.querySelector('.lightbox-image');
 const title=lightbox.querySelector('#lightbox-title');
 const level=lightbox.querySelector('.lightbox-zoom-level');
 const triggers=[...document.querySelectorAll('.lightbox-trigger')];
 let zoom=1;
 let lastTrigger=null;
 const updateZoom=()=>{
  image.style.setProperty('--zoom',zoom);
  level.textContent=`${Math.round(zoom*100)}%`;
  lightbox.querySelector('[data-zoom="out"]').disabled=zoom<=1;
  lightbox.querySelector('[data-zoom="in"]').disabled=zoom>=3;
 };
 const closeLightbox=()=>{
  if(lightbox.open) lightbox.close();
  image.removeAttribute('src');
 };
 triggers.forEach(trigger=>trigger.addEventListener('click',()=>{
  lastTrigger=trigger;
  zoom=1;
  image.src=trigger.dataset.lightboxSrc;
  image.alt=trigger.dataset.lightboxTitle;
  title.textContent=trigger.dataset.lightboxTitle;
  updateZoom();
  lightbox.showModal();
  lightbox.querySelector('[data-lightbox-close]').focus();
 }));
 lightbox.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
  const action=button.dataset.zoom;
  zoom=action==='reset'?1:Math.min(3,Math.max(1,zoom+(action==='in'?.5:-.5)));
  updateZoom();
 }));
 lightbox.querySelector('[data-lightbox-close]').addEventListener('click',closeLightbox);
 lightbox.addEventListener('click',event=>{
  if(event.target===lightbox) closeLightbox();
 });
 lightbox.addEventListener('close',()=>{
  image.removeAttribute('src');
  if(lastTrigger) lastTrigger.focus();
 });
 lightbox.addEventListener('cancel',event=>{
  event.preventDefault();
  closeLightbox();
 });
 lightbox.addEventListener('keydown',event=>{
  if(event.key==='+'||event.key==='='){
   event.preventDefault();
   zoom=Math.min(3,zoom+.5);
   updateZoom();
  }else if(event.key==='-'){
   event.preventDefault();
   zoom=Math.max(1,zoom-.5);
   updateZoom();
  }else if(event.key==='0'){
   event.preventDefault();
   zoom=1;
   updateZoom();
  }else if(event.key==='Escape'){
   event.preventDefault();
   closeLightbox();
  }
 });
}
