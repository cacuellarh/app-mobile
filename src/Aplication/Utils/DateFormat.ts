import { format, addDays, subMonths, compareAsc, parseISO, parse } from 'date-fns';

export class DateFormat
{

    static getDate(): string
    {
        const date = new Date()
        var dateFormat = format(date,'yyyy-MM-dd')
        return dateFormat
    }

    static StringToDate(date : string)
    {
        const parseDate = parse(date,'yyyy-MM-dd', new Date())
        return parseDate
    }

    static ParseDate(date : Date)
    {
        var dateFormat = format(date,'yyyy-MM-dd')
        return dateFormat
    }
}