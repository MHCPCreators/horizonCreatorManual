import {CodeBlockEvents, Component, PhysicalEntity, Player, World} from 'horizon/core'

class AxisYConstrainedGrabbable extends Component<typeof AxisYConstrainedGrabbable> {
  private grabInfo?: {isRightHand: boolean, player: Player}

  override start() {}

  override preStart() {
    // Lock the entity so it can't be moved by an avatar hand or by physics
    this.entity.as(PhysicalEntity).locked.set(true)

    // Record which player and which hand grab
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnGrabStart, (isRightHand, player) => {
      this.grabInfo = {isRightHand, player}
    })

    // Forget about the grabber when they release
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnGrabEnd, () => {
      this.grabInfo = undefined
    })

    // Update the entity every frame
    this.connectLocalBroadcastEvent(World.onUpdate, () => {
      if (this.grabInfo) {
        // Get the y-value of the *intended* player hand location
        const {player, isRightHand} = this.grabInfo
        const playerHand = isRightHand ? player.rightHand : player.leftHand
        const handPosition = playerHand.position.get()
        const handY = handPosition.y

        // Get the current location of the entity
        const grabbablePosition = this.entity.position.get()

        // Change the y-value in the vector
        grabbablePosition.y = handY

        // Set the new location of the entity
        this.entity.position.set(grabbablePosition)
      }
    })
  }
}
Component.register(AxisYConstrainedGrabbable)