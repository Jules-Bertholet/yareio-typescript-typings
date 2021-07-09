// Minimum TypeScript Version: 4.1
/* Type definitions for the various objects you have access to in Yare. */

declare const memory: Record<string, unknown>; // You will probably want to change this

type Position = [x: number, y: number];

type PlayerID = string;

type SpiritID = `${PlayerID}_${number}`;
type BaseID = `base_${string}`;
type OutpostID = `outpost_${string}`;
type StarID = `star_${string}`;
type StructureID = BaseID | OutpostID | StarID;
type EnergizableID = SpiritID | BaseID | OutpostID;
interface OutpostSight extends Object {
	enemies: SpiritID[];
}
interface Sight extends OutpostSight {
	friends: SpiritID[];
	friends_beamable: SpiritID[];
	enemies_beamable: SpiritID[];
	structures: StructureID[];
}

interface Entity extends Object {
	id: string;
	position: Position;
	size: number;
	energy: number;
	last_energized: "" | EnergizableID;
}
interface Energizable extends Entity {
	energy_capacity: number;
}
interface Destructible extends Energizable {
	hp: 0 | 1;
	sight: Sight;

	player_id: PlayerID;
	shape: "circles" | "squares" | "triangles";
	color: string;
}

interface _Spirit extends Destructible {
	id: SpiritID;

	merged: SpiritID[];
	move_speed: number;
	mark: string;

	move: (target: Position) => void;
	energize: (target: Energizable) => void;
	shout: (message: string) => void;
	set_mark: (label: string) => void;
}

interface CircleSpirit extends _Spirit {
	merge: (target: CircleSpirit) => void;
	divide: () => void;

	shape: "circles";
}

interface SquareSpirit extends _Spirit {
	size: 10;
	energy_capacity: 100;

	shape: "squares";

	jump: (target: Position) => void;
}

interface TriangleSpirit extends _Spirit {
	size: 3;
	energy_capacity: 30;

	explode: () => void;

	shape: "triangles";
}

type Spirit = CircleSpirit | SquareSpirit | TriangleSpirit;

interface _Structure extends Entity {
	structure_type: string;
}

interface _Base extends _Structure, Destructible {
	id: BaseID;
	structure_type: 'base';
	size: 40;
	current_spirit_cost: number;
}

interface CircleBase extends _Base {
	energy_capacity: 400;

	shape: "circles";
}

interface SquareBase extends _Base {
	energy_capacity: 1000;

	shape: "squares";
}

interface TriangleBase extends _Base {
	energy_capacity: 600;

	shape: "triangles";
}

type Base = SquareBase | CircleBase | TriangleBase;

interface Outpost extends _Structure, Energizable {
	id: OutpostID;
	structure_type: "outpost";
	position: [2200, 1100];
	size: 20;
	energy_capacity: 1000;
	range: 400 | 600;
	sight: OutpostSight;

	control: PlayerID;
}

interface _Star extends _Structure {
	id: StarID;
	structure_type: 'star';

	active_in: number;
	active_at: number;
}

interface LargeStar extends _Star {
	size: 220;

	active_at: 0;
}

interface SmallStar extends _Star {
	size: 80;

	active_at: 100;
}

interface Graphics {
	style: string;
	linewidth: number;
	line: (start: Position, end: Position) => void;
	circle: (pos: Position, r: number) => void;
	square: (tl: Position, br: Position) => void;
}

type Star = LargeStar | SmallStar;

type Structure = Base | Outpost | Star;

declare const my_spirits: CircleSpirit[] | SquareSpirit[] | TriangleSpirit[];
declare const spirits: Record<SpiritID, Spirit>;
declare const base: Base;
declare const enemy_base: Base;
declare const bases: Record<BaseID, Base>;
declare const outpost_mdo: Outpost;
declare const outpost: Outpost;
declare const outposts: Record<OutpostID, Outpost>;
declare const star_zxq: LargeStar;
declare const star_a1c: LargeStar;
declare const star_p89: SmallStar;
declare const stars: Record<StarID, Star>;

declare const this_player_id: PlayerID;
declare const players: { p1: PlayerID, p2: PlayerID };

declare const tick: number;

declare const graphics: Graphics;

declare const CODE_VERSION: string;
