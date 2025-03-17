import { getWod, getWodURL } from '../service/api.js'
import { parseDate } from '../utils/date.js'

export async function get_wod(datestr: string = '') {
  const date = parseDate(datestr)
  const wodURL = getWodURL(date)

  try {
    const { data } = await getWod(date)
    const { title, wodRaw } = data.wods
    const markdown = `# ${title}\n\n${wodRaw}`
    return markdown
  } catch (exception) {
    throw new Error(
      `Sorry, I couldn't fetch the WOD. Please visit ${wodURL} to view today's workout.`
    )
  }
}
