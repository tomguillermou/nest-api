import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
    HealthCheckService,
    HealthCheck,
    HealthCheckResult,
    HealthIndicatorResult,
    MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Connection } from 'mongoose';

@Controller('health')
export class HealthController {
    constructor(
        @InjectConnection() private connection: Connection,
        private health: HealthCheckService,
        private mongo: MongooseHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check(): Promise<HealthCheckResult> {
        return this.health.check([
            (): Promise<HealthIndicatorResult> =>
                this.mongo.pingCheck('mongodb', {
                    connection: this.connection,
                    timeout: 2000,
                }),
        ]);
    }
}
