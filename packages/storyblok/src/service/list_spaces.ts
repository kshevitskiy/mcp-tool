export async function list_spaces(storyblok: any) {
  const response = await storyblok.get('/spaces/', {})
  const data = response.data.spaces.map(
    (space: any) =>
      `- \`${space?.id}\` **${space?.name}** at **${space?.region}** under __${space?.plan}__ plan`
  )

  const markdown = `
# Spaces

${data.join('\n')}
  `

  return markdown
}
