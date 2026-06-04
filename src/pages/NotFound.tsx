import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound__code mono">ERR // 404</p>
      <h1 className="notfound__title starlight">Lost in space</h1>
      <p className="notfound__text">This page drifted beyond the known universe.</p>
      <Link to="/" className="btn btn--primary">
        Return home <span className="btn__arrow">→</span>
      </Link>
    </div>
  )
}
