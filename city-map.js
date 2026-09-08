(()=>{
  const c=document.createElement('canvas');c.id='cityMap';document.getElementById('app').prepend(c);const x=c.getContext('2d');
  const names=[['GENESIS',1,1,10,7],['BASE AVENUE',11,1,10,7],['MEMPOOL',21,1,10,7],['VAULT',1,8,10,7],['DARK ALLEY',11,8,10,7],['VALIDATOR',21,8,10,7],['AGENT ARCOLOGY',1,15,15,8],['CHAIN COMMONS',16,15,15,8]];
  function size(){const d=devicePixelRatio||1;c.width=innerWidth*d;c.height=innerHeight*d;x.setTransform(d,0,0,d,0,0)}addEventListener('resize',size);size();
  function draw(){const s=window.Blocktrace?.getState?.(),m=window.Blocktrace?.map;if(!m){requestAnimationFrame(draw);return}const W=innerWidth,H=innerHeight; x.clearRect(0,0,W,H);x.fillStyle='#05080d';x.fillRect(0,0,W,H);
    const pad=Math.max(12,Math.min(34,W*.035)), top=H*.16, bottom=H*.12, cw=(W-pad*2)/32, ch=(H-top-bottom)/24, cell=Math.min(cw,ch), ox=(W-32*cell)/2, oy=top;
    x.fillStyle='rgba(8,15,24,.96)';x.fillRect(ox-8,oy-8,32*cell+16,24*cell+16);
    x.strokeStyle='rgba(98,232,255,.12)';x.lineWidth=1;
    for(let y=0;y<24;y++)for(let xx=0;xx<32;xx++){const px=ox+xx*cell,py=oy+y*cell;if(m[y][xx]==='1'){x.fillStyle='#17232d';x.fillRect(px,py,cell+.5,cell+.5);x.strokeRect(px,py,cell,cell)}else{x.fillStyle=(y%2===0?'#081018':'#09131b');x.fillRect(px,py,cell+.5,cell+.5)}}
    names.forEach(([n,xx,yy,w,h],i)=>{x.fillStyle=i===4?'rgba(255,107,157,.07)':'rgba(98,232,255,.035)';x.fillRect(ox+xx*cell,oy+yy*cell,w*cell,h*cell);x.fillStyle='rgba(180,225,240,.42)';x.font=`${Math.max(8,cell*.55)}px monospace`;x.fillText(n,ox+(xx+.25)*cell,oy+(yy+1)*cell)});
    const targets=window.Blocktrace.getTargets?.()||[];targets.forEach(o=>{if(o.taken)return;const px=ox+o.x*cell,py=oy+o.y*cell;const col=s?.role==='defender'?'#ff6b9d':'#62e8ff';x.shadowBlur=18;x.shadowColor=col;x.fillStyle=col;x.beginPath();x.arc(px,py,Math.max(4,cell*.28),0,Math.PI*2);x.fill();x.shadowBlur=0;x.strokeStyle=col;x.beginPath();x.arc(px,py,Math.max(7,cell*.5),0,Math.PI*2);x.stroke()});
    const beacon=window.__btBeacon||{x:8.8,y:18.2},terminal=s?.role==='defender'?{x:6.5,y:11.5}:{x:16.5,y:11.8};
    [[beacon.x,beacon.y,'#b16cff'],[terminal.x,terminal.y,'#ffd166']].forEach(([xx,yy,col])=>{x.fillStyle=col;x.shadowBlur=12;x.shadowColor=col;x.fillRect(ox+xx*cell-cell*.25,oy+yy*cell-cell*.25,cell*.5,cell*.5);x.shadowBlur=0});
    (window.BlocktraceCity?.npcs||[]).forEach(n=>{const px=ox+(n.renderX??n.x)*cell,py=oy+(n.renderY??n.y)*cell;x.fillStyle='#7cf7c3';x.beginPath();x.arc(px,py,Math.max(2.5,cell*.2),0,Math.PI*2);x.fill()});
    if(s){const px=ox+s.position.x*cell,py=oy+s.position.y*cell;x.save();x.translate(px,py);x.rotate(s.angle);x.fillStyle='#fff';x.shadowBlur=16;x.shadowColor='#fff';x.beginPath();x.moveTo(cell*.55,0);x.lineTo(-cell*.35,-cell*.3);x.lineTo(-cell*.18,0);x.lineTo(-cell*.35,cell*.3);x.closePath();x.fill();x.restore();}
    x.fillStyle='rgba(5,8,13,.9)';x.fillRect(ox,oy+24*cell+10,32*cell,34);x.fillStyle='#62e8ff';x.font='bold 11px monospace';x.fillText('BLOCKTRACE CITY // LIVE MAP',ox+10,oy+24*cell+23);x.fillStyle='#9bb0bd';x.font='10px monospace';x.fillText('CYAN: OBJECTIVE  •  GREEN: AGENT/NPC  •  YELLOW: COMMAND  •  WHITE: YOU',ox+10,oy+24*cell+37);
    requestAnimationFrame(draw)}draw();
})();