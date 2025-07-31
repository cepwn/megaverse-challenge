import { MegaverseObject, Polyanet, Soloon, Cometh, Space, Position, IGoalMapParser, ILogger } from '../types';

export class GoalMapParser implements IGoalMapParser {
    constructor(private logger: ILogger) {}

    parse(goalMap: string[][]): MegaverseObject[] {
        const objects: MegaverseObject[] = [];

        for (let row = 0; row < goalMap.length; row++) {
            for (let col = 0; col < goalMap[row].length; col++) {
                const cell = goalMap[row][col];
                const position: Position = { row, column: col };
                const object = this.parseCell(cell, position);
                objects.push(object);
            }
        }

        this.logger.info(`Parsed ${objects.length} objects from goal map`);
        return objects;
    }

    private parseCell(cell: string, position: Position): MegaverseObject {
        const upperCell = cell.toUpperCase();

        if (upperCell === 'SPACE') {
            return { type: 'SPACE', position } as Space;
        }

        if (upperCell === 'POLYANET') {
            return { type: 'POLYANET', position } as Polyanet;
        }

        if (upperCell.includes('SOLOON')) {
            const color = upperCell.split('_')[0].toLowerCase() as any;
            return {
                type: 'SOLOON',
                position,
                color
            } as Soloon;
        }

        if (upperCell.includes('COMETH')) {
            const direction = upperCell.split('_')[0].toLowerCase() as any;
            return {
                type: 'COMETH',
                position,
                direction
            } as Cometh;
        }

        this.logger.warn(`Unrecognized cell value: ${cell}, treating as SPACE`);
        return { type: 'SPACE', position } as Space;
    }
}