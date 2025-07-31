# Megaverse Challenge Solution ✨

A clean, scalable, and well-structured solution for the Crossmint coding challenge.

## Architecture Overview

The solution follows SOLID principles and uses a modular architecture:

- **API Layer**: Base API client with retry logic and rate limiting
- **Domain Models**: TypeScript interfaces for type safety
- **Parser**: Goal map parsing with error handling
- **Builder**: Megaverse construction with progress tracking
- **Executor**: Single executor that handles any goal map
- **Utilities**: Logging, retry logic, and rate limiting

## Key Features

- **Error Resilience**: Automatic retry with exponential backoff
- **Rate Limiting**: Prevents API throttling
- **Progress Tracking**: Real-time progress updates
- **Extensible Design**: Easy to add new object types
- **Type Safety**: Full TypeScript support
- **Clean Logging**: Structured logging with timestamps
- **Dynamic Grid Size**: Automatically detects grid dimensions from goal map

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Update your candidate ID in `src/config.ts` or pass it as a command line argument

3. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Run the challenge (creates the megaverse based on current goal):
```bash
npm run start <CANDIDATE_ID>
```

### Clear the grid:
```bash
npm run clear
# or
npm run start <CANDIDATE_ID> clear
```

## Design Decisions

1. **Single Executor**: One executor handles any goal map, making it phase-agnostic
2. **Abstract Base Classes**: Used for API clients to ensure consistent error handling and retry logic
3. **Builder Pattern**: Megaverse builder separates construction logic from business logic
4. **Singleton Logger**: Ensures consistent logging throughout the application
5. **Rate Limiter**: Prevents API throttling and ensures smooth execution
6. **Error Recovery**: Continues execution even if individual objects fail to create
7. **Dependency Injection**: Make components more testable

## Extension Points

- Support new astral objects by extending the type system and API client
- Customize retry logic and rate limiting in config
- Add new parsers for different goal map formats

## Error Handling

- Network errors are automatically retried with exponential backoff
- API errors are logged with full details
- Failed object creation doesn't stop the entire process
- Clear error messages guide troubleshooting

## Production Improvements

If this were to be deployed to production, here are some improvements I would consider:

### Testing
- **Unit Tests**: Test individual components (parser, builder, API client) in isolation

### Data Validation
- **Schema Validation**: Use Zod or Joi to validate API responses match expected schemas
- **Runtime Type Checking**: Ensure type safety at runtime, not just compile time

### Observability & Monitoring
- **Structured Logging**: Use a proper logging library (Winston, Pino) with log levels
- **Metrics**: Track success rates, API latency, retry counts