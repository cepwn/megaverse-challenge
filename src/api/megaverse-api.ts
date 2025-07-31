import { BaseApiClient } from './base-api-client';
import { Position, GoalMap, IMegaverseApi, ILogger } from '../types';

export class MegaverseApi extends BaseApiClient implements IMegaverseApi {
    private readonly candidateId: string;

    constructor(candidateId: string, logger: ILogger) {
        super(logger);
        this.candidateId = candidateId;
    }

    async createPolyanet(position: Position): Promise<void> {
        this.logger.info(`Creating Polyanet at position (${position.row}, ${position.column})`);
        await this.makeRequest('POST', '/polyanets', {
            candidateId: this.candidateId,
            row: position.row,
            column: position.column,
        });
        this.logger.success(`Polyanet created at (${position.row}, ${position.column})`);
    }

    async deletePolyanet(position: Position): Promise<void> {
        this.logger.info(`Deleting Polyanet at position (${position.row}, ${position.column})`);
        await this.makeRequest('DELETE', '/polyanets', {
            candidateId: this.candidateId,
            row: position.row,
            column: position.column,
        });
        this.logger.success(`Polyanet deleted at (${position.row}, ${position.column})`);
    }

    async createSoloon(position: Position, color: string): Promise<void> {
        this.logger.info(`Creating ${color} Soloon at position (${position.row}, ${position.column})`);
        await this.makeRequest('POST', '/soloons', {
            candidateId: this.candidateId,
            row: position.row,
            column: position.column,
            color: color,
        });
        this.logger.success(`${color} Soloon created at (${position.row}, ${position.column})`);
    }

    async deleteSoloon(position: Position): Promise<void> {
        this.logger.info(`Deleting Soloon at position (${position.row}, ${position.column})`);
        await this.makeRequest('DELETE', '/soloons', {
            candidateId: this.candidateId,
            row: position.row,
            column: position.column,
        });
        this.logger.success(`Soloon deleted at (${position.row}, ${position.column})`);
    }

    async createCometh(position: Position, direction: string): Promise<void> {
        this.logger.info(`Creating ${direction} Cometh at position (${position.row}, ${position.column})`);
        await this.makeRequest('POST', '/comeths', {
            candidateId: this.candidateId,
            row: position.row,
            column: position.column,
            direction: direction,
        });
        this.logger.success(`${direction} Cometh created at (${position.row}, ${position.column})`);
    }

    async deleteCometh(position: Position): Promise<void> {
        this.logger.info(`Deleting Cometh at position (${position.row}, ${position.column})`);
        await this.makeRequest('DELETE', '/comeths', {
            candidateId: this.candidateId,
            row: position.row,
            column: position.column,
        });
        this.logger.success(`Cometh deleted at (${position.row}, ${position.column})`);
    }

    async getGoalMap(): Promise<GoalMap> {
        this.logger.info('Fetching goal map');
        const goalMap = await this.makeRequest<GoalMap>('GET', `/map/${this.candidateId}/goal`);
        this.logger.success('Goal map fetched successfully');
        return goalMap;
    }
}