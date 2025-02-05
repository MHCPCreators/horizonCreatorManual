import {Component, PropTypes} from 'horizon/core'

class ListenerComponent extends Component<typeof ListenerComponent> {
  static propsDefinition = {
    name: { type: PropTypes.String }
  }

  override start() {}

  hear(message: string) {
    console.log('I heard: ' + message)
  }
}
Component.register(ListenerComponent)

class SpeakerComponent extends Component<typeof SpeakerComponent> {
  override start() {
    const listeners = Component.getComponents(ListenerComponent)

    for (const listener of listeners) {
      listener.hear('Hello, ' + listener.props.name)
    }
  }
}
Component.register(SpeakerComponent)