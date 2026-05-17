import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

import { Layout } from "../../components/layout/layout"

deckDeckGoHighlightElement();

interface PostData {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string
      date: string
      slug: string
      featuredImage?: {
        childImageSharp?: {
          gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData
        }
      }
    }
  }
}

const PostTemplate: React.FC<PageProps<PostData>> = ({ data }) => {
  const post = data.markdownRemark
  let featuredImg = getImage(post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData ?? null)
  return (
    <Layout>
      <div className={"Blog markdown"}>
        <h1 className={"text-3xl"}>{post.frontmatter.title}</h1>
        <p className={"mb-2 text-gray-400"}>{post.frontmatter.date}</p>
        <div className={"text-center mt-8 mb-14"}>
          {featuredImg && <GatsbyImage image={featuredImg} alt={"entrance"}/>}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
        tag
        slug
        featuredImage {
          childImageSharp {
            gatsbyImageData(height:400)
          }
        }
      }
    }
  }
`

export default PostTemplate