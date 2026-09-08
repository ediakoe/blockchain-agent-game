(()=>{
  const keys=window.__blocktraceKeys||(window.__blocktraceKeys={});
  const activePointers=new Map();
  const set=(key,on)=>{keys[key]=on};
  const bind=(el,key)=>{
    const down=e=>{e.preventDefault();activePointers.set(e.pointerId,key);set(key,true);el.setPointerCapture?.(e.pointerId)};
    const up=e=>{e.preventDefault();if(activePointers.get(e.pointerId)===key){activePointers.delete(e.pointerId);set(key,false)}};
    el.addEventListener('pointerdown',down,{passive:false});
    el.addEventListener('pointerup',up,{passive:false});
    el.addEventListener('pointercancel',up,{passive:false});
    el.addEventListener('lostpointercapture',up,{passive:false});
  };
  document.querySelectorAll('[data-key]').forEach(el=>bind(el,el.dataset.key));
  const interact=document.getElementById('mobileInteract');
  interact?.addEventListener('pointerdown',e=>{e.preventDefault();window.Blocktrace?.interact?.()},{passive:false});
  let lookX=0,lookId=null;
  document.addEventListener('pointerdown',e=>{
    if(!window.Blocktrace?.isMobile?.()||e.target.closest('#mobileControls'))return;
    lookId=e.pointerId;lookX=e.clientX;
  },{passive:true});
  document.addEventListener('pointermove',e=>{
    if(e.pointerId!==lookId||!window.Blocktrace?.isMobile?.())return;
    const dx=e.clientX-lookX;lookX=e.clientX;window.Blocktrace.look?.(dx);
  },{passive:true});
  const endLook=e=>{if(e.pointerId===lookId)lookId=null};
  document.addEventListener('pointerup',endLook,{passive:true});
  document.addEventListener('pointercancel',endLook,{passive:true});
})();
