import React, { useEffect } from "react"
import { PageProps } from "gatsby"

import * as classes from "./style.module.css"
import { Layout } from "../../components/layout/layout"
import Skill from "../../components/about/skill"

const Index: React.FC<PageProps> = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_item', {
        items: [{
          item_id: 'about',
          item_name: 'About Me',
          item_category: 'Profile',
        }]
      });
    }
  }, []);

  const dataEngineerSkills = ["Hadoop Ecosystem", "Hbase", "Java8", "Jenkins", "Spring", "SpringBoot", "VueJs", "Puppeteer", "Ansible"]
  const mlOpsSkills = ["Kubernetes", "Kustomize", "ArgoCD", "Kubeflow", "Airflow", "PyTorch", "Python3", "Rust", "MongoDB", "S3"]
  const backEndSkills = ["Spring ", "SpringBoot", "Jenkins", "Tomcat", "Java8", "Mysql"]
  const frontEndSkills = ["ReactJS", "ES6", "Jquery", "TypeScript", "VueJS", "HTML", "CSS"]
  const Skills = ["Flink", "Kafka", "LangChain"]

  return (
    <Layout>
      <section>
        <div className={classes.About}>
          <h2 className={"font-bold"}>Born to be <span className={"bg-gray-100"}>DataEngineer</span></h2>
          <p className={"mb-10"}>
            데이터를 잘 다루기 위해서 개발을 시작했습니다. <br />
            <span className={"font-bold"}>Web FrontEnd/BackEnd, DataEngineer, MLOps </span>
            직무를 수행하면서 사용자에서 AI 모델까지 데이터 파이프라인을 경험했습니다.
            데이터를 잘 알고 데이터를 잘 활용하여 생활에 유용한 서비스를 만드는 것을
            사명으로 생각하면서 하나씩 쌓아가는 개발자로 성장하고 있습니다.
          </p>

          <Skill job={"DataEngineer"} skills={dataEngineerSkills}>
            <ul>
              <li><span className={"text-indigo-500"}>•</span> 카카오 검색 서비스를 위한 블로그 데이터 수집</li>
              <li><span className={"text-indigo-500"}>•</span> 크롤러 개발 및 유지보수</li>
              <li><span className={"text-indigo-500"}>•</span> 하둡 클러스터와 API 서버 관리 및 모니터링</li>
              <li><span className={"text-indigo-500"}>•</span> 크롤러 운영툴 웹 개발</li>
              <li><span className={"text-indigo-500"}>•</span> 데이터 후처리를 위한 MapReduce 개발</li>
              <li><span className={"text-indigo-500"}>•</span> Hbase 데이터 마이그레이션 작업 및 테이블 설계 </li>
            </ul>
          </Skill>

          <Skill job={"MLOps"} skills={mlOpsSkills}>
            <ul>
              <li><span className={"text-indigo-500"}>•</span> 지식그래프 Name Entity Recognition(NER) / Entity Linking(EL)
                모델 서빙
              </li>
              <li><span className={"text-indigo-500"}>•</span> NER / EL 학습 파이프라인 개발</li>
            </ul>
          </Skill>

          <Skill job={"BackEnd"} skills={backEndSkills}>
            <ul>
              <li><span className={"text-indigo-500"}>•</span> AI 면접 백앤드</li>
              <li><span className={"text-indigo-500"}>•</span> 채용 사이트 웹 솔루션 백앤드</li>
              <li><span className={"text-indigo-500"}>•</span> MariaDB 데이터 마이그레이션 / Query 튜닝</li>
            </ul>
          </Skill>

          <Skill job={"FrontEnd"} skills={frontEndSkills}>
            <ul>
              <li><span className={"text-indigo-500"}>•</span> AI 면접 프론트</li>
              <li><span className={"text-indigo-500"}>•</span> 채용 사이트 웹 솔루션 프론트</li>
              <li><span className={"text-indigo-500"}>•</span> 다국어 작업</li>
            </ul>
          </Skill>

          <Skill job={"관심 기술"} skills={Skills}>
            <ul>
              <li><span className={"text-indigo-500"}>•</span> 데이터 스트리밍 - Flink, Kafka</li>
              <li><span className={"text-indigo-500"}>•</span> 분산처리</li>
              <li><span className={"text-indigo-500"}>•</span> AI 서비스</li>
              <li><span className={"text-indigo-500"}>•</span> 고양이</li>
            </ul>
          </Skill>

        </div>
      </section>
    </Layout>
  )
}

export default Index