(() => {
  const districts = [
    { id:'genesis', name:'GENESIS SQUARE', x:1, y:1, w:10, h:7, tone:'#62e8ff' },
    { id:'base', name:'BASE AVENUE', x:11, y:1, w:10, h:7, tone:'#7cf7c3' },
    { id:'mempool', name:'MEMPOOL MARKET', x:21, y:1, w:10, h:7, tone:'#ffd166' },
    { id:'vault', name:'VAULT DISTRICT', x:1, y:8, w:10, h:7, tone:'#b16cff' },
    { id:'dark', name:'DARK ALLEY', x:11, y:8, w:10, h:7, tone:'#ff6b9d' },
    { id:'validator', name:'VALIDATOR HEIGHTS', x:21, y:8, w:10, h:7, tone:'#8fb8ff' },
    { id:'arcology', name:'AGENT ARCOLOGY', x:1, y:15, w:15, h:8, tone:'#5ee7ff' },
    { id:'commons', name:'CHAIN COMMONS', x:16, y:15, w:15, h:8, tone:'#9df58c' }
  ];
  const npcs = [
    {name:'NODE-07',role:'Broker',x:4.5,y:4.5,drift:.35},
    {name:'MIRA',role:'Scout',x:14.5,y:4.2,drift:.28},
    {name:'VAULT-KEEPER',role:'Defender',x:5.5,y:11.5,drift:.18},
    {name:'GHOST',role:'Rival',x:16.2,y:11.2,drift:.42},
    {name:'VALIDATOR-3',role:'Validator',x:25.5,y:11.5,drift:.22},
    {name:'ORACLE',role:'Agent',x:9.5,y:19.5,drift:.15},
    {name:'COURIER',role:'Courier',x:23.5,y:19.2,drift:.5}
  ];
  const roles = {
    hacker:{name:'HACKER',tag:'SCOUT / EXTRACT / ESCAPE',color:'#ff6b9d',mission:'Extract 3 encrypted data shards',hint:'Scout the districts, recover shards, then reach the Dark Alley extraction node.'},
    defender:{name:'DEFENDER',tag:'SCAN / PROTECT / RECOVER',color:'#7cf7c3',mission:'Secure 3 compromised nodes',hint:'Scan the city beacons, stabilize incidents, then return to the Vault Command node.'}
  };
  window.BlocktraceCity = {districts,npcs,roles,getDistrict(x,y){return districts.find(d=>x>=d.x&&x<d.x+d.w&&y>=d.y&&y<d.y+d.h)||districts[districts.length-1]},tick(t){npcs.forEach((n,i)=>{n.phase=(n.phase||i)*1; n.renderX=n.x+Math.sin(t*.0005*n.drift+i)*.22; n.renderY=n.y+Math.cos(t*.0004*n.drift+i)*.16})}};
})();
