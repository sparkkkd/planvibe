"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwaggerConfig = getSwaggerConfig;
const swagger_1 = require("@nestjs/swagger");
function getSwaggerConfig() {
    return new swagger_1.DocumentBuilder()
        .setTitle('Planvibe API doc')
        .setDescription('Документация по API Planvibe')
        .setContact('Джалал Акаев', 'https://t.me/sparkkkd', 'sparereddd@gmail.com')
        .setLicense('Git repo', 'https://github.com/sparkkkd/planvibe/')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
}
//# sourceMappingURL=swagger.config.js.map