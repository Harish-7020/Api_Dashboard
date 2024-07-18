import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { APIUsage } from "src/modules/apiusage/entity/api-usage.entity";
import { Students } from "src/modules/student/entity/student.entity";
import { Subjects } from "src/modules/subject/entity/subject.entity";
import { Users } from "src/modules/users/entity/users.entity";

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {

return {
            type: 'mssql',
            host: 'localhost',
            username: 'SA',
            password: 'Admin@2024',
            port: 1433,
            database: 'STUDENTS',
            options: {
                trustServerCertificate: true,
              },
            entities :[Students, Subjects, Users, APIUsage],
            // "synchronize": true

        };
    }

}