import React, { useEffect } from "react"
import { PageProps } from "gatsby"

import * as classes from "./style.module.css"
import { Layout } from "../../components/layout/layout"

interface Project {
  title: string
  role: string
  skills: string[]
  items: string[]
}

interface Company {
  name: string
  period: string
  duration: string
  role: string
  projects: Project[]
}

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

  const companies: Company[] = [
    {
      name: "주식회사크리스비",
      period: "2024.12 - 재직중",
      duration: "1년 6개월",
      role: "백엔드 팀장",
      projects: [
        {
          title: "SCM 관리 SaaS",
          role: "백엔드 팀장",
          skills: ["Django", "Ninja", "DDD", "Playwright", "Prefect", "Python"],
          items: [
            "Django + Ninja 기반으로 DDD 설계 및 고객사 3사 유치",
            "Playwright로 입출고·재고 데이터 수집 파이프라인 개발",
            "Prefect 기반 멀티 테넌트 동적 파이프라인 개발",
            "재고관리, S&OP 분석 RESTful API 및 차트 개발",
          ],
        },
        {
          title: "광고·매출 데이터 Lakehouse 설계",
          role: "Data Engineer",
          skills: ["AWS S3 Tables", "Apache Doris", "Polars", "DuckDB"],
          items: [
            "AWS S3 Tables + Doris + Polars 기반 Lakehouse 설계",
            "DuckDB + Polars 조합 성능 비교 테스트",
          ],
        },
        {
          title: "Tips AI 과제",
          role: "AI Engineer 팀장",
          skills: ["BART", "LLM", "LSTM", "Python", "MCP"],
          items: [
            "facebook/bart-large-mnli + LLM 기반 상품 오토라벨링",
            "LSTM + LLM 기반 비정상 매출 마케팅 분석",
            "다중 회귀 판매수량 예측 모델 / MCP 기반 경영 성과 분석",
          ],
        },
        {
          title: "AWS 인프라 구축",
          role: "Ops",
          skills: ["AWS", "VPC", "GitHub Actions", "CodeDeploy"],
          items: [
            "public / private / private-db 서브넷 구성 (보안 인증 구조)",
            "GitHub Actions → CodeDeploy CI/CD 구성",
          ],
        },
      ],
    },
    {
      name: "빅웨이브로보틱스주식회사",
      period: "2024.07 - 2024.11",
      duration: "5개월",
      role: "데이터 엔지니어",
      projects: [
        {
          title: "초거대 AI 정부 과제 데이터 파이프라인",
          role: "데이터 엔지니어",
          skills: ["Airflow", "Python"],
          items: [
            "Airflow 환경에서 데이터 정제·가공·통계·검증 파이프라인 개발",
          ],
        },
        {
          title: "Airflow 구축 및 운영",
          role: "데이터 엔지니어",
          skills: ["AWS", "Airflow", "Docker", "GitHub Actions", "CodeDeploy"],
          items: [
            "AWS VPC + EC2 Docker Compose 기반 Airflow 환경 구축",
            "GitHub Actions → CodeDeploy 파이프라인 배포 자동화",
          ],
        },
      ],
    },
    {
      name: "카카오엔터프라이즈",
      period: "2020.12 - 2023.08",
      duration: "2년 9개월",
      role: "데이터 엔지니어",
      projects: [
        {
          title: "데이터 전처리 파이프라인",
          role: "데이터 엔지니어",
          skills: ["Kubernetes", "Airflow", "Spark", "DVC", "Hadoop"],
          items: [
            "Hadoop → Spark Job → Sink 파이프라인 개발",
            "영화 추천 모델용 일별 데이터 배치 처리 및 DVC 버전 관리",
          ],
        },
        {
          title: "NLP 모델 학습 및 서빙 파이프라인 구축",
          role: "데이터 엔지니어",
          skills: ["Kubeflow", "PyTorch", "BERT", "ArgoCD", "TorchServe", "S3"],
          items: [
            "Kubeflow 학습 파이프라인 설계 및 운영",
            "Pretrained BERT + CRF 파인튜닝 파이프라인 개발",
            "S3, ArgoCD, TorchServe로 NER/EL 모델 서빙 환경 구성",
          ],
        },
        {
          title: "지식그래프 Subgraph API",
          role: "데이터 엔지니어",
          skills: ["Rust"],
          items: [
            "Rust로 지식그래프 Entity 관리 API 서버 개발",
          ],
        },
        {
          title: "블로그 크롤러 및 운영툴",
          role: "데이터 엔지니어",
          skills: ["Hadoop", "HBase", "Java", "Spring Boot", "VueJS", "Puppeteer"],
          items: [
            "90대 Hadoop 클러스터 운영 (800TB), 신규 장비 102대 구축 및 HBase 마이그레이션",
            "네이버 블로그·포스트·이글루스 수집, MapReduce 데이터 처리",
            "Puppeteer + NodeJS 기반 웹페이지 렌더러 개발 (Object Pool 패턴)",
            "VueJS 기반 크롤러 운영 Admin 개발 (HBase CRUD, JWT 인증)",
          ],
        },
      ],
    },
    {
      name: "마이다스아이티",
      period: "2019.01 - 2020.11",
      duration: "1년 10개월",
      role: "웹 개발 풀스택",
      projects: [
        {
          title: "AI 면접 백엔드 / 잡플렉스 프론트",
          role: "웹 개발 풀스택",
          skills: ["Java", "Spring Framework", "MariaDB", "ReactJS", "MobX"],
          items: [
            "AI 면접 결과 데이터 처리 및 MariaDB 마이그레이션 / MySQL 튜닝",
            "ReactJS / MobX 기반 잡플렉스 프론트 개발 및 AI 면접 튜토리얼 게임 개발",
          ],
        },
        {
          title: "AI 면접 프론트 / 채용 솔루션",
          role: "웹 개발 풀스택",
          skills: ["JavaScript", "i18n"],
          items: [
            "AI 면접 프론트 개발 및 유지보수",
            "채용 솔루션 유지보수 및 신규 기능 개발",
            "일본 서비스 다국어 처리 (Serge 운영)",
          ],
        },
      ],
    },
    {
      name: "주식회사 케이티알파",
      period: "2017.01 - 2018.08",
      duration: "1년 8개월",
      role: "웹 개발 풀스택",
      projects: [
        {
          title: "통계 대시보드 / 관리자 사이트 개발",
          role: "웹 개발 풀스택",
          skills: ["MariaDB", "JavaScript"],
          items: [
            "Skylife 시청 통계 데이터 시각화 및 엑셀 다운로드",
            "콜 센터 CS 유형별 관리자 사이트 개발",
          ],
        },
      ],
    },
  ]

  return (
    <Layout>
      <section>
        <div className={classes.About}>
          <h2 className={"font-bold"}>I like it. <span className={"bg-gray-100"}>Data Engineer</span></h2>
          <p className={"mb-10"}>

          </p>

          <h3 className={"font-bold mb-4"}>경력</h3>

          {companies.map((company) => (
            <div key={company.name} className={"bg-gray-50 px-4 py-4 mb-4 shadow-sm"}>
              {/* 회사 헤더 */}
              <div className={"mb-1"}>
                <h4 className={"m-0 font-bold"}>{company.name}</h4>
              </div>
              <span className={"inline-block mb-3 text-xs text-indigo-500 border border-indigo-200 bg-indigo-50 px-2 py-0.5 rounded-full"}>
                {company.role}
              </span>

              {/* 프로젝트 카드 목록 */}
              <div>
                {company.projects.map((project, i) => (
                  <div
                    key={project.title}
                    className={`bg-white rounded px-3 py-3 ${i < company.projects.length - 1 ? "mb-2" : ""}`}
                  >
                    <p className={"font-semibold m-0 mb-2"}>{project.title}</p>

                    {project.skills.length > 0 && (
                      <div className={"flex flex-wrap gap-1 mb-2"}>
                        {project.skills.map((s) => (
                          <span key={s} className={"text-white px-2 py-0.5 bg-indigo-400 rounded-2xl text-xs border border-black"}>
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.items.length > 0 && (
                      <div className={"mt-1"}>
                        {project.items.map((item) => (
                          <div key={item} className={"text-sm text-gray-600"}>
                            <span className={"text-indigo-400"}>•</span> {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default Index
