# Golden Path Tutorial

"County Fair Gallery Shooter"
Simple ui with "Start" button
When you press it 4 players spawn into "booths"
  with a gun in hand
They have 30s to shoot as many objects off the shelves
Scoreboard up top shows points and accuracy
End of round spawn players back out to leaderboard + stats

Extra:
Local scripts for better responsiveness on guns
onUpdate to animate shelves moving left-and-right
PPV tracks total points to call you Deputy or Sheriff
VR controls
Use spawning to get a random mixture of targets (ducks vs bottles)
Generate an AI sound effect (if in the US)
Modify the guns in blender

Try at your own peril!
Focused interaction instead of guns
End the game if too many players leave
Let players join mid-game if a spot is open
AimAssist

* Download Horizon
* Open editor
* Create new world
* Upload some pre-made assets
* Instantiate assets
* Move the entities around the scene
  1 shelf with physics objects on it
  4 spawn points

Features:
World creation, metadata, publishing
Using desktop editor to place entities, move camera, wire up
Physics, collisions, triggers, launching, grabbing
Player spawning, player events, system events, object spawning,
Scripts, components, script props, start / preStart
onUpdate, local/cb/network events, subscribe/send, async
Custom UI, focused interactions
Local scripts, object wiring
Particles, Audio (gen-ai'd), Haptics
PPVs, leaderboards, Quests
VR and mobile
CMI (import)