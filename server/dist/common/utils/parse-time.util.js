"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTime = parseTime;
function parseTime(input) {
    const timeRegex = /^(\d+)(ms|s|m|h|d)$/;
    const match = input.match(timeRegex);
    if (!match) {
        throw new Error(`Неверный формат времени: "${input}". Ожидается формат вроде "7d", "5h", "30m", "10s", "500ms"`);
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    const unitToMs = {
        ms: 1,
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
    };
    return value * unitToMs[unit];
}
//# sourceMappingURL=parse-time.util.js.map