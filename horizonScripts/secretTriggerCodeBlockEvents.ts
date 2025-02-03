import { CodeBlockEvent, Entity, Player, PropTypes } from "horizon/core"

const ExtraTriggerCodeBlockEvents = {
  PlayerOccupied : new CodeBlockEvent<[Player]>(
    'occupied',
    [PropTypes.Player]
  ),
  PlayerEmpty : new CodeBlockEvent<[Player]>(
    'empty',
    [PropTypes.Player]
  ),

  EntityOccupied : new CodeBlockEvent<[Entity]>(
    'occupied',
    [PropTypes.Entity]
  ),
  EntityEmpty : new CodeBlockEvent<[Entity]>(
    'empty',
    [PropTypes.Entity]
  )
}