import * as hz from 'horizon/core';

class Test extends hz.Component<typeof Test> {
  static propsDefinition = {};

  start() {
    //player grabs the cube
    //on grab, wait 3 seconds, then attach
    //check if release is called

    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnGrabStart, this.grabStart)
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnGrabEnd, this.grabEnd)
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnAttachStart, this.attachStart)
  }

  grabStart = (isRight: boolean, player: hz.Player) => {
    console.log('grabStart')
    this.async.setTimeout(() => {
      this.entity.as(hz.AttachableEntity).attachToPlayer(player, hz.AttachablePlayerAnchor.Head)
    }, 3000)
  }

  grabEnd = (player: hz.Player) => {
    console.log('grabEnd')
  }

  attachStart = (player: hz.Player) => {
    console.log('attachStart')
  }
}
hz.Component.register(Test);