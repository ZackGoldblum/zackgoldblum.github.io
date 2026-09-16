import { useState } from 'react'
import ArrowButton from '../components/ArrowButton'
import ImageLightbox from '../components/ImageLightbox'
import LinkIcon from '../components/LinkIcon'
import PageIntro from '../components/PageIntro'
import { projects, type Project } from '../data/projects'

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  // Click-to-zoom: the button is the source rect the lightbox animates from
  const [zoom, setZoom] = useState<{ el: HTMLElement; aspect: number } | null>(null)
  const [imgIndex, setImgIndex] = useState(0)
  const images = project.images
  const image = images[imgIndex]
  const imageAlt =
    images.length > 1 ? `${project.title} (${imgIndex + 1} of ${images.length})` : project.title
  const cycle = (step: number) => setImgIndex((imgIndex + step + images.length) % images.length)

  return (
    <article className="project card">
      <div className="project__media">
        <button
          className="project__media-zoom"
          aria-label={`View ${project.title} image`}
          onClick={(e) => {
            const el = e.currentTarget
            const img = el.querySelector('img')!
            setZoom({ el, aspect: img.naturalWidth / img.naturalHeight || 4 / 3 })
          }}
        >
          <img src={image.src} alt={imageAlt} width={image.w} height={image.h} loading="lazy" />
        </button>
        {images.length > 1 && (
          <>
            <ArrowButton
              dir="prev"
              label="Previous image"
              className="project__media-arrow project__media-arrow--prev"
              onClick={() => cycle(-1)}
            />
            <ArrowButton
              dir="next"
              label="Next image"
              className="project__media-arrow project__media-arrow--next"
              onClick={() => cycle(1)}
            />
          </>
        )}
      </div>
      <div className="project__body">
        <p className="project__date mono">{project.date.toUpperCase()}</p>
        <h3 className="project__title">{project.title}</h3>
        {project.org && <p className="project__org">{project.org}</p>}
        <p className="project__blurb">{project.blurb}</p>
        <div className="project__prose prose">
          {project.body.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
        {(project.links.length > 0 || project.buildList) && (
          <div className="project__links">
            {project.links.map((l) => (
              <a
                key={l.href}
                className="btn"
                href={l.href}
                target={l.href.startsWith('/') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                {l.label} <LinkIcon external={!l.href.startsWith('/')} />
              </a>
            ))}
            {project.buildList && (
              <button className="btn" onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Hide build list' : 'Build list'}{' '}
                <span className="btn__arrow">{expanded ? '−' : '+'}</span>
              </button>
            )}
          </div>
        )}
        {expanded && project.buildList && (
          <div className="project__build">
            {project.buildList.map((section) => (
              <div key={section.heading} className="project__build-section">
                <p className="eyebrow">{section.heading}</p>
                <ul className="mono">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      {zoom && (
        <ImageLightbox
          src={image.src}
          alt={imageAlt}
          fromEl={zoom.el}
          aspect={image.w && image.h ? image.w / image.h : zoom.aspect}
          onStep={images.length > 1 ? cycle : undefined}
          onClose={() => setZoom(null)}
        />
      )}
    </article>
  )
}

export default function Projects() {
  return (
    <div>
      <PageIntro
        index="01"
        title="Projects"
        lede="Collection of projects I've worked on over the years. Mix of things from school, research, and personal endeavors."
      />
      {Object.entries(projects).map(([era, items]) =>
        items.length === 0 ? null : (
        <section key={era}>
          <div className="era">
            <span className="era__year">{era.toUpperCase()}</span>
            <span className="era__line" />
          </div>
          <div className="project-list">
            {items.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>
        )
      )}
    </div>
  )
}
