import {
  NetworkEvent, Component
} from "horizon/core"

const networkEvent = new NetworkEvent<{ code: number }>(
  'setCodeWithNumber'
)

class ExampleComponent extends Component<typeof ExampleComponent> {
  override preStart() {
    this.connectNetworkEvent(this.entity, networkEvent, ({code}) => {
      console.log(`I got ${code}!`)
    })
  }

  override start() {
    this.sendNetworkEvent(this.entity, networkEvent, {code: 42})
  }
}
Component.register(ExampleComponent)