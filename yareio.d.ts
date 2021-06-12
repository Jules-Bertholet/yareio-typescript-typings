/* Type definitions for the various objects you have access to in Yare. */

declare const memory: Record<string, unknown> // You will probably want to change this

declare type Position = [x: number, y: number]

declare interface Sight {
	friends: `${string}${number}`[]
	friends_beamable: `${string}${number}`[]
	enemies: `${string}${number}`[]
	enemies_beamable: `${string}${number}`[]
	structures: `${string}${number}`[]
}

declare interface Entity {
	id: string,
	position: Position
}

declare interface ArtificialEntity extends Entity {
	size: number
	energy_capacity: number
	energy: number
	hp: 0 | 1
	sight: Sight

	player_id: string
	shape: "circles" | "squares" | "triangles"
	color: string
}

declare interface SpiritBase extends ArtificialEntity {
	id: `${string}${number}`

	merged: `${string}${number}`[]
	move_speed: number
	mark: string

	move: (target: Position) => void
	energize: (target: ArtificialEntity) => void
	shout: (message: string) => void
	set_mark: (label: string) => void
}

declare interface Circle extends SpiritBase {
	merge: (target: Circle) => void
	divide: () => void

	shape: "circles"
}

declare interface Square extends SpiritBase {
	size: 10
	energy_capacity: 100

	shape: "squares"

	jump: (target: Position) => void
}

declare interface Triangle extends SpiritBase {
	size: 10
	energy_capacity: 100

	shape: "triangles"
}

type Spirit = Circle | Square | Triangle

declare interface Structure extends Entity {
	structure_type: string
}

declare interface Base extends Structure, ArtificialEntity {
	id: `base_${string}`
	structure_type: 'base'
	size: 40
	sight: Sight
	current_spirit_cost: number
}

declare interface CircleBase extends Base {
	energy_capacity: 400

	shape: "circles"
}

declare interface SquareBase extends Base {
	energy_capacity: 1000

	shape: "squares"
}

declare interface TriangleBase extends Base {
	energy_capacity: 500

	shape: "triangles"
}

declare interface Star extends Structure {
	id: `star_${string}`
	structure_type: 'star'
	position: Position
}

declare interface Players {
	p1: string
	p2: string
}

declare const my_spirits: Spirit[]
declare const spirits: Record<string, Spirit>
declare const base: Base
declare const enemy_base: Base
declare const bases: Record<`base_${string}`, Base>
declare const star_zxq: Star
declare const star_a1c: Star
declare const stars: Record<`star_${string}`, Star>

declare const this_player_id: string
declare const players: Players

declare const CODE_VERSION: string
