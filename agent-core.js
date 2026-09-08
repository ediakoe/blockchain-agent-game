(() => {
  const KEY = 'blocktrace-agent-memory-v1';
  const state = { startedAt: 0, lastX: 0, lastY: 0, lastT: 0, observations: 0, style: 'balanced', lastSignal: 0 };
  const memory = JSON.parse(localStorage.getItem(KEY) || '{"runs":0,"styles":{}}');

  const save = () => localStorage.setItem(KEY, JSON.stringify(memory));
  const api = () => window.Blocktrace;

  function classify(s) {
    const elapsed = Math.max(1, s.elapsed);
    const speed = s.distance / elapsed;
    if (s.shards >= 2 && elapsed < 45) return 'rusher';
    if (speed > 1.15 && s.shards < 2) return 'explorer';
    return 'balanced';
  }

  function adapt(s) {
    const a = api();
    if (!a || !s.started || s.complete) return;
    const next = classify(s);
    if (next !== state.style) {
      state.style = next;
      memory.styles[next] = (memory.styles[next] || 0) + 1;
      save();
      const messages = {
        explorer: 'AGENT ADAPT // exploratory behavior detected. Side routes are now prioritized.',
        rusher: 'AGENT ADAPT // high-velocity trace detected. Shortcut signal acquired.',
        balanced: 'AGENT ADAPT // behavior calibrated. Strongest protocol signal selected.'
      };
      a.log(messages[next], 'good');
    }

    const mission = {
      explorer: 'Investigate the network // recover protocol shards',
      rusher: 'Execute the shortest trace // recover protocol shards',
      balanced: 'Follow the Agent // recover protocol shards'
    }[state.style];
    const hint = {
      explorer: 'The Agent noticed your curiosity. Check unusual routes before the next beacon.',
      rusher: 'The Agent sees a fast trace. Keep moving and use beacons only when needed.',
      balanced: 'The Agent is learning your route. Follow the strongest signal.'
    }[state.style];
    if (s.shards < 3) { a.setMission(mission); a.setHint(hint); }
  }

  function pulse() {
    const a = api();
    if (!a) return;
    const s = a.getState();
    if (!s.started || s.complete) return;
    state.observations++;
    adapt(s);
    if (state.observations % 3 === 0 && s.shards < 3) {
      const signals = [
        'MEMPOOL FLUX // route prediction updated',
        'PROTOCOL NOISE // Agent filtering hostile packets',
        'NODE ECHO // alternate path mapped',
        'CHAIN PULSE // local state synchronized'
      ];
      const msg = signals[Math.floor(Math.random() * signals.length)];
      a.log(msg);
    }
  }

  function boot() {
    const a = api();
    if (!a) return setTimeout(boot, 50);
    a.on('start', () => {
      state.startedAt = performance.now();
      state.lastT = state.startedAt;
      memory.runs = (memory.runs || 0) + 1;
      save();
      a.log('AGENT CORE // behavioral model online', 'good');
      a.log(`AGENT MEMORY // ${memory.runs} trace(s) remembered`);
    });
    a.on('shardRecovered', d => a.log(`AGENT OBSERVE // shard ${d.count}/3. Updating route model.`));
    a.on('beaconSync', () => a.log('AGENT DECISION // beacon data accepted. Confidence increased.'));
    a.on('complete', d => a.log(`AGENT CORE // trace complete in ${Math.round(d.elapsed)}s. Session memory saved.`, 'good'));
    setInterval(pulse, 3000);
  }

  boot();
})();
