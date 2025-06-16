"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const config_1 = require("@nestjs/config");
const projects_module_1 = require("./modules/projects/projects.module");
const tasks_module_1 = require("./modules/tasks/tasks.module");
const attachments_module_1 = require("./modules/attachments/attachments.module");
const comments_module_1 = require("./modules/comments/comments.module");
const activity_logger_module_1 = require("./modules/activity-logger/activity-logger.module");
const activity_module_1 = require("./modules/activity/activity.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            projects_module_1.ProjectsModule,
            tasks_module_1.TasksModule,
            attachments_module_1.AttachmentsModule,
            comments_module_1.CommentsModule,
            activity_logger_module_1.ActivityLoggerModule,
            activity_module_1.ActivityModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map