import moment from "moment";

export const dateUtils = {
  unixToReadable(timestamp: number): string {
    const d = moment(timestamp * 1000);
    return d.format("MMM Do, YYYY h:mmA")
  },

  unixAgo(timestamp: number): string {
    const d = moment(timestamp * 1000);
    return d.fromNow();
  },

  /**
   * Get bounds based on year and month.
   * @param year year (e.g. 2019)
   * @param month month as an integer 0 to 11
   */
  getBounds(year: number | null, month: number | null) {
    const monthDefined = month || month === 0;
    if (year && monthDefined) {
      const m = moment();
      m.year(year);
      m.month(month as number);
      m.date(1);
      const lowerBound = m.unix();
      m.add(1, 'month');
      const upperBound = m.unix();
      return { lowerBound, upperBound }
    } else if (year) {
      const m = moment();
      m.year(year);
      m.month(0);
      m.day(1);
      const lowerBound = m.unix();
      m.add(1, 'year');
      const upperBound = m.unix();
      return { lowerBound, upperBound }
    }
    return { lowerBound: 0, upperBound: 0 };
  }
}

export interface DateUtils {
  unixToReadable: (timestamp: number) => string;
  unixAgo: (timestamp: number) => string;
  getBounds: (year: number | null, month: number | null) => { lowerBound: number, upperBound: number };
}
