-- ============================================================
-- 05_evaluation_seed.sql
-- 2025 정기 인사평가 시드 데이터
-- ============================================================

-- 사이클 ID: 7721bd1f-38b1-4a77-84c3-be025fcca4aa

BEGIN;

-- 1. 평가 사이클
INSERT INTO evaluation_cycles (id, title, year, status)
VALUES ('7721bd1f-38b1-4a77-84c3-be025fcca4aa', '2025 정기 인사평가', 2025, 'active');

-- 2. 직원 평가 (employee_evaluations)
-- 형식: id, cycle_id, full_name, department, job_title, tenure_years,
--       salary_prev, score_self, score_peer, score_upper, score_prev_year,
--       score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes

INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '8c959895-7a67-4e62-9a16-14f7c6d71e99', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '조광재', '띵스파이어', '대표이사', 9.0, 12624,
  NULL, NULL, NULL, NULL,
  NULL, NULL, FALSE, 'pending', NULL
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '96940f30-bb3b-44d5-ac02-a553e3726882', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '김철', '미국지사', '지사장/센터장', 5.2, 10004,
  NULL, NULL, NULL, 92.0,
  NULL, NULL, FALSE, 'pending', NULL
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'be9f7e23-2888-4c3d-b5ce-cb8e94fa4d7e', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '박진우', '개발그룹(가칭)', '전무(CTO)', NULL, 12720,
  NULL, NULL, NULL, NULL,
  NULL, NULL, FALSE, 'pending', NULL
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '4daf97f0-2be5-4d6d-994a-515289573071', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '노진희', 'CTO 직속', '책임', 1.8, 6492,
  86.0, NULL, NULL, 81.0,
  86.0, 'D', TRUE, 'confirmed', '업무 생산성 향상을 위한 전사 구독 소프트웨어 운영 개선 추진 (비용 검토 및 대안 분석)  서버실 재구축 공사 추진 (견적 검토 및 구축 방안 제시)  전사 구독 소프트웨어 관리(정책 및 계정 관리)  전사 서버 인프라 운영 및 관리 (보안, 네트워크, 서버)  정부 보안 소프트웨어 자금지원 사업 검토 및 진행 ISO27001 보안 인증 검토 및 인증 획득  산단 DR 프로젝트 서버 인프라 구축 및 풀스택 개발 sLLM 프로젝트 인프라 구축 및 데이터 수집 개발'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '72ab7f58-8272-4e50-b158-9923a9474fe2', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '허수영', 'CTO 직속', '연구원', 0.3, 5600,
  NULL, NULL, NULL, NULL,
  NULL, NULL, FALSE, 'pending', '추후 평가 예정'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '16e43655-ce89-4f78-ac92-1b2f76197321', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '정용후', 'CTO 직속', 'SW엔지니어', 3.8, 7801,
  NULL, NULL, NULL, 90.0,
  NULL, NULL, FALSE, 'pending', NULL
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'f4511a97-750c-4705-82a2-9eab43226262', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '이진호', '에너지플랫폼개발팀', '팀장', 4.0, 7627,
  68.0, NULL, 85.0, 89.0,
  85.0, 'B', TRUE, 'confirmed', '- SEP 프로젝트 산단 에너지관리시스템 구축 (3차년도) - CEMS 프로젝트 산단 에너지관리시스템 구축(3차년도) - 현대일렉트릭 청주신공장 에너지관리시스템 구축 - 생태공장 구축 프로젝트 - SEP/ CEMS 유지보수 업무 수행'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '64b3d868-b591-4491-9d6c-8c56c72e93d4', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '조성진', '에너지플랫폼개발팀', 'SW엔지니어', 3.1, 4046,
  93.0, NULL, NULL, 83.0,
  92.0, 'B', TRUE, 'confirmed', 'SEP,CEMS 개발 - 헤더 리뉴얼 개발 - 내 정보 관리 신규 개발 - CEMS 챗봇 개발 - EnergyNote 리뉴얼 개발(피크관리가이드, 공정 그룹 등) - 청주 VIP 신규 개발(설비현황대시보드,전기요금절감대시보드) - 공통(사진 업로드, PDF 다운로드 개발, 엑셀 다운로드 개발) - 다국어 작업(EnergyNote, EnviNote) - 천안, 대불 산단 운영 업무(수용가,설비 등록, 파워플래너 연계, 데이터 추출 등) - 테스트 코드 작성(DashBoard, EnergyNote, FacilityNote, CarbonNote, PolicyNote 파트) - 이 외 수정 및 개선 요청 사항 대응 141건 (Jira 티켓 기준)'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '김선경', '에너지플랫폼개발팀', '선임', 1.4, 5520,
  93.0, NULL, NULL, 94.0,
  93.0, 'B', TRUE, 'confirmed', '권한별 컴포넌트&API 제어 설계  VIP 대시보드 개발  회원 가입&탈퇴 기능 개발  현대 보안가이드 적용  구글 애널리틱스 적용  프론트엔드 Playwright 테스트 도입  기타 유지보수 및 운영업무'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '변성은', '에너지플랫폼개발팀', 'SW엔지니어', 0.4, 3420,
  91.0, NULL, NULL, NULL,
  91.0, 'B', TRUE, 'confirmed', '신규 플랫폼(청주 공장) 기능 구축 - 회원가입, VIP 화면, 권한 관리 등 개발  CEMS 시스템 고도화 및 안정성 강화 - 수용가 통계 및 데이터랩 기능 개선 및 오류 수정 - 계정 관리 등 신규 페이지 구축  운영 이슈 대응 및 데이터 지원 - 데이터 등록/추출 등 요청 건에 대한 처리  sllm 프로젝트 참여 - rag 개발 및 vector db 구축'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '송태근', '탄소플랫폼개발팀', 'SW엔지니어', 1.7, 4224,
  106.0, NULL, NULL, 107.0,
  106.0, 'A', TRUE, 'confirmed', '1. Carbonscope - 기획 및 협의 및 일정조율 - V2.1 설계 및 Full stack 개발 (V2.0 대비 전체 기능 고도화, EEIO 프로세스 고도화) - ESG 레포트(GRI) 설계 및 상세조회, 질문지 Back end 개발 2. HDE Carbonnote - HDE Carbonnote 시스템 구축 - HDE AWS 인프라 설치 및 배포 방식 규격화 - VIP Dasahboard 기능 구축 3. BackOffice - 템플릿 구성관리 전체 고도화 - 강태원 이사님 피드백 단독 대응 - 번역관리, 회원관리 등 추가 메뉴 작업 4. API Carbonscope - 고도화되는 Carbonscope V2.1에 대응하여 관련 API 전체 고도화 - API Carbonscope에 해당하는 메뉴 고도화 - TOC API 유지보수  - 탄소플랫폼 개발팀 팀장의 부재로 타 부서(탄소사업부, 강태원이사님, cems 기획 / 개발팀)와의 협의 및 개발 일정 관리 전반을 주도 - 서비스 안정성 강화를 위해 모니터링 관련 기술 도입 검토 및 적용 주도 - 신규 기능 설계 및 개발 방향 정의 수행 - 신규 입사자 멘토–멘티 역할 수행, 업무 온보딩 및 기술 전수 담당'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'df356b9d-d1eb-453c-b799-29ec7d4978fc', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '최선하', '탄소플랫폼개발팀', 'SW엔지니어', 3.4, 4158,
  104.0, NULL, NULL, 95.0,
  104.0, 'B', TRUE, 'confirmed', 'GRI 인증 요구사항에 부합하는 ESG 보고서 개발 과정에서는 정형화된 초기 요구사항이나 명확한 화면 설계가 없는 상태에서 개발을 시작해야 했습니다. 구현에 앞서 사업부와 지속적인 논의를 통해 공통 화면을 함께 기획하며 GRI 보고서의 전체 입력 흐름과 사용자 경험을 정의하는 데 주도적으로 참여했습니다. 사용자가 선택한 공시 번호에 따라 연관된 질문들이 자동으로 생성되도록 로직과 데이터 구조를 리드하여 설계하고 개발했으며, 복잡한 GRI 기준을 사용자가 단계적으로 이해하고 입력할 수 있도록 개선했습니다. GRI에만 한정되지 않고 IFRS, SASB 등 타 ESG 프레임워크가 추가되더라도 확장 가능하도록 설계하였으며, 기존 데이터를 기반으로 사용자가 점진적으로 입력을 이어갈 수 있도록 구성했습니다. 이를 통해 향후 기준 변경이나 기획 수정이 발생하더라도 코드 수정 범위를 최소화하며 대응할 수 있는 구조적 기반을 마련했습니다.    운영 효율성과 서비스 확장을 최우선으로 고려하여, 초기 단계부터 멀티테넌트 구조를 전제로 한 설계를 리드하고 개발했습니다. 테넌트별 데이터 격리 방식, 권한 및 설정 관리 구조를 정의하고, 신규 고객 가입 시 DB 마이그레이션 자동화를 도입함으로써 향후 고객 증가 및 데이터 급증 상황에서도 코드 변경 없이 안정적인 서비스를 제공하며 확장 가능한 구조를 설계했습니다. 해당 설계는 현재 카본스코프의 기본 구조로 활용 될 예정입니다. 공통 도메인과 테넌트 종속 영역을 명확히 분리하여, 신규 테넌트 온보딩 시 발생할 수 있는 개발 및 운영 부담을 최소화하고 온보딩 비용과 리스크를 줄일 수 있는 구조적 기반을 마련했습니다. 해당 구조에 대한 이해도를 팀 전체로 확산시키기 위해 개발자 대상 내부 세미나를 진행하였으며, 멀티테넌트 설계 배경, 적용 방식, 확장 전략, 운영 시 유의사항 및 실제 코드 구조를 공유했습니다. 이를 통해 개발팀 내 멀티테넌트 구조와 트랜잭션에 대한 공통 이해도를 끌어올리고 이후 관련 기능 개발 시 일관된 기준을 적용할 수 있도록 기여했습니다.   기존 CMS 구조에서의 한계를 분석하여 단순 기능 개선이 아닌 확장 가능한 플랫폼 구조로의 전환을 목표로 개발을 수행했습니다. 기존 구조에서는 신규 도메인 추가 시 코드 결합도가 빠르게 증가하고, 기능 확장에 따른 유지보수 부담이 커지는 문제가 있었습니다. 이에 배출활동, 자체시설, 사업장 트리 구조, 사업장별 보고서, Scope 1·2 배출량 산정 및 산정 내역, 계정 관리 등 플랫폼의 핵심 도메인을 기준으로 구조를 재정비하고, 각 도메인이 독립적으로 확장될 수 있도록 FE/BE 개발을 진행했습니다. V2 확장 과정에서는 사업장 수 증가에 따라 사업장 간 결합도 증가로 인한 구조적 한계가 예상되어, 연관 사업장 간 배출 퍼센트 영향도를 유연하게 반영할 수 있도록 데이터 흐름과 로직 구조를 재설계했습니다. 이를 통해 사업장 구조 변경이나 추가 시에도 기존 로직 수정 없이 대응할 수 있는 기반을 마련했습니다. 반복적으로 사용되던 보일러플레이트 코드를 리팩토링하여 신규 요구사항 대응 시 기존 코드 수정 범위를 최소화할 수 있는 구조를 확보하였고, 그 결과 기능 추가 속도와 유지보수 효율을 전반적으로 개선할 수 있었습니다.'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '김선민', '탄소플랫폼개발팀', 'SW엔지니어', 0.4, 3420,
  92.0, NULL, NULL, NULL,
  92.0, 'B', TRUE, 'confirmed', '플랫폼 전체 다국어 번역 작업 수행(약 800여 개 문구 전환)  GRI 인증 대응을 위한 성과관리 페이지 1개 및 컴포넌트 2개 신규 구축 등 인증 요건 충족 지원  Jira 기반 이슈 관리 및 처리(총 167건)  TFT팀 참여를 통한 사내 챗봇 LLM 개발 지원  자동 로그아웃 기능 등 현대 서비스 요구사항에 따른 핵심 기능 반영  Scope 1·2 및 산정내역 조회 기능 성능 개선'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'fe744bd8-3d31-4b4d-aac5-2133bd714706', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '강대윤', '솔루션개발팀', '팀장', 4.3, 7572,
  84.0, NULL, 91.0, 92.0,
  90.0, 'B', TRUE, 'confirmed', 'SKB 고도화,VUP,산단DR,SLLM TF,광주온실가스 프로젝트들을 문제없이 수행함'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'c6a23c8a-b600-4411-9124-733aecfcb68b', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '김준', '솔루션개발팀', '책임', 3.5, 5584,
  85.0, NULL, NULL, 95.0,
  85.0, 'B', TRUE, 'confirmed', '25.01~25.12 SK Broadband ADAMS 운영  - CASS고도화 운영 적용 대응 및 후속조치  - 데이터분석 개선 작업  - RMS, TEAMS 장애연동 개선 작업'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '393633e4-b643-42c3-a7d1-61118d669025', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '박대신', '솔루션개발팀', '선임', 1.2, 4320,
  98.0, NULL, NULL, NULL,
  98.0, 'A', TRUE, 'confirmed', '(2025년 1월 ~ 진행중) - VUP 프로젝트 1. 화면 개발 및 유지보수 2. 수동 배포를 자동 배포 파이프라인으로 전환(단독 구축)하여 운영 효율 개선 3. 손지은 책임 공석 대체  (2025년 1월 ~ 2025년 2월) - PMC (프로젝트 모니터링 센터) 프로젝트 1. 갈월랩 출입구 앞 대시보드 개발 2. 개발시 퍼블리싱 작업 제외 f/e, b/e 단독 개발  (2025년 4월 ~ 진행중) - 산단 DR 프로젝트 1. 사업부와 기획 협의 및 일정 조율 2. 프로젝트 구축 및 인프라 구축 3. 프로젝트 개발 진행 리드  (2025년 8월 ~ 진행중) - 광주 온실가스 프로젝트 1. "박준영"님이 담당했던 프로젝트 유지보수 진행 2. 담당자와 기획 협의 및 일정 조율  (2025년 12월 ~ 진행중) - 탄소플랫폼 GRI 개발 1. GRI 기능 개발에 대하여 f/e 단독 개발 2. 사업부, 백엔드 개발자와 기획 협의  업무 외 활동 : 1. 사내 챗봇 개발 (sllm 프로젝트 / 2025년 8월 ~ 2025년 11월) 2. 회사 지원 교육 참여 (각 종 교육 프로그램) 3. 세미나 진행 (llm 소개, 효율적인 프로젝트 구축) 4. 팀 내 이슈 및 지식 공유 진행 중'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '90dd5780-c353-4fbb-aa8d-eb893982b418', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '김경륜', '솔루션개발팀', 'SW엔지니어', 0.6, 3600,
  103.0, NULL, NULL, NULL,
  103.0, 'A', TRUE, 'confirmed', '창신 INC 파견  산단DR  VUP'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'dcdf6cf0-c814-49ab-b6b5-a6c6b9d0ac62', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '홍기문', '솔루션개발팀', '사원', 0.1, 3420,
  NULL, NULL, NULL, NULL,
  NULL, NULL, FALSE, 'pending', NULL
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'efee75cd-5ee4-492f-9272-283a320f1bff', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '손지은', '육아휴직', '책임', 6.4, 5088,
  NULL, NULL, NULL, 92.0,
  NULL, NULL, FALSE, 'pending', NULL
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'cf1b5f60-1844-443e-b58f-117c7fc339a6', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '신봉조', '에너지플랫폼 사업부', '상무(사업부장)', 7.0, 10131,
  101.0, NULL, NULL, 102.0,
  101.0, NULL, FALSE, 'reviewing', '2025년에도 주요 과제를 중심으로 회사의 목표 달성을 위해 기획과 실행을 병행하였습니다. VUP 사업은 컨소시엄 내 데이터 플랫폼 역할을 수행하며 안정적으로 마무리하였으며, 현재 최종평가를 준비 중입니다. 산단DR 과제는 주관기관 및 참여기관들과의 협업 속에서 긍정적인 평가를 받으며 원활히 수행되고 있습니다. 현대일렉트릭 청주신공장 사업은 사업부 차원에서 대응하여 성과를 달성하였으며, 포항 수소도시 사업은 사업계획 단계부터 참여하여 수주에 기여하였습니다. 또한, 현대 풍력사업 제안과 사우디 알와디 스마트시티 사업계획서 작성 등을 통해 향후 사업 가능성을 검토하는 수준의 시도를 병행하였습니다.'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '7caf886f-d9d6-4c51-8293-2b0481cd826a', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '이정용', '에너지플랫폼 사업팀', '팀장', 2.9, 8714,
  87.0, NULL, 81.0, 91.0,
  78.0, 'D', TRUE, 'confirmed', '1. SEP(부울군) 3차년도 최종평가 / CEMS(5대산단) 구축 / 생태공장 / HD현대일렉트릭 청주신공장 배전사업 관련 서비스 개발 및 구축, SEP 사업 기획을 통한 사업 용역 매출 및 참여사 비용 창출 기여 - 현대E 용역 매출 기반으로 부울군 SEP 용역 개발 및 부울군 최종 평가 대응 - 5대산단 CEMS 과제 구축, 26년 6월까지 연장 ※ 향후 구현된 CEMS 노하우 및 완성도를 통한 부가 사업 창출 노력이 필요'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'c1a53628-cd98-4d23-890f-78aef7bc5077', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '김영상', '에너지플랫폼 사업팀', '책임', 8.4, 6267,
  107.0, NULL, NULL, 105.0,
  105.0, 'A', TRUE, 'confirmed', '• 특허 2건 출원, 저작권등록 2건 • 신규사업 제안서 6건 (풍력, DR, 동서발전, 사우디, 수소디지털트윈, 지역난방공사) • ESG 보고서 POC 개발 • CEMS LOG 모니터링 개발 • 풍력 POC 개발 • 산단DR 파워플래너 데이터 수집 모니터링POC 개발 • 주파수 데이터 수집 모니터링 POC 개발'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'd738b6ce-e6c5-46a5-9632-6d696ca45125', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '박성희', '에너지플랫폼 사업팀', '1', 3.4, 5116,
  99.0, NULL, NULL, 98.0,
  99.0, 'B', TRUE, 'confirmed', '1. VUP 과제 수행 1) 실증단지(시화/인천/안산) 데이터 분석 2) VUP 공인기관검증 진행(기능정확도 및 API응답속도) - 검증범위 협의 및 시험절차서 작성 - 검증계약 및 검증수행, 결과서 수령 3) 5차년도 최종보고서 작성/보완 및 제출 완료 4) 산출물 작성 및 업데이트 - 플랫폼설계서, 개발가이드 업데이트 - 운영매뉴얼, 현장통합시험계획서, 현장통합시험결과서 작성 5) 진도점검자료 작성(매월) 및 연구노트 작성 6) 개발화면 테스트 수행 및 결과 피드백(개발팀) 7) 시제품 출시 보고서 작성 8) 2025년 성과등록  2. 산단DR 과제 수행 1) 회의자료 작성(착수회의 및 진도점검회의) 및 연구노트 작성 2) 2차년도 연차보고서 작성 완료 3) 에너지거래모델 분석보고서 작성 완료 4) 2025년 성과등록 등 2차년도 사업 종료  3. 에너지플랫폼사업부 수행 과제 사업비 정산 (VUP, CEMS, SEP부울군, SEP TOC, 산단DR) 1) 과제카드 사용내역 지출결의서 작성 및 관련 증빙 준비(사전지출결의서, 회의록, 출장비, 검수확인서 등) 2) 과제 관련 계약품의서 및 구매요청서 작성 및 관련 증빙 준비 3) 사업비 증빙 보완  4. 에너지플랫폼사업부 내 사업 지원 및 행정 1) 사업부 신규사업제안 관련 서류준비 및 행정사항 등록 2) 사업부 법인카드 4개 지출결의서 작성 3) 각종 용역 대금지급 품의 작성 4) 사업부 업무 관련 정책/법규/동향 등 자료 조사 5) 사업부 워크샵 기획 및 진행 등'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '754949c5-21b7-4887-8bcd-fbdcab87753b', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '전소진', '에너지플랫폼 사업팀', '책임', 2.2, 5412,
  97.0, NULL, NULL, 97.0,
  97.0, NULL, FALSE, 'reviewing', 'CEMS 개발/운영 시 협업 담당자 간 커뮤니케이션 - 기획–디자인–개발–운영 간 이슈 정리 및 의사결정 지원 - 고객사 요구사항과 시스템 제약 간 대안 논의를 통한 협업 - 외주/내부 협업 시 요구사항 정제 및 범위 관리 (라익스, 바이코드, 이파피루스)  HDE 청주공장 CEMS 도입 수행 - VIP 신규 화면 기획 - 사업향 추가 기능 개발 건 기획 - 추가 개선 사항 정리 및 후속 기획 지원  CEMS 개발/개선 건 화면 기획 - 공통 컴포넌트/패턴을 고려한 화면 설계 - 기존 서비스 개선과 신규 서비스 기획 병행 수행 - 서비스 간 데이터 흐름을 고려한 화면 구성 기획  문서 기반 CEMS 기획/운영 - 히스토리 추적 가능하도록 지라 티켓 기반 요청 관리 - IA, SB, 수작업건, 기능점검 등 문서화 - 협업사 공유용 기획 자료 정리  CEMS 운영 지원 - 개발/개선 검수, 데이터 이상 확인, 데이터 추출 건 지원 - 데이터 이상/오류 원인 분석 및 관련 부서 협업 조율'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '18bbba1d-8f0a-4889-aeec-f225d1912e11', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '김진호', '탄소플랫폼 사업부', '사업부장(대)', 1.9, 6612,
  83.0, NULL, NULL, 96.0,
  92.0, 'A', TRUE, 'confirmed', '대외적인 정세 불안과 경쟁 심화로 인한 신규 과제 수주 목표 미달성이라는 위기 속에서도, 자사 탄소플랫폼 매출을 발생시켜 독자 생존의 기반을 마련했습니다. 외부 환경 변수로 인해 외형적 성장은 정체되었으나, 플랫폼 기반의 실질적인 매출 기반을 구축함으로써 사업부의 기술 경쟁력과 기초 체력이 유효함을 입증했습니다.'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '6713352c-9105-4bd1-a027-e0580c547afd', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '권용성', '탄소플랫폼 사업팀', '책임', 0.5, 6120,
  85.0, NULL, NULL, NULL,
  82.0, 'B', TRUE, 'confirmed', '수출바우처 테크사업 지원금 협약 체결 (회사 자부담금 제외 3,500만원)  GRI 인증 관련 플랫폼 기능 기획  산단공 주최 대한민국 산업단지 수출박람회 주관  IITP 정부과제 참여'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'eddec2c7-a11f-49ba-be3d-8283ef37ffd2', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '이병훈', 'GTM TF', '리드/TF장', 2.9, NULL,
  110.0, NULL, NULL, NULL,
  0.0, NULL, FALSE, 'reviewing', '평가 대상자 본인은 우리회사 전략 신사업 분야 사업 개발과 수주 신사업 건 PM 역할을 담당하여, 신사업 수주에서 수행경험 내재화로 이어지는 기술사업화 전반의 레퍼런스 확보 목표를 달성 하였습니다.'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '이병하', 'GTM TF', '책임', 1.0, 6600,
  110.0, NULL, NULL, NULL,
  110.0, NULL, FALSE, 'reviewing', '에너지플랫폼사업(부울군, CEMS) PMO 역할 수행  스마트생태공장사업(성도하이텍) 기획 및 수행  (용역)바이트사이즈 1차년도 사업 기획 및 관리  (용역)탄소규제 대응 지원 우선순위 분석 시스템 개발 사업 기획 및 관리  (용역)스마트그린산단 입주기업 에너지 빅데이터 현황 조사 및 TOC+ 고도화 기획 및 관리  정부사업 기획(TOC+, 미래지역에너지생태계활성화(울진), AX 실증산단(울산), 탄소중립산단(부산), 포항수소도시 등)'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '전인지', 'GTM TF', '팀원', 0.2, 5280,
  109.0, NULL, NULL, NULL,
  NULL, NULL, FALSE, 'reviewing', 'SEP TOC 분석데이터 구축(수작업 정제 및 보정)  포항시 수소도시 제안 참여 및 수주  서울/경기권 파트너 관계 관리(에어에너지, 소프트랩, 라임솔루션 등)  IR 준비 지원  부서장 Pre-sales 업무 보조(자료조사 및 문서 작성)  코오롱인더스트리 RFI 영업기회 발굴 및 공유'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'd386956f-8316-4244-855b-9eddda34b3d8', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '남기용', '경영관리실', '실장', -0.1, 9200,
  NULL, NULL, NULL, NULL,
  NULL, NULL, FALSE, 'pending', NULL
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  '886db105-36af-4a39-a267-78bea22194f2', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '원주연', '경영지원팀', '팀장(차장)', 4.1, 6728,
  100.0, NULL, 102.0, 101.0,
  102.0, 'B', TRUE, 'confirmed', '연간 경영지원실의 목표였던 재무 안정성 확보를 위해 소프트웨어공제조합 연 2.5% 대출상품을 발굴하고, 신한은행 일자리창출 대환대출을 통해 기존 대비 약 0.5% 금리 인하를 달성하였습니다. 이를 통해 회사의 금융비용을 절감하고 자금 운용의 효율성을 높이는 성과를 달성하였습니다.'
);
INSERT INTO employee_evaluations (id, cycle_id, full_name, department, job_title, tenure_years, salary_prev, score_self, score_peer, score_upper, score_prev_year, score_ceo_adjusted, grade_ceo, is_confirmed, progress_status, notes) VALUES (
  'b7a6634d-8509-497e-80c2-64bc094ea4aa', '7721bd1f-38b1-4a77-84c3-be025fcca4aa', '김희영', '경영지원팀', '사원', 0.5, 3300,
  96.0, NULL, NULL, NULL,
  90.0, NULL, FALSE, 'reviewing', '[과제] 정부·유관기관 과제 정산 업무 수행, 정산 자료 제출 및 마감 기한 준수  [인증] 청년일자리강소기업 인증 선정  [지원금] 청년일자리도약장려금 2건, WISET 2건, 육아휴직지원금 1건, 일가정양립제도 지원 및 운영  [교육] 법정의무교육 이수율 100% 달성  [회계] 월 결산 및 회계·세무 업무 정기 수행  [급여] 급여·상여 산정 및 지급 업무 수행, 지급 오류 없이 기한 준수'
);

