import { ILogger } from '../types';

export class Logger implements ILogger {
    info(message: string, data?: any): void {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
    }

    error(message: string, error?: any): void {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
    }

    warn(message: string, data?: any): void {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '');
    }

    success(message: string, data?: any): void {
        console.log(`[SUCCESS] ${new Date().toISOString()} - 🚀 ${message}`, data || '');
    }
}