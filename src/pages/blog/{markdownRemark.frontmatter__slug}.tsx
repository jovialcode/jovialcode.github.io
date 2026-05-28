import React, { useEffect } from 'react'
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

import { Layout } from "../../components/layout/layout"
import { RelatedPosts } from "../../components/blog/related-posts"

deckDeckGoHighlightElement();

interface PostMeta {
  slug: string
  title: string
  category: string
}

interface PostData {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string
      date: string
      slug: string
      category: string
      tag: string[]
      readBefore?: string[]
      readAfter?: string[]
      featuredImage?: {
        childImageSharp?: {
          gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData
        }
      }
    }
  }
  allMarkdownRemark: {
    nodes: Array<{
      frontmatter: PostMeta
    }>
  }
}

const PostTemplate: React.FC<PageProps<PostData>> = ({ data }) => {
  const post = data.markdownRemark

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_item', {
        items: [{
          item_id: post.frontmatter.slug,
          item_name: post.frontmatter.title,
          item_category: post.frontmatter.category,
          item_variant: post.frontmatter.tag?.join(', '),
        }]
      });
    }
  }, [post]);

  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: post.frontmatter.slug,
              value: milestone,
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.frontmatter.slug]);

  const featuredImg = getImage(post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData ?? null)

  const allPosts = data.allMarkdownRemark.nodes.map(n => n.frontmatter)
  const resolve = (slugs: string[] | null | undefined): PostMeta[] =>
    (slugs ?? []).flatMap(s => {
      const found = allPosts.find(p => p.slug === s)
      return found ? [found] : []
    })

  return (
    <Layout>
      <div className={"Blog markdown"}>
        <h1 className={"text-3xl"}>{post.frontmatter.title}</h1>
        <p className={"mb-2 text-gray-400"}>{post.frontmatter.date}</p>
        <div className={"text-center mt-8 mb-14"}>
          {featuredImg && <GatsbyImage image={featuredImg} alt={"entrance"}/>}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <RelatedPosts
          readBefore={resolve(post.frontmatter.readBefore)}
          readAfter={resolve(post.frontmatter.readAfter)}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        category
        tag
        slug
        readBefore
        readAfter
        featuredImage {
          childImageSharp {
            gatsbyImageData(height:400)
          }
        }
      }
    }
    allMarkdownRemark {
      nodes {
        frontmatter {
          slug
          title
          category
        }
      }
    }
  }
`

export default PostTemplate
