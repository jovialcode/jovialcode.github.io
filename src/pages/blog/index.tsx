import React, { useState, useEffect } from "react"
import { graphql, Link, PageProps } from "gatsby"

import * as classes from "./style.module.css"
import { Layout } from "../../components/layout/layout"
import { Tags } from "../../components/blog/tags"

interface PostFrontmatter {
  title: string
  date: string
  slug: string
  category: string
  tag: string[] | null
}

interface Post {
  node: {
    id: string
    frontmatter: PostFrontmatter
  }
}

interface BlogQueryData {
  allMarkdownRemark: {
    edges: Post[]
  }
}

const Index: React.FC<PageProps<BlogQueryData>> = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_item_list', {
        item_list_id: 'blog_list',
        item_list_name: 'Blog List',
      });
    }
  }, []);

  const categories = Array.from(new Set(posts.map(p => p.node.frontmatter.category)))

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_content', {
        content_type: 'category',
        item_id: category || 'all'
      });
    }
  }

  const filteredPosts = selectedCategory
    ? posts.filter(p => p.node.frontmatter.category === selectedCategory)
    : posts

  const groupedByCategory = filteredPosts.reduce((acc: { [key: string]: Post[] }, post: Post) => {
    const category = post.node.frontmatter.category
    if (!acc[category]) acc[category] = []
    acc[category].push(post)
    return acc
  }, {})

  const displayCategories = selectedCategory ? [selectedCategory] : categories

  return (
    <Layout>
      <section>
        <div className={classes.categoryFilter}>
          <button
            className={`${classes.filterButton} ${selectedCategory === null ? classes.filterButtonActive : ""}`}
            onClick={() => handleCategoryClick(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`${classes.filterButton} ${selectedCategory === category ? classes.filterButtonActive : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {displayCategories.map(category => (
          <div className={classes.Category} key={category}>
            <h2 className={"flex items-center"}>
              &#128049; {category}
            </h2>
            {groupedByCategory[category]?.map(({ node: post }) => (
              <Link className={"block"} to={post.frontmatter.slug} key={post.id}>
                <div className={classes.blogPostPreview}>
                  <div>
                    <span className={"mr-2"}>{post.frontmatter.date}</span>
                  </div>
                  <div>
                    <span className={classes.blogPostTitle}>{post.frontmatter.title}</span>
                    {post.frontmatter.tag && <Tags tags={post.frontmatter.tag} />}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
  allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
    ) {
    edges {
      node {
        id
        frontmatter{
          title
          date
          slug
          category
          tag
        }
      }
    }
  }
}
`
