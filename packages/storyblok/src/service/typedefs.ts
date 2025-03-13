import { generateTypescriptTypedefs } from '@slvrio/storyblok'

export async function typedefs(storyblok: any, space_id: string) {
  const _components = await storyblok.get(`/spaces/${space_id}/components/`, {})
  const _groups = await storyblok.get(
    `/spaces/${space_id}/component_groups/`,
    {}
  )

  const data = {
    components: _components.data.components,
    component_groups: _groups.data.component_groups,
  }

  const defs = await generateTypescriptTypedefs({
    jsonSchemas: [data],
    destinationFilePath: '',
  })

  const markdown = `
# Typedefs

1. **Install** \`storyblok\` module
\`\`\`shell
npm i storyblok # https://www.npmjs.com/package/storyblok
\`\`\`

2. **Save** type definitions
\`\`\`ts
${defs}
\`\`\`
  `

  return markdown
}
