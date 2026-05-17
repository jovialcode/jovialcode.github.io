import React from "react"
import Colors from "../../utils/colors"
import * as classes from "./tags.module.css"

export const Tags = ({ tags }: { tags: string[] }): React.ReactElement => {
  const { getTextColor } = Colors

  return (
    <div className={classes.Tags}>
      {tags.map((tag: string, index: number) => {
        const backgroundColor = getTextColor(tag)
        return (
          <span
            key={index}
            className={classes.Tag}
            style={{ backgroundColor}}
          >
            {tag}
          </span>
        )
      })}
    </div>
  )
}
