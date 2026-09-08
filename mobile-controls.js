(()=>{
  const fire=(key,type)=>window.dispatchEvent(new KeyboardEvent(type,{key,bubbles:true,cancelable:true}));
  const bind=(el,key)=>{
    const down=e=>{e.preventDefault();fire(key,'keydown')};
    const up=e=>{e.preventDefault();fire(key,'keyup')};
    el.addEventListener('touchstart',down,{passive:false});
    el.addEventListener('touchend',up,{passive:false});
    el.addEventListener('touchcancel',up,{passive:false});
    el.addEventListener('mousedown',down);el.addEventListener('mouseup',up);el.addEventListener('mouseleave',up);
  };
  document.querySelectorAll('[data-key]').forEach(el=>bind(el,el.dataset.key));
  const interact=document.getElementById('mobileInteract');
  interact?.addEventListener('touchstart',e=>{e.preventDefault();fire('e','keydown');fire('e','keyup')},{passive:false});
  interact?.addEventListener('click',()=>{fire('e','keydown');fire('e','keyup')});
})();
