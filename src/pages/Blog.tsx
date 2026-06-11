import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro'
import { posts } from '../data/blog'

export default function Blog() {
  return (
    <div>
      <PageIntro
        index="03"
        title="Blog"
        lede="Longer-form writing from the intersection of neurotechnology and artificial intelligence."
      />
      <div className="blog-list">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-item card card--hover">
            <p className="blog-item__date mono">{post.dateLabel.toUpperCase()}</p>
            <h3 className="blog-item__title">{post.title}</h3>
            {post.blurb && <p className="blog-item__blurb">{post.blurb}</p>}
            <span className="blog-item__cta mono">READ →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
