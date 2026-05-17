import * as React from "react"
import { ReactNode } from "react"

import *  as classes from './project.module.css'

interface ProjectProps{
  title: string;
  image?: string;
  tags: string[]
  children: ReactNode;
}

const Project = ({title, image, tags, children} : ProjectProps) => {
  return (
    <div className={"h-auto scroll-auto"}>
      <div className={"flex items-center bg-black border rounded-t-2xl px-2 h-7"}>
        <span className={`${classes.circle} ${classes.yellow}`}/>
        <span className={`${classes.circle} ${classes.blue}`}/>
        <span className={`${classes.circle} ${classes.red}`}/>
      </div>
      <div className={"border p-4 rounded-b-2xl flex flex-col items-center"}>
        <h4 className={"m-0"}>{title}</h4>
        <div className={"relative my-5"}>
          {children}
        </div>
      <Skill tags={tags}/>
      </div>
    </div>
  );
}

export default Project;

const Skill: React.FC<{tags: string[]}> = ({tags}) => {
  return (
    <ul>
      {
        tags.map(tag =>
          <li className={"inline-block bg-pink-50 mr-2 mb-2 rounded-2xl px-2"} key={tag}>
            {tag}
          </li>)
      }
    </ul>
  );
}
