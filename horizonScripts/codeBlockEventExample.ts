import {
  CodeBlockEvent, Component, PropTypes
} from "horizon/core"

const cbEvent = new CodeBlockEvent<[food: string, count: number]>(
  'registerGroceries',
  [PropTypes.String, PropTypes.Number]
)

class ExampleComponent extends Component<typeof ExampleComponent> {
  preStart() {
    this.connectCodeBlockEvent(this.entity, cbEvent, (food, count) => {
      console.log(`I need to buy ${count} ${food}!`)
    })
  }

  start() {
    this.sendCodeBlockEvent(this.entity, cbEvent, 'apples', 5)
  }
}
Component.register(ExampleComponent)