import { marked } from 'marked'
import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/blog'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <NotFound />

  return (
    <article className="post">
      <Link to="/blog" className="post__back mono rise">
        ← ALL POSTS
      </Link>
      <header className="post__header rise rise--1">
        <p className="eyebrow eyebrow--ion">{post.dateLabel.toUpperCase()}</p>
        <h1 className="post__title">{post.title}</h1>
      </header>
      <div
        className="post__body prose rise rise--2"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.body, { async: false }) }}
      />
    </article>
  )
}
