import { CodeBlockEvents, Component, PropTypes } from 'horizon/core'

const VisitPPVKey = 'FooGroupName:visits'

class VisitCounter extends Component<typeof VisitCounter> {
    static propsDefinition = {}
    override start() { }

    override preStart(): void {
        this.connectCodeBlockEvent(
            this.entity,
            CodeBlockEvents.OnPlayerEnterTrigger,
            (player) => {

                const count = this.world.persistentStorage.getPlayerVariable(
                    player, VisitPPVKey
                )
                this.world.persistentStorage.setPlayerVariable(
                    player, VisitPPVKey, count + 1
                )
            }
        )
    }
}
Component.register(VisitCounter)
