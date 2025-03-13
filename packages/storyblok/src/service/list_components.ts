export async function list_components(storyblok: any, space_id: string) {
  // Fetch components
  const response = await storyblok.get(`/spaces/${space_id}/components/`, {})
  const data = response.data.components.map(
    (component: any) =>
      `## ${component.display_name ?? component.name}\n- **ID:** ${
        component?.id
      }\n- **Name:** ${component.name}\n- **Description:** ${
        component.description
      }\n\n### Schema\n\`\`\`json\n${JSON.stringify(
        { schema: component.schema },
        null,
        2
      )}\n\`\`\``
  )

  const markdown = `
# Components

${data.join('\n\n')}
  `

  return markdown
}
