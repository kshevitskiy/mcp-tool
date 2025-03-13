// Type guards for arguments

export function spaceIdArgs(args: unknown): args is {
  space_id: string
} {
  return (
    typeof args === 'object' &&
    args !== null &&
    'space_id' in args &&
    typeof (args as { space_id: string }).space_id === 'string'
  )
}

export function createSpaceArgs(args: unknown): args is {
  name: string
} {
  return (
    typeof args === 'object' &&
    args !== null &&
    'name' in args &&
    typeof (args as { name: string }).name === 'string'
  )
}

export function isGetComponentTaskArgs(args: unknown): args is {
  space_id: string
  component_id: string
} {
  return (
    typeof args === 'object' &&
    args !== null &&
    'space_id' in args &&
    typeof (args as { space_id: string }).space_id === 'string' &&
    'component_id' in args &&
    typeof (args as { component_id: string }).component_id === 'string'
  )
}
