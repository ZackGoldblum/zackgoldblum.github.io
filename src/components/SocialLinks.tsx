interface SocialLinksProps {
  className?: string
}

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/ZackGoldblum',
    path: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.12c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z',
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=7xzw1a8AAAAJ&hl',
    path: 'M12 0 0 9.5l4.84 3.06A7.97 7.97 0 0 1 12 8c3.07 0 5.72 1.73 7.06 4.27L24 9.5 12 0Zm0 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zackgoldblum',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.53V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z',
  },
  {
    label: 'X',
    href: 'https://x.com/ZackGoldblum',
    path: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z',
  },
  {
    label: 'Email',
    href: 'mailto:zackgoldblum@gmail.com',
    path: 'M24 5.46v13.08A2.46 2.46 0 0 1 21.54 21H2.46A2.46 2.46 0 0 1 0 18.54V5.46A2.46 2.46 0 0 1 2.46 3h19.08A2.46 2.46 0 0 1 24 5.46ZM12 13.04 2.18 5.18a.84.84 0 0 0-.54 1.32L11.46 14a.86.86 0 0 0 1.08 0l9.82-7.5a.84.84 0 0 0-.54-1.32L12 13.04Z',
  },
]

export default function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`socials ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          className="socials__link"
          href={s.href}
          target={s.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  )
}
