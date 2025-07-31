export interface Position {
    row: number;
    column: number;
}

export interface AstralObject {
    type: 'POLYANET' | 'SOLOON' | 'COMETH' | 'SPACE';
    position: Position;
}

export interface Polyanet extends AstralObject {
    type: 'POLYANET';
}

export interface Soloon extends AstralObject {
    type: 'SOLOON';
    color: 'blue' | 'red' | 'purple' | 'white';
}

export interface Cometh extends AstralObject {
    type: 'COMETH';
    direction: 'up' | 'down' | 'right' | 'left';
}

export interface Space extends AstralObject {
    type: 'SPACE';
}

export type MegaverseObject = Polyanet | Soloon | Cometh | Space;

export interface GoalMap {
    goal: string[][];
}

export interface ILogger {
    info(message: string, data?: any): void;
    error(message: string, error?: any): void;
    warn(message: string, data?: any): void;
    success(message: string, data?: any): void;
}

export interface IMegaverseApi {
    createPolyanet(position: Position): Promise<void>;
    deletePolyanet(position: Position): Promise<void>;
    createSoloon(position: Position, color: string): Promise<void>;
    deleteSoloon(position: Position): Promise<void>;
    createCometh(position: Position, direction: string): Promise<void>;
    deleteCometh(position: Position): Promise<void>;
    getGoalMap(): Promise<GoalMap>;
}

export interface IGoalMapParser {
    parse(goalMap: string[][]): MegaverseObject[];
}

export interface IMegaverseBuilder {
    build(objects: MegaverseObject[]): Promise<void>;
    clear(gridSize?: number): Promise<void>;
}

export interface IMegaverseExecutor {
    execute(): Promise<void>;
}