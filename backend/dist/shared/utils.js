"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateDifferenceInDays = void 0;
const getDateDifferenceInDays = (startDate, end_date) => {
    const start = new Date(startDate);
    const end = new Date(end_date);
    const differenceInTime = end.getTime() - start.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};
exports.getDateDifferenceInDays = getDateDifferenceInDays;
