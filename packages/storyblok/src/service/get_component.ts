export async function get_component(
  storyblok: any,
  space_id: string,
  component_id: string
) {
  const response = await storyblok.get(
    `/spaces/${space_id}/components/${component_id}`,
    {}
  )

  const component = response.data.component
  const markdown = `
# ${component.display_name ?? component.name}

**Description:** ${component.descriptoin ?? 'none'}

- **ID:** ${component.id}
- **Name:** \`${component.name}\`
- **Real Name:** ${component.real_name}
- **Display Name:** ${component.display_name}

## Schema

\`\`\`json
${JSON.stringify({ schema: component.schema }, null, 4)}
\`\`\`
  `

  return markdown
}
