import { IMegaverseExecutor, IMegaverseBuilder, IMegaverseApi, IGoalMapParser, ILogger } from './types';

export class MegaverseExecutor implements IMegaverseExecutor {
    constructor(
        private builder: IMegaverseBuilder,
        private api: IMegaverseApi,
        private parser: IGoalMapParser,
        private logger: ILogger
    ) {}

    async execute(): Promise<void> {
        this.logger.info('=~! Starting Megaverse Challenge ===');

        try {
            const goalMapResponse = await this.api.getGoalMap();
            this.logger.info(`Goal map size: ${goalMapResponse.goal.length}x${goalMapResponse.goal[0]?.length || 0}`);

            const objects = this.parser.parse(goalMapResponse.goal);

            await this.builder.build(objects);

            this.logger.success('=~! Megaverse Challenge Complete! ===');
        } catch (error) {
            this.logger.error('Megaverse challenge failed', error);
            throw error;
        }
    }
}