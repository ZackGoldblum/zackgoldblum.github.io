/**
 * Blog posts — markdown files in src/content/blog/.
 *
 * Each file starts with YAML-ish frontmatter:
 *   ---
 *   title: Post title
 *   date: 2026-06-06        (YYYY-MM-DD — used for sorting and the label)
 *   blurb: One-line teaser shown on the list page.   (optional)
 *   ---
 *
 * The filename (minus .md) is the URL slug: hello-world.md → /blog/hello-world
 */

export interface BlogPost {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  dateLabel: string // "June 6, 2026"
  blurb?: string
  body: string // markdown after the frontmatter
}

const files = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parsePost(path: string, raw: string): BlogPost {
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)

  const meta: Record<string, string> = {}
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const i = line.indexOf(':')
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
    }
  }

  const date = meta.date ?? '1970-01-01'
  const [y, m, d] = date.split('-').map(Number)
  const dateLabel = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  return {
    slug,
    title: meta.title ?? slug,
    date,
    dateLabel,
    blurb: meta.blurb,
    body: match ? raw.slice(match[0].length) : raw,
  }
}

export const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date))
