import { PropTypes } from "horizon/core"
import {
  Binding, Text, UIComponent, UINode, View
} from "horizon/ui"

class FlashingText extends UIComponent<typeof FlashingText> {
  static propsDefinition = {
    message: { type: PropTypes.String }
  }

  private readonly toggle = new Binding(false);

  override initializeUI(): UINode {
    return View({
      style: { padding: 20 },
      children: [
        Text({
          text: this.props.message,
          style: {
            color: this.toggle.derive(t => t ? "red" : "blue"),
            fontSize: 24
          }
        })
      ]
    });
  }

  override start() {
    this.async.setInterval(() => {
      this.toggle.set(t => !t);
    }, 1000)
  }
}
UIComponent.register(FlashingText);