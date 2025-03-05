"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = parseDate;
const date_fns_1 = require("date-fns");
function parseDate(dateString) {
    const now = new Date();
    let date = now;
    if ((dateString === null || dateString === void 0 ? void 0 : dateString.toLowerCase()) === 'yesterday') {
        return formatDate((0, date_fns_1.subDays)(now, 1));
    }
    const parsedDate = (0, date_fns_1.parse)(dateString, 'dd-MM-yyyy', now);
    if ((0, date_fns_1.isValid)(parsedDate) && !(0, date_fns_1.isFuture)(parsedDate)) {
        date = parsedDate;
    }
    return formatDate(date);
}
function formatDate(date) {
    return {
        day: (0, date_fns_1.format)(date, 'dd'),
        month: (0, date_fns_1.format)(date, 'MM'),
        year: (0, date_fns_1.format)(date, 'yyyy'),
    };
}