-- 3. 직책자 평가 항목별 점수 (evaluation_scores)
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '81375dd8-c1c6-4605-99db-82bbc3d5f07c', '886db105-36af-4a39-a267-78bea22194f2', '목표달성(25)', 25.0, NULL, 24.0, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '14c5a373-073e-422c-92ed-163b981fb154', '886db105-36af-4a39-a267-78bea22194f2', '업무기여(25)', 23.0, NULL, 23.0, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'eb90186a-83eb-43ae-8d06-da207138b4b1', '886db105-36af-4a39-a267-78bea22194f2', '완성도(10)', 10.0, NULL, 10.0, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '5f2a68af-cd88-49ec-a28b-ca98b541cc63', '886db105-36af-4a39-a267-78bea22194f2', '리더십(25)', 20.0, NULL, 22.0, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '864c7b92-f385-4c5f-9bd2-4ba1ad42c272', '886db105-36af-4a39-a267-78bea22194f2', '성과관리(10)', 9.0, NULL, 9.0, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'e3defdc7-8780-4a67-a04f-ac67a1637363', '886db105-36af-4a39-a267-78bea22194f2', '소통(10)', 9.0, NULL, 9.0, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'eb28ba64-e25b-41fc-9059-a0aad94b79f5', '886db105-36af-4a39-a267-78bea22194f2', '기업관(5)', 4.0, NULL, 5.0, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '25d3c166-d994-4d8e-a919-f73ddad0ae51', 'cf1b5f60-1844-443e-b58f-117c7fc339a6', '목표달성(25)', 21.0, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b6bb585e-b149-4be1-8df1-cf2a5784de6a', 'cf1b5f60-1844-443e-b58f-117c7fc339a6', '업무기여(25)', 22.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '369f62d3-5492-4fce-a9ff-1b9d87792d1a', 'cf1b5f60-1844-443e-b58f-117c7fc339a6', '완성도(10)', 10.0, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '9deff33f-14f8-4c2c-8536-87b2f62b2b7e', 'cf1b5f60-1844-443e-b58f-117c7fc339a6', '리더십(25)', 23.0, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '0be927f6-9ee2-4c12-b76d-ecf1d4f829dc', 'cf1b5f60-1844-443e-b58f-117c7fc339a6', '성과관리(10)', 10.0, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'f4233de9-6ea5-4807-a1ae-c5fd09e2d23c', 'cf1b5f60-1844-443e-b58f-117c7fc339a6', '소통(10)', 10.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'dc372abc-d408-4392-8019-587f68f2083d', 'cf1b5f60-1844-443e-b58f-117c7fc339a6', '기업관(5)', 5.0, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'f399c210-2ea3-4903-a63c-190607bdf7ca', 'fe744bd8-3d31-4b4d-aac5-2133bd714706', '목표달성(25)', 20.0, NULL, 21.0, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '6572fc77-5822-4db9-9df4-da0c49916b3b', 'fe744bd8-3d31-4b4d-aac5-2133bd714706', '업무기여(25)', 18.0, NULL, 20.0, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '470479d1-1874-4c82-94c7-9abb7677b462', 'fe744bd8-3d31-4b4d-aac5-2133bd714706', '완성도(10)', 8.0, NULL, 9.0, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '286aacf9-2d1e-4a07-b3c4-91c892ffd883', 'fe744bd8-3d31-4b4d-aac5-2133bd714706', '리더십(25)', 20.0, NULL, 20.0, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '66f1e4bf-b233-4839-a798-2bb18aa523ae', 'fe744bd8-3d31-4b4d-aac5-2133bd714706', '성과관리(10)', 8.0, NULL, 9.0, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd9feefad-c750-4984-b8d4-56d2b5f3287a', 'fe744bd8-3d31-4b4d-aac5-2133bd714706', '소통(10)', 7.0, NULL, 8.0, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'bb00beb5-6aae-447f-9e29-46d448200c36', 'fe744bd8-3d31-4b4d-aac5-2133bd714706', '기업관(5)', 3.0, NULL, 4.0, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '5b688876-6cec-4823-828f-d65271820114', 'f4511a97-750c-4705-82a2-9eab43226262', '목표달성(25)', 15.0, NULL, 20.0, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'e9fac463-a3ad-496f-b017-a342c227f4cf', 'f4511a97-750c-4705-82a2-9eab43226262', '업무기여(25)', 15.0, NULL, 20.0, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'adc543ce-0acb-4d65-8252-eac99ebe4078', 'f4511a97-750c-4705-82a2-9eab43226262', '완성도(10)', 7.0, NULL, 8.0, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '6fd79624-a449-4ed6-ad75-2433232ca43e', 'f4511a97-750c-4705-82a2-9eab43226262', '리더십(25)', 14.0, NULL, 19.0, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'c7cfb53f-876b-4fed-9315-c8a4c1ad729e', 'f4511a97-750c-4705-82a2-9eab43226262', '성과관리(10)', 7.0, NULL, 7.0, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '5abea9f7-80fe-4b72-afc0-cd49f3cac8f1', 'f4511a97-750c-4705-82a2-9eab43226262', '소통(10)', 7.0, NULL, 8.0, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '37483d62-b50e-4b4b-a8ee-e76eb6e54573', 'f4511a97-750c-4705-82a2-9eab43226262', '기업관(5)', 3.0, NULL, 3.0, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '74704f89-db54-4ba1-8ff1-a8afb98cff55', '18bbba1d-8f0a-4889-aeec-f225d1912e11', '목표달성(25)', 20.0, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '127d274a-acd3-4869-9e48-6241fcc57879', '18bbba1d-8f0a-4889-aeec-f225d1912e11', '업무기여(25)', 19.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd0efb81e-56bd-4050-a720-ac573151fd1a', '18bbba1d-8f0a-4889-aeec-f225d1912e11', '완성도(10)', 10.0, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'bde14f1e-e774-4eb7-aec9-08c0f50fde6a', '18bbba1d-8f0a-4889-aeec-f225d1912e11', '리더십(25)', 17.0, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'afca59cd-e7f0-4e03-89f3-d9aecdbd2173', '18bbba1d-8f0a-4889-aeec-f225d1912e11', '성과관리(10)', 6.0, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '269210ac-1932-4931-99c3-a09a2a1c06e4', '18bbba1d-8f0a-4889-aeec-f225d1912e11', '소통(10)', 8.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '84e9e2ea-b886-4455-8f18-1af61ae37371', '18bbba1d-8f0a-4889-aeec-f225d1912e11', '기업관(5)', 3.0, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'ceac3a60-2d98-454d-a7cb-2fe1fc1c7e92', '7caf886f-d9d6-4c51-8293-2b0481cd826a', '목표달성(25)', 18.0, NULL, 18.0, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '4e6b9834-6cf2-4c29-b70a-00bd370af1cd', '7caf886f-d9d6-4c51-8293-2b0481cd826a', '업무기여(25)', 18.0, NULL, 15.0, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b40931a7-265c-4fbe-9dbd-8786b312240c', '7caf886f-d9d6-4c51-8293-2b0481cd826a', '완성도(10)', 9.0, NULL, 8.0, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'effe1d37-be8a-4506-aeb5-948add345839', '7caf886f-d9d6-4c51-8293-2b0481cd826a', '리더십(25)', 21.0, NULL, 19.0, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '0d6dd068-5b91-4345-81e5-9c16b754fe12', '7caf886f-d9d6-4c51-8293-2b0481cd826a', '성과관리(10)', 9.0, NULL, 9.0, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b0f3467c-0657-47dc-89f8-a19925651be1', '7caf886f-d9d6-4c51-8293-2b0481cd826a', '소통(10)', 9.0, NULL, 8.0, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '2235672d-42eb-4c6e-8ba9-4590c7e1dd4c', '7caf886f-d9d6-4c51-8293-2b0481cd826a', '기업관(5)', 5.0, NULL, 2.0, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '9fbaa812-3869-4a21-b7db-642639e8468c', 'eddec2c7-a11f-49ba-be3d-8283ef37ffd2', '목표달성(25)', 25.0, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b3fee186-0823-4f41-b589-4cd2400676b3', 'eddec2c7-a11f-49ba-be3d-8283ef37ffd2', '업무기여(25)', 25.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '9dafe9e2-7990-4a30-82c8-0f7c3d80b854', 'eddec2c7-a11f-49ba-be3d-8283ef37ffd2', '완성도(10)', 10.0, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '328283d2-dbee-4a30-92f3-b1a967af8e31', 'eddec2c7-a11f-49ba-be3d-8283ef37ffd2', '리더십(25)', 25.0, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '71b6356b-78fc-44f8-aaa8-e143606a363b', 'eddec2c7-a11f-49ba-be3d-8283ef37ffd2', '성과관리(10)', 10.0, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'a772ef49-9671-499f-acc3-e320f93b05d4', 'eddec2c7-a11f-49ba-be3d-8283ef37ffd2', '소통(10)', 10.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'bb1cdecd-7880-45e2-b439-22ff350bbcfc', 'eddec2c7-a11f-49ba-be3d-8283ef37ffd2', '기업관(5)', 5.0, NULL, NULL, 7
);

