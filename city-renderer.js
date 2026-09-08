(()=>{
  const c=document.createElement('canvas');c.id='cityScene';document.getElementById('app').prepend(c);const ctx=c.getContext('2d');
  let W=0,H=0,dpr=1;
  const districts=[
    ['GENESIS',1,1,10,7,'#62e8ff'],['BASE AVENUE',11,1,10,7,'#7cf7c3'],['MEMPOOL',21,1,10,7,'#ffd166'],
    ['VAULT',1,8,10,7,'#b16cff'],['DARK ALLEY',11,8,10,7,'#ff6b9d'],['VALIDATOR',21,8,10,7,'#8fb8ff'],
    ['AGENT ARCOLOGY',1,15,15,8,'#5ee7ff'],['CHAIN COMMONS',16,15,15,8,'#9df58c']
  ];
  function resize(){dpr=devicePixelRatio||1;W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;c.style.width=W+'px';c.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
  addEventListener('resize',resize);resize();
  function project(x,y,z=0){const s=Math.min(W/30,H/22);return {x:W/2+(x-y)*s*.72,y:H*.53+(x+y)*s*.36-z*s*.9}}
  function poly(points,fill,stroke){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.stroke()}}
  function building(x,y,w,h,tone){const base=project(x,y),r=project(x+w,y),f=project(x+w,y+h),l=project(x,y+h);const z=2.5+((x*7+y*3)%5);const top=[project(x,y,z),project(x+w,y,z),project(x+w,y+h,z),project(x,y+h,z)];poly(top,'rgba(12,25,35,.96)','rgba(120,220,240,.16)');poly([l,f,project(x,y+h,z),project(x,y,z)],'rgba(7,15,23,.96)','rgba(120,220,240,.12)');poly([base,r,project(x+w,y,z),project(x,y,z)],'rgba(9,20,29,.98)','rgba(120,220,240,.12)');
    ctx.strokeStyle=tone;ctx.globalAlpha=.32;ctx.lineWidth=1;for(let i=1;i<5;i++){const yy=i/5;const a={x:base.x+(l.x-base.x)*yy,y:base.y+(l.y-base.y)*yy-z*s*.9*yy};const b={x:r.x+(f.x-r.x)*yy,y:r.y+(f.y-r.y)*yy-z*s*.9*yy};ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}ctx.globalAlpha=1;
    ctx.fillStyle=tone;ctx.globalAlpha=.6;ctx.fillRect((base.x+r.x)/2-2,(base.y+r.y)/2-z*s*.38,4,7);ctx.globalAlpha=1;
  }
  function draw(){const s=window.Blocktrace?.getState?.(),m=window.Blocktrace?.map;if(!m){requestAnimationFrame(draw);return}
    ctx.clearRect(0,0,W,H);const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#02040a');bg.addColorStop(.55,'#07131d');bg.addColorStop(1,'#020509');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    // moon / skyline
    ctx.fillStyle='rgba(98,232,255,.08)';ctx.beginPath();ctx.arc(W*.78,H*.2,Math.min(W,H)*.09,0,Math.PI*2);ctx.fill();
    districts.forEach(([name,x,y,w,h,tone])=>{const a=project(x,y,.03),b=project(x+w,y,.03),d=project(x+w,y+h,.03),e=project(x,y+h,.03);poly([a,b,d,e], 'rgba(7,18,27,.32)', tone+'35');const mid=project(x+w*.5,y+h*.15,.05);ctx.fillStyle=tone;ctx.globalAlpha=.42;ctx.font='700 9px monospace';ctx.fillText(name,mid.x-ctx.measureText(name).width/2,mid.y);ctx.globalAlpha=1});
    // streets and grid
    ctx.lineWidth=2;for(let y=0;y<=24;y++){if(y!==7&&y!==14)continue;for(let x=0;x<32;x+=2){const a=project(x,y+.45,.01),b=project(Math.min(32,x+1.2),y+.45,.01);ctx.strokeStyle='rgba(98,232,255,.18)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}for(let x of [10,21])for(let y=0;y<23;y+=2){const a=project(x+.45,y,.01),b=project(x+.45,Math.min(24,y+1.2),.01);ctx.strokeStyle='rgba(98,232,255,.18)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
    // city blocks
    for(let y=1;y<23;y++)for(let x=1;x<31;x++)if(m[y][x]==='1' && m[y-1]?.[x]!=='1' && m[y][x-1]!=='1'){
      let w=1,h=1;while(x+w<31&&m[y][x+w]==='1'&&m[y-1]?.[x+w]!=='1')w++;while(y+h<23&&m[y+h][x]==='1'&&m[y+h][x-1]!=='1')h++;if(w>=1&&h>=1)building(x,y,w*.82,h*.82,window.BlocktraceCity?.getDistrict(x,y)?.tone||'#62e8ff')}
    // objectives / NPCs
    const targets=window.Blocktrace.getTargets?.()||[];targets.forEach(o=>{if(o.taken)return;const p=project(o.x,o.y,1.1);const pulse=5+Math.sin(performance.now()/180)*2;ctx.fillStyle=s?.role==='defender'?'#ff6b9d':'#62e8ff';ctx.shadowBlur=18;ctx.shadowColor=ctx.fillStyle;ctx.beginPath();ctx.arc(p.x,p.y,pulse,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0});
    (window.BlocktraceCity?.npcs||[]).forEach(n=>{const p=project(n.renderX??n.x,n.renderY??n.y,1);ctx.fillStyle='#7cf7c3';ctx.shadowBlur=12;ctx.shadowColor='#7cf7c3';ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0});
    if(s){const p=project(s.position.x,s.position.y,1.4);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(-s.angle+Math.PI/4);poly([{x:0,y:-10},{x:7,y:7},{x:0,y:3},{x:-7,y:7}], '#fff','rgba(98,232,255,.8)');ctx.restore();ctx.fillStyle='#fff';ctx.font='700 9px monospace';ctx.fillText('YOU',p.x+9,p.y-7)}
    // cinematic frame
    ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(0,0,W,H*.1);ctx.fillRect(0,H*.92,W,H*.08);ctx.fillStyle='rgba(98,232,255,.32)';ctx.font='10px monospace';ctx.fillText('BLOCKTRACE CITY // LIVE WORLD',18,H-22);requestAnimationFrame(draw)
  }draw();
})();
