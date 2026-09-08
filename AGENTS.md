# BLOCKTRACE CITY — Autonomous Coding Agent Instructions

You are the project's autonomous coding assistant. Work directly on the repository, inspect the current implementation before changing it, and keep the game playable after every change.

## Product goal
Build a mobile-first cyberpunk blockchain city game called BLOCKTRACE CITY. The player must feel like they are actually moving through a living city, not viewing a static demo or a tiny minimap.

## Current priorities
1. Replace the simplistic/flat presentation with a convincing city environment. Prefer a lightweight browser-native solution unless a dependency is clearly justified.
2. Fix movement so forward/left/right movement is continuous and never snaps backward, reverses unexpectedly, or depends on synthetic keyboard events on iPhone.
3. Make touch controls first-class: virtual movement controls plus touch drag/look.
4. Keep Hacker and Defender roles and the fictional blockchain-security gameplay.
5. Keep the Agent layer: it should observe player behavior, adapt missions/difficulty, move NPCs, and provide contextual objectives.
6. Keep performance good on iPhone Safari and desktop browsers.
7. Preserve safe fictional mechanics. Never implement real wallet draining, credential theft, phishing, exploit deployment, or real-world intrusion instructions.

## Definition of done for each task
- Inspect relevant files and understand the current architecture first.
- Make the smallest coherent set of changes needed.
- Do not leave dead code or broken script references.
- Verify syntax/obvious runtime errors where possible.
- Ensure the game can start from the role selector and remains playable without a keyboard.
- Do not regress the desktop experience.
- Commit changes with a clear message.

## Architecture guidance
- `game.js`: core runtime, player state, rendering and input integration.
- `city-world.js`: districts, NPCs and world data.
- `city-map.js`: map/overview UI; it must not become the main game canvas by accident.
- `mobile-controls.js`: touch input only; avoid fake KeyboardEvent hacks.
- `agent-core.js`: adaptive in-game Agent behavior and memory.
- Keep external blockchain integration optional and safe; gameplay should work without a wallet.

## Autonomous workflow
For each iteration:
1. Read the current relevant code.
2. Identify the highest-impact blocker.
3. Implement it fully rather than adding a cosmetic placeholder.
4. Check integration points and mobile behavior.
5. Commit the result.
6. Continue to the next blocker if it is clearly part of the same objective.

## Do not
- Do not rewrite working systems without a reason.
- Do not introduce a large framework solely for visuals.
- Do not create a fake loading screen instead of fixing the underlying game.
- Do not assume Vercel has deployed a commit unless deployment status is actually verified.
