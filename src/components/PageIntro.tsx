interface PageIntroProps {
  index: string
  title: string
  lede?: string
}

export default function PageIntro({ index, title, lede }: PageIntroProps) {
  return (
    <div className="page-intro rise">
      <p className="eyebrow eyebrow--ion">
        {index} <span className="page-intro__sep">/</span> {title.toUpperCase()}
      </p>
      <h1 className="page-intro__title">{title}</h1>
      {lede && <p className="page-intro__lede">{lede}</p>}
    </div>
  )
}
