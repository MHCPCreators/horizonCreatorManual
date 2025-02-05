import {
  NetworkEvent, Component, PropTypes, CodeBlockEvents
} from "horizon/core"

export const playerCaptured = new NetworkEvent<{ index: number }>(
  'didCapturePlayerInTrigger'
)

class TriggerCaptureComponent extends Component<
  typeof TriggerCaptureComponent
> {
  static propsDefinition = {
    trigger : { type : PropTypes.Entity },
    index : { type : PropTypes.Number }
  }

  override preStart() {
    const {trigger, index} = this.props
    if (trigger) {
      this.connectCodeBlockEvent(
        trigger,
        CodeBlockEvents.OnPlayerEnterTrigger,
        (player) => {
          this.sendNetworkEvent(player, playerCaptured, {index})
        }
      )
    }
  }

  start() {}
}
Component.register(TriggerCaptureComponent)