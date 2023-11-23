## 100설기

100설기는 100일간 목표 달성을 위해 매일매일 기록을 돕는 애플리케이션입니다. 기록할 때 마다 설기가 여러분을 반겨줍니다!

## 개발 시작하기

- `pnpm dev`: Next.js 개발용 FE/BE 서버를 시작합니다. 
  - `localhost:3000`: FE 개발 서버
  - `localhost:3000/api`: BE 개발 서버
  
- FE 개발에서 BE 타입 사용
  - `pnpm db-generate`로 `prisma/schema.prisma`에서 설정한 타입을 사용할 수 있습니다.
  - 개발 시 TypeScript intellisense가 잘 작동하지 않으면 실행해보세요.
  
- 개발용 DB 설정이 필요합니다.
  - DB 연결
    - postgresql 서버와 연결할 수 있습니다. (개발진은 Supabase 사용)
    - `.env.development.local`를 생성하고 `.env.example`를 참고하여 Postgresql URL을 입력하여 본인의 데이터베이스 서버를 사용할 수도 있습니다.
  - DB 초기 세팅 및 시딩
    - `pnpm db-dev-reset`: 기존 스키마와 데이터를 삭제하고 DB 스키마를 `prisma/schema.prisma`와 동일하게 변경 및 시드 데이터를 생성합니다.
      - 기존에 생성했던 데이터가 모두 삭제되기 때문에 새로운 DB를 초기 세팅하는 경우에만 사용합니다.
      - `pnpm db-dev-seed`에 해당하는 쿼리가 실행되기 때문에 따로 해당 시드 스크립트를 실행하지 않아도 됩니다.
    - `pnpm db-dev-migrate`: `prisma/schema.prisma`를 변경한 경우, DB로 변경사항을 적용합니다.
    - `pnpm db-dev-client`: 개발 DB 조회가 가능한 간단한 DB 클라이언트를 실행합니다.
  
  - 린트
    - `pnpm lint`: Eslint, Prettier로 코드 스타일링을 점검합니다.
    