-- 4. 팀원 평가 항목별 점수 (evaluation_scores)
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '778ca280-1db0-4e8b-8b1b-b81b32647d35', 'c1a53628-cd98-4d23-890f-78aef7bc5077', '근태', 5.0, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '01764425-07e0-4d29-99c3-ade2c5b9c3a3', 'c1a53628-cd98-4d23-890f-78aef7bc5077', '교육', 5.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '90b117fc-b948-4344-8a2e-3729b0f3a449', 'c1a53628-cd98-4d23-890f-78aef7bc5077', '책임감', 5.0, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'fc224e0d-2ab3-437e-92cf-cb7cd231ecc3', 'c1a53628-cd98-4d23-890f-78aef7bc5077', '협조성', 5.0, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'bbb84ea5-aec4-4908-b955-b3e00a9015eb', 'c1a53628-cd98-4d23-890f-78aef7bc5077', '성실성', 5.0, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'ec9916bf-ebb2-4ab7-be6c-95318d2db439', 'c1a53628-cd98-4d23-890f-78aef7bc5077', '판단력', 5.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '27412d60-0b8e-4848-89e4-60a94af793b4', 'c1a53628-cd98-4d23-890f-78aef7bc5077', '기획력', 5.0, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '6bd0a0a5-3314-4f64-a471-4889dffca455', 'c1a53628-cd98-4d23-890f-78aef7bc5077', '전문성', 5.0, NULL, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b43b5e96-0d9b-4982-806f-7db77c5e48a6', 'c1a53628-cd98-4d23-890f-78aef7bc5077', '성과(KPI)', 5.0, NULL, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '728520e6-99db-4a68-a08d-518fc3e92147', 'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '근태', 5.0, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '8d531f13-7ce6-461f-8868-a70944203473', 'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '교육', 5.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '9ae67b39-3e0a-40dc-9321-1dfa7e9fe2d6', 'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '책임감', 5.0, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'ab646daf-2453-4bea-bf57-8fa55254dc7e', 'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '협조성', 5.0, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'db8dd537-bf80-4324-a113-03afc20e6c8c', 'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '성실성', 5.0, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b392b75b-c457-41a2-8f0e-7f3e73c4318f', 'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '판단력', 5.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '3f1b8d9d-dfb8-4166-973c-bb256b14381d', 'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '기획력', 5.0, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'a603aeb8-d550-4f88-90bf-1794efc129be', 'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '전문성', 5.0, NULL, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '826de15c-849b-4357-9de1-be14cc2cfed3', 'b5863577-2e01-44c2-b2bb-d49ad0e6b11f', '성과(KPI)', 5.0, NULL, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '081bf424-0c02-4b5b-9c96-d5578d509191', 'df356b9d-d1eb-453c-b799-29ec7d4978fc', '근태', 5.0, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '00807343-b583-43d7-b089-5b2ef9e7f763', 'df356b9d-d1eb-453c-b799-29ec7d4978fc', '교육', 5.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '366d0ccf-a543-4407-9f41-b425a2eaa8e1', 'df356b9d-d1eb-453c-b799-29ec7d4978fc', '책임감', 5.0, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '21786140-d4c3-4e18-82f5-4e8409a260fa', 'df356b9d-d1eb-453c-b799-29ec7d4978fc', '협조성', 5.0, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '998c4e73-bf30-4e02-87ea-66e4bf7cb8e8', 'df356b9d-d1eb-453c-b799-29ec7d4978fc', '성실성', 5.0, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '1b42ecbe-e6f3-4a7d-8009-5ee819dd1208', 'df356b9d-d1eb-453c-b799-29ec7d4978fc', '판단력', 5.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '5294fbed-4ffa-41a3-9bea-ae19da84653a', 'df356b9d-d1eb-453c-b799-29ec7d4978fc', '기획력', 5.0, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '5446f2d3-6e58-4590-9590-01ef98bc88bb', 'df356b9d-d1eb-453c-b799-29ec7d4978fc', '전문성', 5.0, NULL, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd95000a4-6a3f-4d15-abff-fa911c7393e7', 'df356b9d-d1eb-453c-b799-29ec7d4978fc', '성과(KPI)', 5.0, NULL, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '8c769384-65e6-4bb7-afe9-84d8a7cae9ca', '90dd5780-c353-4fbb-aa8d-eb893982b418', '근태', 5.0, 5.0, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '274d7523-543f-4bc0-882c-b595def01df2', '90dd5780-c353-4fbb-aa8d-eb893982b418', '교육', 5.0, 5.0, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '590f8261-25fe-4450-ad8f-b1ff2d293712', '90dd5780-c353-4fbb-aa8d-eb893982b418', '책임감', 5.0, 4.5, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '4630f06d-d6d7-41de-8f89-2e24013dd4fc', '90dd5780-c353-4fbb-aa8d-eb893982b418', '협조성', 5.0, 5.0, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '05b4be09-7c2a-4f47-81bf-12dc86578efd', '90dd5780-c353-4fbb-aa8d-eb893982b418', '성실성', 5.0, 5.0, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '813d7b6c-8aee-48d1-abe8-1dcac51b9cfd', '90dd5780-c353-4fbb-aa8d-eb893982b418', '판단력', 5.0, 4.5, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '86463b69-4a59-4f17-aabf-54866b5a6797', '90dd5780-c353-4fbb-aa8d-eb893982b418', '기획력', 5.0, 3.5, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '204d6986-9d1b-48ad-a586-379468d9924f', '90dd5780-c353-4fbb-aa8d-eb893982b418', '전문성', 4.5, 4.5, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '6ab6554c-cd7b-44d4-97fd-afad79a8aba6', '90dd5780-c353-4fbb-aa8d-eb893982b418', '성과(KPI)', 5.0, 5.0, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '80aa7770-2f38-4e48-8cea-b1e88d5b7545', '393633e4-b643-42c3-a7d1-61118d669025', '근태', 5.0, 5.0, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '98a2455d-7c46-4a62-9043-31eb0b29af53', '393633e4-b643-42c3-a7d1-61118d669025', '교육', 5.0, 5.0, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '461a8cd8-3b6a-412d-9909-d07e78e3e65a', '393633e4-b643-42c3-a7d1-61118d669025', '책임감', 5.0, 5.0, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '315f9a65-8dbf-4427-acc0-885ad45f7b92', '393633e4-b643-42c3-a7d1-61118d669025', '협조성', 5.0, 4.5, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'c5625479-e079-4717-86db-1df779ddd684', '393633e4-b643-42c3-a7d1-61118d669025', '성실성', 5.0, 5.0, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '7e719659-58f0-4148-8882-6b928d08f0df', '393633e4-b643-42c3-a7d1-61118d669025', '판단력', 5.0, 3.5, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b0597873-f0fb-4f62-9299-78afb1109ca4', '393633e4-b643-42c3-a7d1-61118d669025', '기획력', 5.0, 4.5, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '36018d8e-72da-4dbc-a521-99ed13686592', '393633e4-b643-42c3-a7d1-61118d669025', '전문성', 5.0, 4.5, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '3fddb39d-3fb1-4735-ae3f-bdb6cd74a865', '393633e4-b643-42c3-a7d1-61118d669025', '성과(KPI)', 5.0, 5.0, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'bcbb56cd-69f6-4cdf-a000-646961911746', '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '근태', 5.0, 5.0, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '2f7a6123-93c4-4995-b72b-7dff347813ae', '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '교육', 5.0, 5.0, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'a77f9672-ff15-4cb1-8306-bdf52fc2480f', '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '책임감', 5.0, 5.0, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '823543a1-3d6c-4e6a-8dc1-9dad8087f454', '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '협조성', 5.0, 5.0, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '38bbb619-8d2f-4729-8b19-1e236500053b', '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '성실성', 4.5, 4.5, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'e9d15511-379b-4ee6-b703-84056b7894cd', '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '판단력', 3.5, 4.5, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'a0ce7719-2934-4240-83d9-44608851f158', '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '기획력', 4.5, 4.5, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '912e2de5-9f1d-456b-9640-d81243739933', '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '전문성', 2.5, 3.5, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd015eeba-7c57-4b03-8911-5dbafefbb4eb', '990b98cc-2a8b-45a5-a5f7-8691af8d9e5e', '성과(KPI)', 4.5, 5.0, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'c9ab7a69-c864-4988-9877-1e9d0d48a3ff', '64b3d868-b591-4491-9d6c-8c56c72e93d4', '근태', 5.0, 5.0, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '19073bf4-fdf7-4600-aac1-e7d0953330ce', '64b3d868-b591-4491-9d6c-8c56c72e93d4', '교육', 5.0, 5.0, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'c75de5ca-581b-4cdb-b5fd-711998f5e435', '64b3d868-b591-4491-9d6c-8c56c72e93d4', '책임감', 5.0, 5.0, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b2874ded-9813-46da-9067-c44757cb03b3', '64b3d868-b591-4491-9d6c-8c56c72e93d4', '협조성', 5.0, 4.5, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd78cd7d1-cb90-4e67-9f07-6e338dcd2fe4', '64b3d868-b591-4491-9d6c-8c56c72e93d4', '성실성', 4.5, 4.5, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'c234344c-d19e-4493-96c3-509bb0c8c615', '64b3d868-b591-4491-9d6c-8c56c72e93d4', '판단력', 5.0, 4.5, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '88fe5d1d-26d7-46b3-9bfe-194264ceb509', '64b3d868-b591-4491-9d6c-8c56c72e93d4', '기획력', 5.0, 4.5, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '119ef36d-ef4f-4ef7-ba2a-21e3c00d4b4e', '64b3d868-b591-4491-9d6c-8c56c72e93d4', '전문성', 4.5, 4.5, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '80428724-eaed-4305-be26-1028293d9f66', '64b3d868-b591-4491-9d6c-8c56c72e93d4', '성과(KPI)', 5.0, 4.5, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'f3b8a6c8-e4e2-4f3a-84a6-8bb9795104e5', 'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '근태', 4.5, 5.0, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'e866f334-c431-4cc1-9637-86f2c462e0a2', 'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '교육', 4.5, 5.0, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '36198989-9e40-43af-a9a3-d8682a70b770', 'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '책임감', 4.5, 4.5, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'bdbdcdec-071f-43ac-8ba4-e5e4ba007b78', 'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '협조성', 4.5, 5.0, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'eecb2564-1faa-4b59-ae2a-d1d8aff4eb77', 'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '성실성', 4.5, 5.0, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '11ecd99b-0f81-458f-8b91-03f46cae2d6b', 'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '판단력', 3.5, 4.5, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '0c337474-e4e3-4fee-81b2-d9d7d54f4729', 'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '기획력', 4.5, 4.5, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '70547ac5-ae1e-4c6b-87a1-d99fbdf1d430', 'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '전문성', 3.5, 4.5, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '3c794b0a-91a3-4689-add5-fcbfd90946ca', 'e8ce58ff-4b43-4d15-bd0d-dde7f586efb0', '성과(KPI)', 4.5, 4.5, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '6acbd9bf-2457-45fc-b76a-2c6a32c62259', '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '근태', 5.0, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '8343cc3d-ca33-4756-bf67-6f3a72c63944', '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '교육', 4.5, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '2b0f210f-d472-4cf6-8c8a-706f8dc1466e', '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '책임감', 5.0, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '53035ac1-5d6c-4444-8194-1b9b7d1c9cd9', '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '협조성', 4.5, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '5b42339b-5f65-4aab-8249-79001be178a9', '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '성실성', 5.0, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '32a20cd7-d3ed-4c07-b081-6466fbec98ef', '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '판단력', 4.5, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'ef96a31a-5678-4d1a-b2f2-94cd7af75959', '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '기획력', 3.5, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '65ca9ef7-7463-4952-a503-68111a94ab76', '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '전문성', 4.5, NULL, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '9c002323-94f4-4e3b-bd3e-339f4476459e', '7710b0ee-71a7-49b4-ba2c-55ef4c0de035', '성과(KPI)', 4.5, NULL, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'ae5c4e76-3923-423a-abf9-5d7c6385bd75', 'd738b6ce-e6c5-46a5-9632-6d696ca45125', '근태', 5.0, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'a1a34757-2fe2-4c56-a97b-a019ea65c5d0', 'd738b6ce-e6c5-46a5-9632-6d696ca45125', '교육', 5.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '8dbb582e-6824-4e98-8369-438e81755cc2', 'd738b6ce-e6c5-46a5-9632-6d696ca45125', '책임감', 5.0, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'a3859e2b-167d-4909-9320-d88d2960512a', 'd738b6ce-e6c5-46a5-9632-6d696ca45125', '협조성', 5.0, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '1c21e5e2-d1da-4a65-a4d2-b1040f0d6b08', 'd738b6ce-e6c5-46a5-9632-6d696ca45125', '성실성', 5.0, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd9e811be-ad61-4b70-a099-02895711292c', 'd738b6ce-e6c5-46a5-9632-6d696ca45125', '판단력', 5.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b2544683-3177-4b63-a288-9444827d0bbe', 'd738b6ce-e6c5-46a5-9632-6d696ca45125', '기획력', 4.5, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '9a9c99ca-b3d1-4479-b514-b664b957e723', 'd738b6ce-e6c5-46a5-9632-6d696ca45125', '전문성', 5.0, NULL, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '581c911e-7477-4f36-8181-a3eed7b4924f', 'd738b6ce-e6c5-46a5-9632-6d696ca45125', '성과(KPI)', 5.0, NULL, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '4c99cac4-a5c1-47fd-82d4-cc927b6ecdab', '754949c5-21b7-4887-8bcd-fbdcab87753b', '근태', 3.5, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '263cc1e4-23c0-49ab-95a6-6e477d6d25cd', '754949c5-21b7-4887-8bcd-fbdcab87753b', '교육', 5.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '072f987a-966c-4110-b002-e49ffa4cbe0a', '754949c5-21b7-4887-8bcd-fbdcab87753b', '책임감', 5.0, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'a6041909-3f18-408e-a459-c25bcb0fea65', '754949c5-21b7-4887-8bcd-fbdcab87753b', '협조성', 5.0, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'e3529ab8-0345-4221-b37d-4360ddd29dfe', '754949c5-21b7-4887-8bcd-fbdcab87753b', '성실성', 5.0, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'c7fbc403-4f7f-4d31-844d-ab169488bc8a', '754949c5-21b7-4887-8bcd-fbdcab87753b', '판단력', 5.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'e9e7bbe3-eaa5-4ae5-91f0-77c731145b27', '754949c5-21b7-4887-8bcd-fbdcab87753b', '기획력', 5.0, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '086d30a5-c782-4956-b4fb-b34d3772e74e', '754949c5-21b7-4887-8bcd-fbdcab87753b', '전문성', 5.0, NULL, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '30ea6209-55e8-4718-8932-ecbdd9c4c2ad', '754949c5-21b7-4887-8bcd-fbdcab87753b', '성과(KPI)', 5.0, NULL, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '2bd9b0cb-2744-4d7b-abc5-2e4902abd6f4', 'c6a23c8a-b600-4411-9124-733aecfcb68b', '근태', 4.5, 3.5, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '77c81003-8d98-48d4-bdee-16e56c9b3cba', 'c6a23c8a-b600-4411-9124-733aecfcb68b', '교육', 4.5, 4.5, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '2c1ed849-c60b-40c2-8d94-cef4018c2760', 'c6a23c8a-b600-4411-9124-733aecfcb68b', '책임감', 4.5, 4.5, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'a634361e-cd8d-436c-a173-88524b25a2a9', 'c6a23c8a-b600-4411-9124-733aecfcb68b', '협조성', 4.5, 2.5, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '9ade0f68-880d-457c-b7aa-2553d0ea17fe', 'c6a23c8a-b600-4411-9124-733aecfcb68b', '성실성', 3.5, 3.5, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '74ec4bee-34bc-4a41-a4b1-0392246ce6dc', 'c6a23c8a-b600-4411-9124-733aecfcb68b', '판단력', 4.5, 3.5, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '3eb2f475-eca2-4170-a673-e7f6a692b002', 'c6a23c8a-b600-4411-9124-733aecfcb68b', '기획력', 4.5, 3.5, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '41d53782-a4c0-46e7-bdd3-28438ba944fb', 'c6a23c8a-b600-4411-9124-733aecfcb68b', '전문성', 3.5, 3.5, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'ad501604-7b58-40fe-a04d-29ee08c82340', 'c6a23c8a-b600-4411-9124-733aecfcb68b', '성과(KPI)', 3.5, 4.5, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'a5e455ec-db70-46ee-8f8f-763227e4eb08', '4daf97f0-2be5-4d6d-994a-515289573071', '근태', 4.5, 3.5, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd3761319-73a5-4042-b952-69ba7fb972c4', '4daf97f0-2be5-4d6d-994a-515289573071', '교육', 4.5, 4.5, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '556ee76d-e709-4df3-b90e-18bc2d04aefd', '4daf97f0-2be5-4d6d-994a-515289573071', '책임감', 5.0, 2.5, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '2a31cca0-81b2-4966-a5c3-a9f77ce8e50c', '4daf97f0-2be5-4d6d-994a-515289573071', '협조성', 3.5, 2.5, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'e6b159f3-ca4b-46a5-ad59-ffb122bfdc8b', '4daf97f0-2be5-4d6d-994a-515289573071', '성실성', 4.5, 4.5, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'bdfb420a-02c3-4dba-8d6c-e480c6bc8866', '4daf97f0-2be5-4d6d-994a-515289573071', '판단력', 5.0, 3.5, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '8c917570-a3a5-493f-8533-7152bf6f03d1', '4daf97f0-2be5-4d6d-994a-515289573071', '기획력', 5.0, 4.5, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd1625793-f317-4ad3-a2d7-0a2d690e95c3', '4daf97f0-2be5-4d6d-994a-515289573071', '전문성', 5.0, 4.5, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '43a8a1b0-6e3f-417c-911e-d4fc1475c4a6', '4daf97f0-2be5-4d6d-994a-515289573071', '성과(KPI)', 5.0, 3.5, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '167c8270-0101-42d7-bc6e-0bd0053762b4', '6713352c-9105-4bd1-a027-e0580c547afd', '근태', 5.0, 5.0, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b98c56e0-8d82-4030-b6aa-ac65258444c6', '6713352c-9105-4bd1-a027-e0580c547afd', '교육', 5.0, 5.0, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '1ce8f244-05dd-4d3e-8267-7983d8d5ed8d', '6713352c-9105-4bd1-a027-e0580c547afd', '책임감', 4.5, 3.5, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'ac433c96-659f-453b-b656-08305d0e8c5e', '6713352c-9105-4bd1-a027-e0580c547afd', '협조성', 4.5, 5.0, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'bf20b211-b8b9-47b4-baaf-1a6e8947fbc4', '6713352c-9105-4bd1-a027-e0580c547afd', '성실성', 4.5, 5.0, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b61e9907-08fc-4ce0-98d7-621949a66fa6', '6713352c-9105-4bd1-a027-e0580c547afd', '판단력', 3.5, 3.5, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '5e361235-c333-4df9-9b12-270de94693a5', '6713352c-9105-4bd1-a027-e0580c547afd', '기획력', 2.5, 2.5, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd0b66590-bb4c-4070-9e6d-c69e55cac82d', '6713352c-9105-4bd1-a027-e0580c547afd', '전문성', 1.5, 2.5, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '86819384-4c73-46e1-9364-846c55e522a9', '6713352c-9105-4bd1-a027-e0580c547afd', '성과(KPI)', 3.5, 4.5, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '00dc84c1-529a-4d6a-a8f8-d325e61de8d8', 'b7a6634d-8509-497e-80c2-64bc094ea4aa', '근태', 5.0, 5.0, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'd1d0fb44-8a0b-40f8-bfb2-48e14807400a', 'b7a6634d-8509-497e-80c2-64bc094ea4aa', '교육', 5.0, 5.0, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '1db82b11-5e01-45bd-ba33-66108db4f087', 'b7a6634d-8509-497e-80c2-64bc094ea4aa', '책임감', 4.5, 5.0, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '0d283b41-c7fa-450d-b1c8-10647f310fa6', 'b7a6634d-8509-497e-80c2-64bc094ea4aa', '협조성', 3.5, 4.5, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '9e3b6a27-9c38-45da-8397-ee2e47d5c137', 'b7a6634d-8509-497e-80c2-64bc094ea4aa', '성실성', 3.5, 5.0, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'e89d0af0-dfc7-4fd9-b85b-9354e5947ba1', 'b7a6634d-8509-497e-80c2-64bc094ea4aa', '판단력', 4.5, 5.0, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '07be8ec6-a6a9-4488-8c14-835ded4b2f6a', 'b7a6634d-8509-497e-80c2-64bc094ea4aa', '기획력', 2.5, 3.5, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'aefe452f-7be4-4a95-9b00-580fc515efaa', 'b7a6634d-8509-497e-80c2-64bc094ea4aa', '전문성', 2.5, 3.5, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'c05436d7-775a-4e01-9301-f3d658ddb789', 'b7a6634d-8509-497e-80c2-64bc094ea4aa', '성과(KPI)', 3.5, 4.5, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '5d8e9ffa-0c28-42ab-b5b9-8b4bc4d58d80', '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '근태', 4.5, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '4c97ed64-d433-42a0-a9bb-9a17fdfe57a3', '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '교육', 5.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '0ec8b654-4d4d-4061-8a5a-40531a0f7692', '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '책임감', 4.5, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '126528f3-2ff6-4790-b67e-5f6b13697a92', '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '협조성', 5.0, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '5e3b36c1-9fba-4f84-b229-53489e5e69c1', '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '성실성', 4.5, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '61041562-fc3c-44ac-9189-654c457828c3', '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '판단력', 5.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '139eca4d-ee26-41be-a97e-34b74ca89746', '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '기획력', 3.5, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '86bc7ca7-d08b-4cce-985e-6726429fa339', '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '전문성', 3.5, NULL, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '187da4de-7d0e-4415-9e95-2d0150eef632', '6fe8bd16-3792-45bd-a7f5-817fdccf6f39', '성과(KPI)', 4.5, NULL, NULL, 9
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '7b241e93-b23e-47f5-b226-d6989b551f3c', 'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '근태', 5.0, NULL, NULL, 1
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '7448ed2b-055e-4010-87fb-81324e22b9ea', 'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '교육', 5.0, NULL, NULL, 2
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '4cbd825c-8c17-4461-9a82-a24d2447b212', 'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '책임감', 4.5, NULL, NULL, 3
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '6ba803d4-f4e8-42bb-909b-c7f84028df64', 'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '협조성', 4.5, NULL, NULL, 4
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '7aae4f96-0076-4374-912f-f729f9c8e7a0', 'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '성실성', 4.5, NULL, NULL, 5
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  'b563ed2d-5daf-482a-848d-123d5359f36b', 'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '판단력', 5.0, NULL, NULL, 6
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '36ea627f-a888-4103-90ba-9c7db3856c4d', 'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '기획력', 4.5, NULL, NULL, 7
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '26adb0d4-b562-44e8-9fca-841498116741', 'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '전문성', 4.5, NULL, NULL, 8
);
INSERT INTO evaluation_scores (id, employee_eval_id, category, score_self, score_peer, score_upper, display_order) VALUES (
  '87cf9969-1284-4c7a-8b7a-be659e64c514', 'ca1ee167-ea6b-4fdd-9a22-5983f2f9e5f9', '성과(KPI)', 4.5, NULL, NULL, 9
);

COMMIT;