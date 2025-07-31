import { config } from './config';
import { MegaverseExecutor } from './megaverse-executor';
import { MegaverseBuilder } from './builders/megaverse-builder';
import { MegaverseApi } from './api/megaverse-api';
import { GoalMapParser } from './parsers/goal-map-parser';
import { Logger } from './utils/logger';

(async () => {
    const logger = new Logger();

    const candidateId = process.argv[2] || config.candidateId;

    if (candidateId === 'CANDIDATE_ID') {
        logger.error('Please set your candidate ID in config.ts or pass it as a command line argument');
        process.exit(1);
    }

    logger.info(`Starting Megaverse Challenge with candidate ID: ${candidateId}`);

    const action = process.argv[3] || 'run';

    try {
        const api = new MegaverseApi(candidateId, logger);
        const parser = new GoalMapParser(logger);
        const builder = new MegaverseBuilder(api, logger);

        switch (action) {
            case 'run':
                const executor = new MegaverseExecutor(builder, api, parser, logger);
                await executor.execute();
                break;
            case 'clear':
                await builder.clear();
                break;
            default:
                logger.error(`Unknown action: ${action}. Use 'run' or 'clear'`);
                process.exit(1);
        }
    } catch (error) {
        logger.error('Challenge failed', error);
        process.exit(1);
    }
})(); // IIFE ftw :D