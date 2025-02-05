import {
  LocalEvent, Component
} from "horizon/core"

const doorEvent = new LocalEvent<{open: boolean, date: Date}>(
  'setDoorState'
)

class ExampleComponent extends Component<typeof ExampleComponent> {
  override preStart() {
    this.connectLocalEvent(this.entity, doorEvent, (info) => {
      console.log(`I got ${info.open} on ${info.date}!`)
    })
  }

  override start() {
    this.sendLocalEvent(this.entity, doorEvent, {
      open: true, date: new Date()
    })
  }
}
Component.register(ExampleComponent)