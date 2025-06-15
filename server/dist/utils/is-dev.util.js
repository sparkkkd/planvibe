"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDev = void 0;
const isDev = (configService) => configService.getOrThrow('NODE_ENV') === 'dev';
exports.isDev = isDev;
//# sourceMappingURL=is-dev.util.js.map