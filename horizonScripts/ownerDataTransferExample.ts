import { Component, Player, PropTypes } from "horizon/core"

type Ammo = {count: number};

class Weapon extends Component<typeof Weapon, Ammo> {
  static propsDefinition = {
    initialAmmo: {type: PropTypes.Number, default: 20},
  };

  // props are immutable; we store ammo in a private field
  private ammo: number = 0;

  override start() {
    this.ammo = this.props.initialAmmo;
  }

  override receiveOwnership(state: Ammo | null, from: Player, to: Player) {
    if (state !== null) {
      this.ammo = state.count
    }
  }

  override transferOwnership(from: Player, to: Player): Ammo {
    return {count: this.ammo};
  }
}
Component.register(Weapon);