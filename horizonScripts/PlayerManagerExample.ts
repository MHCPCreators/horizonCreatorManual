import { CodeBlockEvents, Component, EventSubscription, Player, PropTypes, TextGizmo } from 'horizon/core'

type PlayerState = 'InWorld' | 'InWorld+AFK' | 'NotInWorld'

class PlayerManager extends Component<typeof PlayerManager> {
    static propsDefinition = {
        text: { type: PropTypes.Entity },
    }

    private events: EventSubscription[] = []
    private allPlayers = new Map<Player, PlayerState>()

    override preStart(): void {
        this.events = [
            this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterWorld, (player) => {
                this.setPlayerState(player, 'InWorld')
            }),
            this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerExitWorld, (player) => {
                this.setPlayerState(player, 'NotInWorld')
            }),
            this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterAFK, (player) => {
                this.setPlayerState(player, 'InWorld+AFK')
            }),
            this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerExitAFK, (player) => {
                this.setPlayerState(player, 'InWorld')
            })
        ]
    }

    override start() {
    }

    override dispose(): void {
        this.events.forEach((sub) => sub.disconnect())
    }

    private setPlayerState(player: Player, state: PlayerState) {
        this.allPlayers.set(player, state)
        this.printAll()
    }

    private printAll() {
        let text = 'All Players:\n'
        this.allPlayers.forEach((state, player) => {
            text += `${player} ${player.name.get()}: ${state}\n`
        })
        this.props.text?.as(TextGizmo).text.set(text)
    }
}
Component.register(PlayerManager)
