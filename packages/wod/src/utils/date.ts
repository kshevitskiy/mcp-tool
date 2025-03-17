import { subDays, parse, isValid, isFuture, format } from 'date-fns'

export function parseDate(dateString: string) {
  const now = new Date()
  let date = now

  if (dateString?.toLowerCase() === 'yesterday') {
    return formatDate(subDays(now, 1))
  }

  const parsedDate = parse(dateString, 'dd-MM-yyyy', now)
  if (isValid(parsedDate) && !isFuture(parsedDate)) {
    date = parsedDate
  }

  return formatDate(date)
}

function formatDate(date: Date) {
  return {
    day: format(date, 'dd'),
    month: format(date, 'MM'),
    year: format(date, 'yyyy'),
  }
}
