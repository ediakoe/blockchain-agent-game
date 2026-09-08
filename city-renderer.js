(()=>{
  const c=document.getElementById('cityScene')||(()=>{const x=document.createElement('canvas');x.id='cityScene';document.getElementById('app').prepend(x);return x})();
  const ctx=c.getContext('2d');let W=0,H=0,dpr=1,cam={x:0,y:0};
  const districts=[['GENESIS',1,1,10,7,'#62e8ff'],['BASE AVENUE',11,1,10,7,'#7cf7c3'],['MEMPOOL',21,1,10,7,'#ffd166'],['VAULT',1,8,10,7,'#b16cff'],['DARK ALLEY',11,8,10,7,'#ff6b9d'],['VALIDATOR',21,8,10,7,'#8fb8ff'],['AGENT ARCOLOGY',1,15,15,8,'#5ee7ff'],['CHAIN COMMONS',16,15,15,8,'#9df58c']];
  function resize(){dpr=devicePixelRatio||1;W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;c.style.width=W+'px';c.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}addEventListener('resize',resize);resize();
  function project(x,y,z=0){const s=Math.min(W/18,H/13);const dx=x-cam.x,dy=y-cam.y;return{x:W/2+(dx-dy)*s*.78,y:H*.54+(dx+dy)*s*.39-z*s*.9}}
  function poly(a,fill,stroke){ctx.beginPath();a.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.stroke()}}
  function tile(x,y,tone){const b=project(x,y),r=project(x+1,y),f=project(x+1,y+1),l=project(x,y+1),z=1.8+((x*7+y*11)%4)*.45;const bt=project(x,y,z),rt=project(x+1,y,z),ft=project(x+1,y+1,z),lt=project(x,y+1,z);poly([b,r,rt,bt],'rgba(9,20,29,.98)','rgba(120,220,240,.12)');poly([l,f,ft,lt],'rgba(6,14,22,.98)','rgba(120,220,240,.12)');poly([bt,rt,ft,lt],'rgba(14,30,40,.98)','rgba(120,220,240,.14)');ctx.fillStyle=tone;ctx.globalAlpha=.55;ctx.fillRect((bt.x+rt.x)/2-2,(bt.y+rt.y)/2-5,4,7);ctx.globalAlpha=1}
  function marker(o,col,label){const q=project(o.x,o.y,1.15),pulse=6+Math.sin(performance.now()/170)*2;ctx.fillStyle=col;ctx.shadowBlur=20;ctx.shadowColor=col;ctx.beginPath();ctx.arc(q.x,q.y,pulse,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.font='700 8px monospace';ctx.fillText(label,q.x+8,q.y-8)}
  function draw(){const s=window.Blocktrace?.getState?.(),m=window.Blocktrace?.map;if(!m){requestAnimationFrame(draw);return}cam.x=s?.position?.x??16;cam.y=s?.position?.y??12;
    ctx.clearRect(0,0,W,H);const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#02040a');bg.addColorStop(.58,'#07151f');bg.addColorStop(1,'#020509');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    // skyline
    ctx.fillStyle='rgba(98,232,255,.06)';ctx.beginPath();ctx.arc(W*.78,H*.18,Math.min(W,H)*.1,0,Math.PI*2);ctx.fill();
    // district ground plates
    districts.forEach(([name,x,y,w,h,tone])=>{const a=project(x,y,.01),b=project(x+w,y,.01),d=project(x+w,y+h,.01),e=project(x,y+h,.01);poly([a,b,d,e],'rgba(7,18,27,.42)',tone+'28');const q=project(x+w*.5,y+h*.12,.02);ctx.fillStyle=tone;ctx.globalAlpha=.42;ctx.font='700 8px monospace';ctx.fillText(name,q.x-ctx.measureText(name).width/2,q.y);ctx.globalAlpha=1});
    // roads follow the actual grid so movement and visuals agree
    ctx.lineWidth=1.5;for(let y=0;y<=24;y++)for(let x=0;x<32;x++){if(y<23&&m[y][x]==='0'){const a=project(x,y,.02),b=project(x+1,y,.02);ctx.strokeStyle='rgba(98,232,255,.055)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}for(let x=0;x<32;x++)for(let y=0;y<23;y++){if(m[y][x]==='0'){const a=project(x,y,.02),b=project(x,y+1,.02);ctx.strokeStyle='rgba(98,232,255,.055)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
    // buildings from the real collision map
    for(let y=Math.max(1,Math.floor(cam.y)-9);y<Math.min(23,Math.floor(cam.y)+10);y++)for(let x=Math.max(1,Math.floor(cam.x)-10);x<Math.min(31,Math.floor(cam.x)+11);x++)if(m[y][x]==='1')tile(x,y,window.BlocktraceCity?.getDistrict(x,y)?.tone||'#62e8ff');
    const targets=window.Blocktrace.getTargets?.()||[];targets.forEach(o=>{if(!o.taken)marker(o,s?.role==='defender'?'#ff6b9d':'#62e8ff',s?.role==='defender'?'NODE':'SHARD')});
    const beacon={x:8.8,y:18.2};marker(beacon,'#b16cff','AGENT');const terminal=s?.role==='hacker'?{x:16.5,y:11.8}:{x:6.5,y:11.5};marker(terminal,'#ffd166','GATE');
    (window.BlocktraceCity?.npcs||[]).forEach(n=>{const q=project(n.renderX??n.x,n.renderY??n.y,.9);ctx.fillStyle='#7cf7c3';ctx.shadowBlur=12;ctx.shadowColor='#7cf7c3';ctx.beginPath();ctx.arc(q.x,q.y,4.5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0});
    if(s){const q=project(s.position.x,s.position.y,1.8);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(-s.angle+Math.PI/4);poly([{x:0,y:-12},{x:8,y:8},{x:0,y:4},{x:-8,y:8}],'#fff','rgba(98,232,255,.9)');ctx.restore();ctx.fillStyle='#fff';ctx.font='700 9px monospace';ctx.fillText('YOU',q.x+10,q.y-9)}
    // compass + camera status
    ctx.fillStyle='rgba(98,232,255,.5)';ctx.font='10px monospace';ctx.fillText('BLOCKTRACE CITY // LIVE WORLD',18,H-22);ctx.fillText(`SECTOR ${Math.floor(cam.x)}:${Math.floor(cam.y)}`,W-110,H-22);
    requestAnimationFrame(draw)}draw();
})();
