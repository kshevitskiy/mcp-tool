export async function create_space(storyblok: any, name: string) {
  const response = await storyblok.post('/spaces/', {
    space: { name },
  })

  const space = response.data.space

  const markdown = `
# ${space?.name} space

- **ID of the space:** ${space.id}
- **Domain for your default preview url:** ${space.domain}
- **Space Plan:** ${space.plan}
- **Preview token of the space:** \`${space.first_token}\`
  `

  return markdown
}
