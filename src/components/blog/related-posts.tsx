import React from "react"
import { Link } from "gatsby"
import * as classes from "./related-posts.module.css"

interface PostMeta {
  slug: string
  title: string
  category: string
}

interface Props {
  readBefore: PostMeta[]
  readAfter: PostMeta[]
}

export const RelatedPosts = ({ readBefore, readAfter }: Props) => {
  if (readBefore.length === 0 && readAfter.length === 0) return null

  return (
    <div className={classes.RelatedPosts}>
      {readBefore.length > 0 && (
        <section className={classes.Section}>
          <h4 className={classes.Label}>이 글을 읽기 전에</h4>
          {readBefore.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      )}
      {readAfter.length > 0 && (
        <section className={classes.Section}>
          <h4 className={classes.Label}>이 글을 읽은 후에</h4>
          {readAfter.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </section>
      )}
    </div>
  )
}

const PostCard = ({ post }: { post: PostMeta }) => (
  <Link to={`/blog/${post.slug}/`} className={classes.Card}>
    <span className={classes.Category}>{post.category}</span>
    <span className={classes.Title}>{post.title}</span>
  </Link>
)
