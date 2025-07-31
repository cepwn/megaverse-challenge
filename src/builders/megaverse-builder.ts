import { MegaverseObject, IMegaverseApi, IMegaverseBuilder, ILogger } from '../types';

export class MegaverseBuilder implements IMegaverseBuilder {
    constructor(
        private api: IMegaverseApi,
        private logger: ILogger
    ) {}

    async build(objects: MegaverseObject[]): Promise<void> {
        this.logger.info(`Building megaverse with ${objects.length} objects`);

        const nonSpaceObjects = objects.filter(obj => obj.type !== 'SPACE');
        this.logger.info(`Found ${nonSpaceObjects.length} non-space objects to create`);

        let created = 0;
        const total = nonSpaceObjects.length;

        for (const object of nonSpaceObjects) {
            try {
                await this.createObject(object);
                created++;
                this.logger.info(`Progress: ${created}/${total} objects created`);
            } catch (error) {
                this.logger.error(`Failed to create object at (${object.position.row}, ${object.position.column})`, error);
                // Continue with other objects even if one fails
            }
        }

        this.logger.success(`Megaverse build complete! Created ${created}/${total} objects`);
    }

    private async createObject(object: MegaverseObject): Promise<void> {
        switch (object.type) {
            case 'POLYANET':
                await this.api.createPolyanet(object.position);
                break;
            case 'SOLOON':
                await this.api.createSoloon(object.position, object.color);
                break;
            case 'COMETH':
                await this.api.createCometh(object.position, object.direction);
                break;
            case 'SPACE':
                // No action needed for space
                break;
            default:
                this.logger.warn(`Unknown object type: ${(object as any).type}`);
        }
    }

    async clear(): Promise<void> {
        const goalMapResponse = await this.api.getGoalMap();
        const gridSize = goalMapResponse.goal.length;
        this.logger.info(`Detected grid size: ${gridSize}x${gridSize}`);

        this.logger.info(`Clearing ${gridSize}x${gridSize} grid`);

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                try {
                    await Promise.allSettled([
                        this.api.deletePolyanet({ row, column: col }),
                        this.api.deleteSoloon({ row, column: col }),
                        this.api.deleteCometh({ row, column: col })
                    ]);
                } catch (error) {
                    // Ignore errors - object might not exist at this position
                }
            }
        }

        this.logger.success('Grid cleared');
    }
}