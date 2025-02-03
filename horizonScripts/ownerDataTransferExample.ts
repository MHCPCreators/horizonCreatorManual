import { Component, Player, PropTypes } from "horizon/core"

type AmmoState = {ammo: number};

class Weapon extends Component<typeof Weapon, AmmoState> {
  static propsDefinition = {
    initialAmmo: {type: PropTypes.Number, default: 20},
  };

  // props are immutable; we store ammo in a private field
  private currentAmmo: number = 0;

  start() {
    // start() gets called first, before receiveOwnership(),
    // to set the default behavior in case
    // there is no orderly ownership transfer
    this.currentAmmo = this.props.initialAmmo;
  }

  receiveOwnership(state: AmmoState | null, from: Player, to: Player) {
    // if there is no orderly ownership transfer,
    // i.e. the transferred state is 'null',
    // use the value set in start(). Otherwise
    // overwrite the start() value.
    this.currentAmmo = state?.ammo ?? this.currentAmmo;
  }

  transferOwnership(from: Player, to: Player): AmmoState {
    return {ammo: this.currentAmmo};
  }
}
Component.register(Weapon);