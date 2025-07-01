
export const getDateDifferenceInDays = (startDate: string, end_date: string): number => {
    const start = new Date(startDate);
    const end = new Date(end_date);
    const differenceInTime = end.getTime() - start.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24)); 
}

