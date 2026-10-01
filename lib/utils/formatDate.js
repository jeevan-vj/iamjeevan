const monthYear = { month: 'short', year: 'numeric', timeZone: 'UTC' }
const postDate = { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }

export function formatMonthYear(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-GB', monthYear).format(new Date(date))
}

export function formatPostDate(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-GB', postDate).format(new Date(date))
}

export default formatMonthYear
