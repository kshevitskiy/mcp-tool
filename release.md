# Adding new changesets

To generate a new changeset, run `pnpm changeset` in the root of the repository. The generated markdown files in the `.changeset` directory should be committed to the repository.

## Releasing changes

1. Run `pnpm changeset version`. This will bump the versions of the packages previously specified with `pnpm changeset` (and any dependents of those) and update the changelog files.
2. Run `pnpm install`. This will update the lockfile and rebuild packages.
3. Commit the changes.
4. Run `pnpm publish -r`. This command will publish all packages that have bumped versions not yet present in the registry.

---

For more details on using Changesets with **pnpm**, including setup, versioning, and release workflows, check out the official [Changesets documentation](https://github.com/changesets/changesets) or refer to this [guide on integrating Changesets with pnpm](https://pnpm.io/using-changesets).
