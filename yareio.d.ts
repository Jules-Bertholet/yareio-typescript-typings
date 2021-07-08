/* Type definitions for the various objects you have access to in Yare. */

declare const memory: Record<string, unknown> // You will probably want to change this

declare type Position = [x: number, y: number]

declare type PlayerID = string

declare type SpiritID = `${PlayerID}_${number}`
declare type BaseID = `base_${string}`
declare type OutpostID = `outpost_${string}`
declare type StarID = `star_${string}`
declare type StructureID = BaseID | OutpostID | StarID
declare type EnergizableID = SpiritID | BaseID | OutpostID
declare interface OutpostSight extends Object {
	enemies: SpiritID[]
}
declare interface Sight extends OutpostSight {
	friends: SpiritID[]
	friends_beamable: SpiritID[]
	enemies_beamable: SpiritID[]
	structures: StructureID[]
}

declare interface Entity extends Object {
	id: string
	position: Position
	size: number
	energy: number
	last_energized: "" | EnergizableID
}
declare interface Energizable extends Entity {
	energy_capacity: number
}
declare interface Destructible extends Energizable {
	hp: 0 | 1
	sight: Sight

	player_id: PlayerID
	shape: "circles" | "squares" | "triangles"
	color: string
}

declare interface _Spirit extends Destructible {
	id: SpiritID

	merged: SpiritID[]
	move_speed: number
	mark: string

	move: (target: Position) => void
	energize: (target: Energizable) => void
	shout: (message: string) => void
	set_mark: (label: string) => void
}

declare interface CircleSpirit extends _Spirit {
	merge: (target: CircleSpirit) => void
	divide: () => void

	shape: "circles"
}

declare interface SquareSpirit extends _Spirit {
	size: 10
	energy_capacity: 100

	shape: "squares"

	jump: (target: Position) => void
}

declare interface TriangleSpirit extends _Spirit {
	size: 3
	energy_capacity: 30

	explode: () => void

	shape: "triangles"
}

type Spirit = CircleSpirit | SquareSpirit | TriangleSpirit

declare interface _Structure extends Entity {
	structure_type: string
}

declare interface _Base extends _Structure, Destructible {
	id: BaseID
	structure_type: 'base'
	size: 40
	current_spirit_cost: number
}

declare interface CircleBase extends _Base {
	energy_capacity: 400

	shape: "circles"
}

declare interface SquareBase extends _Base {
	energy_capacity: 1000

	shape: "squares"
}

declare interface TriangleBase extends _Base {
	energy_capacity: 600

	shape: "triangles"
}

type Base = SquareBase | CircleBase | TriangleBase;

interface Outpost extends _Structure, Energizable {
	id: OutpostID
	structure_type: "outpost"
	position: [2200, 1100]
	size: 20
	energy_capacity: 1000
	range: 400 | 600
	sight: OutpostSight

	control: PlayerID
}

declare interface _Star extends _Structure {
	id: StarID
	structure_type: 'star'
}

declare interface LargeStar extends _Star {
	size: 220
}

declare interface SmallStar extends _Star {
	size: 80
}

declare interface Graphics {
	style: string
	linewidth: number
	line: (start: Position, end: Position) => void
	circle: (pos: Position, r: number) => void
	square: (tl: Position, br: Position) => void
}

type Star = LargeStar | SmallStar;

type Structure = Base | Outpost | Star;

declare const my_spirits: Spirit[]
declare const spirits: Record<SpiritID, Spirit>
declare const base: Base
declare const enemy_base: Base
declare const bases: Record<BaseID, Base>
declare const outpost_mdo: Outpost;
declare const outpost = outpost_mdo;
declare const outposts: Record<OutpostID, Outpost>
declare const star_zxq: LargeStar
declare const star_a1c: LargeStar
declare const star_p89: SmallStar
declare const stars: Record<StarID, Star>

declare const this_player_id: PlayerID
declare const players: { p1: PlayerID, p2: PlayerID }

declare const tick: number
declare const ticks: { now: number }

declare const graphics: Graphics

declare const CODE_VERSION: string
