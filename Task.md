# Task: Sad Phonebook 구현 태스크 목록

> 상태 표기: `[ ]` 미완료 / `[x]` 완료 / `[-]` 진행 중

---

## Phase 1. 프로젝트 초기 세팅

- [ ] **T-01** GitHub 저장소 생성 및 로컬 클론
- [ ] **T-02** Next.js 프로젝트 초기화 (`npx create-next-app@latest`)
  - App Router 사용
  - TypeScript 사용
  - Tailwind CSS 포함
- [ ] **T-03** `.env.local` 파일 생성 및 Supabase 환경변수 설정
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] **T-04** Supabase 클라이언트 라이브러리 설치 (`@supabase/supabase-js`)
- [ ] **T-05** `lib/supabase.ts` 클라이언트 초기화 모듈 작성

---

## Phase 2. Supabase 데이터베이스 세팅

- [ ] **T-06** Supabase 프로젝트 생성 (supabase.com 대시보드)
- [ ] **T-07** `contacts` 테이블 생성 (SQL Editor)
  ```sql
  create table contacts (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text not null,
    memo text,
    created_at timestamp with time zone default now()
  );
  ```
- [ ] **T-08** Row Level Security(RLS) 정책 설정 — 인증 없이 전체 읽기/쓰기 허용
  ```sql
  alter table contacts enable row level security;

  create policy "allow all" on contacts
    for all using (true) with check (true);
  ```
- [ ] **T-09** Supabase API 키 확인 및 `.env.local`에 입력

---

## Phase 3. 타입 및 API 레이어 구현

- [ ] **T-10** `types/contact.ts` — Contact 타입 정의
  ```ts
  export type Contact = {
    id: string;
    name: string;
    phone: string;
    memo?: string;
    created_at: string;
  };
  ```
- [ ] **T-11** `lib/contacts.ts` — CRUD API 함수 작성
  - `getContacts()` — 전체 목록 조회
  - `addContact(data)` — 새 연락처 추가
  - `updateContact(id, data)` — 연락처 수정
  - `deleteContact(id)` — 연락처 삭제
  - `searchContacts(query)` — 이름/번호 검색

---

## Phase 4. UI 컴포넌트 구현

- [ ] **T-12** `components/ContactList.tsx` — 연락처 목록 렌더링
  - 각 항목에 이름, 전화번호, 메모 표시
  - 수정 / 삭제 버튼 포함
- [ ] **T-13** `components/ContactForm.tsx` — 추가 / 수정 공용 폼
  - 이름 (필수), 전화번호 (필수), 메모 (선택) 입력 필드
  - 유효성 검사: 필수 항목 미입력 시 오류 메시지 표시
  - 저장 / 취소 버튼
- [ ] **T-14** `components/SearchBar.tsx` — 검색 입력창
  - 입력값 변경 시 실시간 필터링
- [ ] **T-15** `components/DeleteDialog.tsx` — 삭제 확인 다이얼로그
  - "정말 삭제하시겠습니까?" 확인 / 취소 버튼
- [ ] **T-16** 반응형 레이아웃 스타일링 (모바일 / 데스크톱)

---

## Phase 5. 메인 페이지 통합

- [ ] **T-17** `app/page.tsx` — 메인 페이지 구현
  - 연락처 목록 초기 로딩 (서버 컴포넌트 또는 `useEffect`)
  - 검색창 연동
  - 추가 버튼 → `ContactForm` 모달 또는 인라인 폼 표시
  - 수정 버튼 → 해당 항목 데이터로 `ContactForm` 열기
  - 삭제 버튼 → `DeleteDialog` 표시 후 확정 시 삭제 실행
- [ ] **T-18** 추가 / 수정 / 삭제 완료 후 목록 자동 새로고침 처리
- [ ] **T-19** 로딩 상태 표시 (스피너 또는 스켈레톤 UI)
- [ ] **T-20** 에러 상태 표시 (API 실패 시 사용자 안내 메시지)

---

## Phase 6. 배포

- [ ] **T-21** GitHub에 코드 푸시
- [ ] **T-22** Vercel 프로젝트 생성 및 GitHub 저장소 연결
- [ ] **T-23** Vercel 환경변수 등록 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] **T-24** Vercel 자동 배포 확인 및 프로덕션 URL 취득

---

## Phase 7. 테스트 및 검증

- [ ] **T-25** 연락처 추가 정상 동작 확인
- [ ] **T-26** 연락처 수정 정상 동작 확인
- [ ] **T-27** 연락처 삭제 및 다이얼로그 확인
- [ ] **T-28** 검색 필터링 정상 동작 확인
- [ ] **T-29** 모바일 화면에서 반응형 레이아웃 확인
- [ ] **T-30** 목록 로딩 시간 1초 이내 확인

---

## 의존 관계 요약

```
T-01 → T-02 → T-03, T-04 → T-05
T-06 → T-07 → T-08 → T-09 → T-03
T-05, T-10 → T-11
T-11 → T-12, T-13, T-14, T-15
T-12 ~ T-16 → T-17 → T-18, T-19, T-20
T-17 ~ T-20 → T-21 → T-22 → T-23 → T-24
T-24 → T-25 ~ T-30
```
