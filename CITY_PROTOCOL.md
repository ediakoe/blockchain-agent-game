# Blocktrace City Protocol — V2

## Vision

Turn Blocktrace from a corridor-style prototype into a persistent cyberpunk blockchain city on Base.

The player enters a living on-chain city where every district has wallets, protocols, NPCs, contracts, security levels, and Agent-driven events.

The game uses **fictional gameplay mechanics** for hacking/defense. Real-world intrusion instructions, real wallet draining, and real-money theft are never part of gameplay.

## Roles

### Hacker
- Scout districts and identify vulnerable fictional nodes.
- Choose targets from a city map.
- Solve security mini-games to breach simulated systems.
- Extract **in-game credits / reputation**, not real user funds.
- Build a heat level as the city security system reacts.
- Escape before response agents arrive.

### Victim / Defender
- Protect a fictional wallet, protocol, or NPC business.
- Detect suspicious activity from alerts and transaction patterns.
- Deploy simulated firewall rules, decoys, and recovery actions.
- Hunt the hacker through the city.
- Earn reputation for successful defense.

## City districts

1. **Genesis Square** — safe spawn, tutorials, Agent hub.
2. **Base Avenue** — exchanges, builders, public protocols, social hub.
3. **Mempool Market** — noisy transaction district and dynamic events.
4. **Vault District** — high-value fictional targets and security systems.
5. **Dark Alley** — risky missions, hidden NPCs, black-market lore without real illicit transactions.
6. **Validator Heights** — end-game security district.

## Core loop

`Enter City → Choose Role → Scout → Mission → Risk/Decision → Consequence → Reputation → Upgrade → New District`

Every mission should have:
- objective
- time/risk pressure
- at least two possible approaches
- visible consequence
- reward
- Agent commentary

## Agent

The Agent becomes the city's director rather than a HUD message generator.

It should:
- observe player behavior
- create missions
- move NPCs between districts
- generate security incidents
- remember previous choices
- change difficulty
- create rival hacker/defender encounters
- reveal or hide information based on reputation

## Base integration

### Phase 1 — Base Sepolia
Use Base Sepolia for all on-chain prototypes and testing.

- Chain ID: `84532`
- RPC: `https://sepolia.base.org`
- Store only safe game state/achievements on-chain.
- Never request a private key from the player.
- Never connect game actions to real asset theft.

### Phase 2 — Base Mainnet
After gameplay is stable, selectively move public achievements and optional ownership mechanics to Base Mainnet.

- Chain ID: `8453`
- Mainnet RPC: `https://mainnet.base.org`

### Candidate on-chain features

1. Player identity / profile.
2. Mission completion attestations.
3. Reputation milestones.
4. Cosmetic district badges.
5. Agent-generated achievement records.
6. Optional collectible city assets.

Keep high-frequency movement, combat, NPC simulation, and ordinary missions off-chain. Only meaningful achievements/state transitions should touch the chain.

## Technical direction

Current prototype: dependency-free Canvas raycaster.

Next architecture:

- `game.js` — world simulation and renderer
- `agent-core.js` — adaptive Agent
- `city-world.js` — districts, NPCs, missions, events
- `mobile-controls.js` — iOS controls
- `base-client.js` — read-only Base connection first
- `chain-state.js` — optional achievement transactions
- `CITY_PROTOCOL.md` — product/game design contract

## Milestones

### M1 — City MVP
- larger city map
- district boundaries
- NPCs
- role selection
- mission board
- hacker/defender heat system
- mobile-first controls

### M2 — Living City
- NPC schedules
- random incidents
- faction reputation
- Agent-generated missions
- day/night visual cycle

### M3 — Base Layer
- Base Sepolia connection
- wallet connect
- player profile
- achievement contract
- transaction/event viewer

### M4 — Multiplayer foundation
- server-authoritative sessions
- player presence
- hacker vs defender matches
- anti-cheat checks

### M5 — Base Mainnet release
- audit contracts
- deploy public achievement/ownership layer
- production monitoring
- economy only after gameplay is proven fun
