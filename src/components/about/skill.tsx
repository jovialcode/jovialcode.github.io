import React, { ReactNode } from "react"
import * as classes from './skill.module.css';

interface SkillProps {
  job: string;
  skills: string[];
  children: ReactNode
}

export const Skill = ({ job, skills, children }: SkillProps) => {
  return (
    <div className={"bg-gray-50 px-4 py-5 mb-4 shadow-sm"}>
      <h4 className={"m-0"}>{job}</h4>
      <div className={"px-3"}>
        <SkillTags skills={skills}/>
        <SkillDescription>
          {children}
        </SkillDescription>
      </div>
    </div>
  );
}

export default Skill;

const SkillDescription = ({children}: {children: ReactNode}) => {
  return (
    <div className={"mt-1"}>
      {children}
    </div>
  );
}


interface SkillsProps {
  skills: string[]
}

const SkillTags = (props: SkillsProps): React.ReactElement => {
  const skills = props.skills;
  return (
    <ul className={"my-3"}>
      {
        skills.map(skill => {
          return <li key={skill} className={`text-white ${classes.SkillTag} inline-block mr-2 my-1 px-2 border rounded-2xl border-black`}>{skill}</li>
        })
      }
    </ul>
  );
}