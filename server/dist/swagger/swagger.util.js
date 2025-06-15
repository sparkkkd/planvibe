"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("./swagger.config");
function setupSwagger(app) {
    const config = (0, swagger_config_1.getSwaggerConfig)();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/docs', app, document, {
        jsonDocumentUrl: '/swagger.json',
        yamlDocumentUrl: 'swagger.yaml',
        customSiteTitle: 'Planvibe API doc',
    });
}
//# sourceMappingURL=swagger.util.js.map