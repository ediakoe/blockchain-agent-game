(()=>{
  const keys=window.__blocktraceKeys||(window.__blocktraceKeys={});
  const set=(key,on)=>{keys[key]=on};
  const bind=(el,key)=>{
    const down=e=>{e.preventDefault();set(key,true);el.setPointerCapture?.(e.pointerId)};
    const up=e=>{e.preventDefault();set(key,false)};
    el.addEventListener('pointerdown',down);
    el.addEventListener('pointerup',up);
    el.addEventListener('pointercancel',up);
    el.addEventListener('pointerleave',up);
  };
  document.querySelectorAll('[data-key]').forEach(el=>bind(el,el.dataset.key));
  const interact=document.getElementById('mobileInteract');
  interact?.addEventListener('pointerdown',e=>{e.preventDefault();window.Blocktrace?.interact?.()});
  let lookX=0;
  let lookId=null;
  document.addEventListener('pointerdown',e=>{
    if(!window.Blocktrace?.isMobile?.())return;
    if(e.target.closest('#mobileControls'))return;
    lookId=e.pointerId;lookX=e.clientX;
  },{passive:true});
  document.addEventListener('pointermove',e=>{
    if(e.pointerId!==lookId||!window.Blocktrace?.isMobile?.())return;
    const dx=e.clientX-lookX;lookX=e.clientX;window.Blocktrace.look?.(dx);
  },{passive:true});
  document.addEventListener('pointerup',e=>{if(e.pointerId===lookId)lookId=null},{passive:true});
})();
