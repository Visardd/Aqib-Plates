const longDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" });

/** "2026-10-12" → "12 October 2026". */
export const formatDate = (isoDate: string) => longDate.format(new Date(isoDate));
