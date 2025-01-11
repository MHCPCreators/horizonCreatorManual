# Horizon Technical Specification {ignore=true}

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=true} -->

<!-- code_chunk_output -->

1. [Overview](#overview)
2. [World Metadata](#world-metadata)
3. [Scene Graph](#scene-graph)
    1. [Hierarchy](#hierarchy)
    2. [Transforms (Local and Global)](#transforms-local-and-global)
    3. [Entity Properties](#entity-properties)
4. [Entities](#entities)
    1. [Overview](#overview-1)
    2. [Docs on each kind of gizmo](#docs-on-each-kind-of-gizmo)
    3. [Audio Gizmo + AI gen](#audio-gizmo--ai-gen)
5. [Custom Model Import](#custom-model-import)
    1. [Overview](#overview-2)
    2. [Uploads](#uploads)
    3. [Errors](#errors)
    4. [Asset Templates](#asset-templates)
    5. [Performance](#performance)
    6. [Horizon Lighting](#horizon-lighting)
    7. [General Tips](#general-tips)
6. [Scripting](#scripting)
    1. [Properties](#properties)
    2. [Types](#types)
    3. [Components](#components)
        1. [Props](#props)
        2. [Lifecycle](#lifecycle)
        3. [Events Registration](#events-registration)
    4. [Async (Timers)](#async-timers)
    5. [Persistence](#persistence)
    6. [Overview of core types (Player, Entity, Asset, Vec3, etc)](#overview-of-core-types-player-entity-asset-vec3-etc)
    7. [Properties](#properties-1)
    8. [Wiring](#wiring)
    9. [Local Scripts and Ownership](#local-scripts-and-ownership)
7. [Events (Sending and Receiving)](#events-sending-and-receiving)
    1. [Code Block Event](#code-block-event)
    2. [Local Events](#local-events)
    3. [Network Events](#network-events)
    4. [Broadcast events](#broadcast-events)
8. [Network](#network)
9. [Physics](#physics)
    1. [Overview of all physics properties and their interactions](#overview-of-all-physics-properties-and-their-interactions)
10. [Players](#players)
    1. [Joining / leaving (index assignment)](#joining--leaving-index-assignment)
    2. [Player controls](#player-controls)
    3. [AFK](#afk)
    4. [Grabbing and Releasing](#grabbing-and-releasing)
        1. [Can Grab?](#can-grab)
        2. [Releasing Objects](#releasing-objects)
        3. [Grab Sequence and Events](#grab-sequence-and-events)
            1. [Hand-off (Switching Hands or Players)](#hand-off-switching-hands-or-players)
        4. [Moving / Locking Held Objects](#moving--locking-held-objects)
    5. [Holstering](#holstering)
    6. [Attaching](#attaching)
11. [Frame sequencing](#frame-sequencing)
12. [Assets and Spawning](#assets-and-spawning)
13. [Custom UI](#custom-ui)
    1. [Bindings technical overview (what *T* is allowed, set, derive, and notes on preventing memory growth - e.g. don't keep deriving)](#bindings-technical-overview-what-t-is-allowed-set-derive-and-notes-on-preventing-memory-growth---eg-dont-keep-deriving)
14. ["Cross Screens" - Mobile vs PC vs VR](#cross-screens---mobile-vs-pc-vs-vr)
15. [IWP](#iwp)
16. [Performance Optimization](#performance-optimization)
    1. [Physics](#physics-1)
    2. [Gizmos](#gizmos)
    3. [Bridge calls explanation](#bridge-calls-explanation)
    4. [Draw-call specification](#draw-call-specification)
    5. [Perfetto hints](#perfetto-hints)
17. [List of all desktop editor shortcuts](#list-of-all-desktop-editor-shortcuts)
18. [Glossary](#glossary)

<!-- /code_chunk_output -->

# TODO {ignore=true}
  - Golden path steps of "ramping up" to make a tutorial

# Overview
* General description of what Horizon is and is not capable of.

# World Metadata
Name, description, comfort setting, player count, etc.

# Scene Graph
## Hierarchy
Groups, Parents, Children, and Pivots
What is / isn't mutable

## Transforms (Local and Global)
## Entity Properties

# Entities
## Overview
Gizmos, as, ...
## Docs on each kind of gizmo
## Audio Gizmo + AI gen

# Custom Model Import
## Overview
Assets, imports, templates, updates.

## Uploads
* Explain collection of FBXs and PNGs.
* Each FBX will be a new asset.
* Texture rules
* Suffix rules
* Pivots
* Limits
* Colliders

##  Errors
List and explanation of all possible errors

## Asset Templates
E.g. only root-level properties and scripts are maintained in an update.
You CAN nest.
## Performance
Draw calls, verts, textures, etc.

## Horizon Lighting
GI overview and tips.

## General Tips
Triangulate. Normals direction.
Workflows / advice for greyboxing.

# Scripting
## Properties
## Types
Player, Asset, Entity can be compared by equality. Vec3, Quaternion, Color can be compared approximately; these classes have mutable and immutable versions. There is a special `as` method on Entities.
## Components
### Props
### Lifecycle
  Construction, preStart, start, dispose
### Events Registration
## Async (Timers)
## Persistence
Leaderboards, PPVs
## Overview of core types (Player, Entity, Asset, Vec3, etc)
## Properties
## Wiring
## Local Scripts and Ownership

# Events (Sending and Receiving)
## Code Block Event
## Local Events
## Network Events
## Broadcast events
Mention coalescence

# Network
Clients, transfer, reconciliation

# Physics
## Overview of all physics properties and their interactions
* Collidable
* Simulated
* Locked
* Gravity
* Physical velocity
* Velocity
* Angular Velocity
* Forces, Acceleration, and Torque
* Spring Push and Spin

# Players
## Joining / leaving (index assignment)
## Player controls
## AFK
## Grabbing and Releasing

### Can Grab?

Collidable
Not-held OR hand-off
Set-who-can-grab
```ts
// GrabbableEntity
setWhoCanGrab(players: Player[]): void;
```

### Releasing Objects
Let go, force release, or get too far away

!!! info If a **held object moves too far** from a player's hand, such as via scripting, then that hand **will release** the object. This can go cause the object to be fully released or to go from two-hand to one-hand grab (if one hand is still close enough to stay holding).

### Grab Sequence and Events

There are a number of events associated with grabbing and holding. The diagram below shows how the state of an object changes with user-actions (highlighted in blue). Actions have associated `CodeBlockEvent`s that are sent. If a box contains multiple events then they are sent in the top-down order shown.

```dot
digraph G {
    rankdir=TD;

    NotHeld [label="Not held"];
    Held1 [label=<Held with<BR/>1 hand>];
    Held2 [label=<Held with<BR/>2 hands>];

    { rank=same; Grab1; Release1 }
    { rank=same; Grab2; Release2 }
    { rank=same; Release2Force; Held1 }

    Grab1 [label=<<TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0"><TR><TD BGCOLOR="#abe">player grabs with a hand</TD></TR><TR><TD BGCOLOR="#7c8"><B>OnGrabStart</B><I>[isRightHand, player]</I></TD></TR></TABLE>>, shape=box margin=0];

    Release1 [label=<<TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0"><TR><TD BGCOLOR="#abe">player releases hand or<BR/><I>forceRelease </I>called</TD></TR><TR><TD BGCOLOR="#7c8"><B>OnGrabEnd</B><I>[player]</I></TD></TR></TABLE>>, shape=box margin=0];

    NotHeld -> Grab1 [arrowhead=none];
    Grab1 -> Held1 [arrowtail=none];

    Grab2 [label=<<TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0"><TR><TD BGCOLOR="#abe">player grabs with<BR/> second hand</TD></TR><TR><TD BGCOLOR="#7c8"><B>OnMultiGrabStart</B><I>[player]</I></TD></TR><TR><TD BGCOLOR="#7c8"><B>OnGrabStart</B><I>[isRightHand, player]</I></TD></TR></TABLE>>, shape=box margin=0];

    Held1 -> Grab2 [arrowhead=none];
    Grab2 -> Held2;

    Held1 -> Release1 [arrowhead=none];
    Release1 -> NotHeld;

    Release2 [label=<<TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0"><TR><TD BGCOLOR="#abe">player releases 1 hand</TD></TR><TR><TD BGCOLOR="#7c8"><B>OnMultiGrabEnd</B><I>[player]</I></TD></TR></TABLE>>, shape=box margin=0];

    Held2 -> Release2 [arrowhead=none];
    Release2 -> Held1;

    Release2Force [label=<<TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0"><TR><TD BGCOLOR="#abe"><I>forceRelease</I>  called</TD></TR><TR><TD BGCOLOR="#7c8"><B>OnMultiGrabEnd</B><I>[player]</I></TD></TR><TR><TD BGCOLOR="#7c8"><B>OnGrabEnd</B><I>[player]</I></TD></TR></TABLE>>, shape=box margin=0];

    Held2 -> Release2Force [arrowhead=none];
    Release2Force -> NotHeld;
}
```

#### Hand-off (Switching Hands or Players)

When an entity is transferred from one hand to another or from one player to another then the entity is *fully released* by the first player before being grabbed by the second player.

!!! warning `OnGrabEnd` is sent during a "hand-off".
    The `OnGrabEnd` event may mean that an entity is about to grabbed by a different hand or player.

### Moving / Locking Held Objects
Explain how hand.position is human hand (not avatar)
Explain how you can prevent the object from being updated by physics system


## Holstering
## Attaching

# Frame sequencing

# Assets and Spawning

# Custom UI
## Bindings technical overview (what *T* is allowed, set, derive, and notes on preventing memory growth - e.g. don't keep deriving)

# "Cross Screens" - Mobile vs PC vs VR

# IWP

# Performance Optimization

## Physics
Colliders, triggers,

## Gizmos
* pool FX, sounds,
* limit mirror (1) and dynamic lights (20)

## Bridge calls explanation
## Draw-call specification
## Perfetto hints

# List of all desktop editor shortcuts
e.g. alt-click to orbit

# Glossary

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium
*[Player]: A person in an instance (or the server).

# OPEN QUESTIONS {ignore=true}
* does despawn cause grab "release"?
* does "attach" cause "release"?
* does an object colliding with another cause "release" (probably same as moving too far)
* does ownership transfer while held send any events?
* When do entity.owner vs world.getLocalPlayer() change - it seems that in `transferOwnership` that the former has already changed but not the latter?
