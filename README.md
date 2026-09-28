# Skitgubbe for Agent Code

A Swedish shedding card game on an animated 3D table: play solo against 1–3 bots
or with 2–4 friends on your local network. The last player with cards is the skitgubbe.

Install `Juliusolsson05/agent-code-skitgubbe` through Agent Code's GitHub extension
installer, then run **Play Skitgubbe** or **Play Skitgubbe with Friends**. The repository includes its built `dist/`
entries because the host installs from the source archive.

## Our table rules

- Deal three face-down cards, three face-up positions, and three cards in hand.
- Before starting, select a hand card and a face-up card. Different ranks swap;
  matching ranks stack face up and refill the hand from the draw pile. Either
  selection order works. Swapping a stacked position moves the whole stack.
- Whoever holds the lowest hand card after setup starts, excluding 2. Ties use seat order.
- Play one or more cards of the same rank, equal to or higher than the pile. Draw
  back to three while cards remain. If you cannot or choose not to play, take the pile.
- **2:** goes on anything; keep your turn and play any card on it.
- **Invisible 5:** goes on anything; the next play must beat the card underneath it.
- **10 or four consecutive cards of one rank:** burn the pile and play again.
- Empty your hand, then your face-up cards, then flip face-down cards blind. A failed
  blind play goes into your hand with the pile.

House rules can disable specials or setup, change burn turns, enable 7-or-lower,
allow chance draws, or forbid finishing on 2/10/ace. Changes apply to the next deal.
Settings, mute and results stay on this device. Bots use visible information and
human-style tactics, including same-turn finishes and avoiding repeated exchanges;
they are not claimed to be optimal or unbeatable.

## Controls

In solo play: click to select; double-click to play. Matching legal cards have a green outline.
Arrow keys / Home / End move focus, Space selects, Shift+Space selects the rank,
Enter plays, T takes the pile, D tries a chance card, P passes when required,
M toggles sound, and comma opens settings. During setup, select one card from each
row; Up/Down switches rows. Escape clears a selection or closes settings.

## Development

Node 22+:

```sh
npm install --include=dev
npm run dev:web
npm run verify
npx playwright install chromium
npm run test:browser
```

The preview is at `http://localhost:5176/dev/`. `?build=production` loads the built
extension instead of source. Set `CHROME_PATH` to use an existing Chrome binary.
`npm run test:extension` sets production mode before building. Commit `dist/` after
changes; a source-only extension cannot be installed by the host.

The pure rules engine and bot live in `src/game/engine` and `src/game/bot.ts`.
React owns controls and card selection; `src/game/scene` owns the table and awaited
animation sequences. Art is SVG/canvas and audio is synthesized locally; the game
uses no remote asset fetches or project-file access.

## Play with friends (LAN)

Run **Play Skitgubbe with Friends**. Enter your name and choose **Host a room**.
Agent Code asks for the service/LAN capabilities declared by the extension.
Share the displayed address **and room code**. Friends on the same Wi-Fi/LAN can
open that address in a browser, or use the same command and **Join room** with
that address and code. Once 2–4 people have joined, the host chooses house rules
and deals. Everyone arranges their own face-up cards and presses **Ready to play**.

The host alone runs the engine. Guests receive only their own hand and public
cards; hidden cards have opaque identifiers. The same rules, table, card artwork
and layered hand layout serve solo and multiplayer. Refreshing reconnects to the
same seat. If someone disconnects the table waits; reopening their tab resumes. **Step away**
keeps a guest’s seat and credentials; **Resume game** brings them back.
The host can rematch after a result or end the room. Closing/restarting the host
service ends the session; durable crash recovery and host migration are not included.
Credentials stay on their own device, never in invite links.

For a standalone browser host:

```sh
NODE_ENV=production npm run build
npm run lan
```

Open the printed loopback address to host; friends use the printed private LAN
address. `SKITGUBBE_PORT=5194 npm run lan` chooses another port. The service serves
only the built website, not project sources. No public relay or external account
is used. Agent Code mode uses the SDK service proxy and brokered fetch, with
network access owned by the host application.

Commit `dist/`, `dist-service/`, `lan-dist/` and `package-lock.json` together.
`npm run test:lan-browser` drives two isolated browsers through a complete game,
refresh/rejoin, rematch and room closure. HTTP tests cover private payloads,
authenticated actions, stale/replayed requests and the SDK caller markers.

Hand, face-up cards and numbered face-down backs stay visible side by side. The
active group is marked. Large hands wrap into balanced layers in their own section
(40 cards use four rows), with Up/Down navigation; the table gives those rows space
within the modal.
