import * as React from "react"
import { useEffect } from "react"
import type { PageProps } from "gatsby"

import { Layout } from "../components/layout/layout"
import Project from "../components/playground/project"
import { StaticImage } from "gatsby-plugin-image"

const speaksALotGif = '/images/playground/speaksalot.gif'
const vocaWorldGif = '/images/playground/voca_world.gif'
import algoProfilePng from '../static/images/playground/algorithm_profile.png'
import crawlerPng from '../static/images/playground/crawler.png'

const Index: React.FC<PageProps> = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_item_list', {
        item_list_id: 'home',
        item_list_name: 'Home Page / Projects',
      });
    }
  }, []);

  return (
    <Layout>
      <section>
        <h2>Playground</h2>
        <div className={"grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6"}>

          <Project title={"Speaksalot"} tags={["gpt-3.5", "python3", "reactJS", "fastAPI"]}>
            <div className={"flex flex-col items-center"}>
              <a className={"block relative"} href={"https://speaksalot.com"} target={"_blank"}>
                <img className={"absolute top-2.5 left-1"} width={190} src={speaksALotGif} alt={"project"}/>
                <StaticImage width={200} src={"../static/images/phone.png"} alt={"project"}/>
              </a>

              <p className={"mt-3"}>
                - GPT와 음성을 활용하여 영어 회화 공부<br/>
                - STT / TTS / Prompt를 활용하여 AI가 Follow Up Question을 제공 <br/>
              </p>
            </div>
          </Project>

          <Project title={"Crawler"} tags={["java", "multi-threading", "kafka", "mysql", "flink", "mongoDB", "event-driven", "reactJS"]}>
            <div className={"flex flex-col"}>
              <a className={"block relative"} href={"https://cat-fir-acd.notion.site/Crawler-86f26ec8976f4b0dad62cef902df4977"} target={"_blank"}>
                <img className={"absolute top-20 left-1"} width={190} src={crawlerPng} alt={"project"}/>
                <StaticImage width={200} src={"../static/images/phone.png"} alt={"project"}/>
              </a>
              <p className={"mt-3"}>
                - 필요한 각종 데이터를 수집 <br/>
                - 스트리밍 데이터 처리 <br/>
                - kafka, flink 실습 <br/>
              </p>
            </div>
          </Project>

          <Project title={"VocaWorld"} tags={["reactJS", "StyledComponent", "Typescript"]}>
            <div className={"flex flex-col"}>
              <a className={"block relative"} href={"https://github.com/jovialcode/voca-world"} target={"_blank"}>
                <img className={"absolute top-20 left-1"} width={190} src={vocaWorldGif} alt={"project"}/>
                <StaticImage width={200} src={"../static/images/phone.png"} alt={"project"}/>
              </a>
              <p className={"mt-3"}>
                - 영어 단어 공부 <br/>
                - SPA에서 Scene 동적 생성<br/>
              </p>
            </div>
          </Project>

          <Project title={"Algorithm"} tags={["java"]} image={"../../static/images/playground/algorithm_profile.png"}>
            <div className={"flex flex-col"}>
              <a className={"block relative"} href={"https://www.acmicpc.net/user/zealtez"} target={"_blank"}>
                <img className={"absolute top-2 left-1"} width={190} src={algoProfilePng} alt={"project"}/>
                <StaticImage width={200} src={"../static/images/phone.png"} alt={"project"}/>
              </a>

              <p className={"mt-3"}>
                - leetcode <br/>
                - baekjoon <br/>
              </p>
            </div>
          </Project>
        </div>
      </section>
    </Layout>
  )
}

export default Index