const baseUrl = "http://localhost:3000/";

// Cypress는 기본적으로 각 테스트가 독립적임
  // 하나의 테스트가 끝나면 초기화 후 다음 테스트를 진행한다는 뜻. 첫 페이지 접근부터 다시 시작해야 함
  // 쿠키를 포함한 브라우저 스토리지도 다 날아감. 로그인이 필요한 테스트는 로그인도 다시 해야 한다는 뜻

// decribe 함수를 쓸 때 두 번째 인자로 { testIsolation: false } 를 주면 초기화 되지 않음
  // 이전 테스트가 끝난 시점의 환경에서 다음 테스트를 이어서 진행한다는 뜻
  // 페이지도 그대로. 쿠키, 스토리지도 그대로
    // 세션을 남겨놓은 상태에서 테스트를 이어서 진행하고 싶을 때나,
    // 페이지 흐름을 이어서 테스트하고 싶을 때 사용할 수 있음
      // 세션을 남겨놓는 방법으로 cy.session()을 쓸 수 있다고 하는데... 잘 안 돼서 좀 더 알아봐야할듯

describe('라우팅 테스트', { testIsolation: false }, () => {
  it('처음 접속 시 로그인 페이지로 이동합니다', () => {

    // 어째서인지 테스트를 실행할 때 세션 토큰이 있는 경우가 있어서 쿠키 삭제부터 시작
      // 테스트 종료 후에 쿠키 삭제도 해줘야 하나?
      // 근데 테스트 중간에 멈출 수도 있으니까 처음에 삭제하고 시작하는게 깔끔하지 않을까? 몰?루
    cy.clearCookie('next-auth.session-token')

    // 어디서 테스트를 진행할 것인지 지정해서 방문(visit)해주지 않으면
    // 빈 화면이 표시되어 테스트가 제대로 진행되지 않음
    cy.visit(baseUrl)
    cy.url().should('include', '/auth')

    // cy.url()로 올바른 주소로 접근했는지를 확인할 수 있지만,
    // 해당 페이지에 맞는 컴포넌트가 화면에 잘 표시됐는지 추가로 확인하기 위해 should('exist') 사용
      // 여기서 cy.contains()에서 에러가 뜨지 않으면 해당 컴포넌트가 잘 표시됐다는 의미라서
      // should('exist')를 쓰는건 화면을 중복으로 체크하는 느낌이 있지만...
      // 코드를 읽었을 때 무엇을 테스트 하는건지 의미 전달이 잘 되는거 같아 일단 붙여놓음.
    // 다른 페이지로 똑같은 방법으로 확인 (url 체크 + 컴포넌트 체크)
    cy.contains('구경하기').should('exist')
  })

  it('구경하기 버튼을 클릭하면 메인 페이지로 이동합니다 ', () => {
    // 앞에서 실행된 테스트에서 이어서 진행되기 때문에,
    // cy.visit()로 첫 페이지에 진입할 필요 없음
    cy.contains('구경하기').click();
    cy.url().should('eq', baseUrl)
    cy.contains('번째').should('exist')
  })
    
  it('캘린더 버튼을 누르면 캘린더 페이지로 이동합니다.', ()=> {
    cy.contains('캘린더').click();
    cy.url().should('include', '/calendar')
    cy.contains('현재까지').should('exist')
  })

  it('캘린더에서 화살표 버튼을 클릭하면 현재 월을 변경할 수 있습니다.', () => {
    const currentMonth = new Date().getMonth() + 1
    cy.contains('월').next().click()
    cy.contains('월').should('contain', String(currentMonth + 1 > 12 ? 1 : currentMonth + 1))

    cy.contains('월').prev().click().click()
    cy.contains('월').should('contain', String(currentMonth - 1 < 1 ? 12 : currentMonth - 1))
  })

  it('피드 버튼을 누르면 피드 페이지로 이동합니다.', ()=> {
    cy.contains('피드').click();
    cy.url().should('include', '/feed')
    cy.get('input').should('exist')
  })

  it('마이 페이지 버튼을 누르면 마이 페이지로 이동합니다.', ()=> {
    cy.get('.items-end > :nth-child(1)').click();
    cy.url().should('include', '/my-page')
    cy.contains('내 정보').should('exist')
  })

  it('홈 버튼을 누르면 메인 페이지로 이동합니다.', ()=> {
    cy.contains('홈').click();
    cy.url().should('eq', baseUrl)
    cy.contains('번째').should('exist')
  })

  it('나가기 버튼을 누르면 로그인 페이지로 돌아갑니다.', ()=> {
    cy.get('.items-end > :nth-child(2)').click();
    cy.url().should('include', '/auth')
    cy.contains('구경하기').should('exist')
  })
})

// 설기 기능이 잘 안 돼서 보류 ;-;

// describe('설기 CRUD 테스트', () => {
//     it('Create 테스트', () => {
//       cy.visit('http://localhost:3000/')
//       cy.contains('구경하기').click();
//       cy.url().should('eq', baseUrl)

//       cy.contains('캘린더').click();
//       cy.url().should('include', '/calendar')

//       const date = Math.ceil(Math.random()*28).toString()
//       const text = 'Cypress 설기 테스트'

//       cy.contains(date).next().click()
//       cy.get('#seolgi-modal').type(text)
//       cy.contains('확인').click()

//       cy.reload()
//       cy.contains(date).next().click()
//       cy.get('#seolgi-modal').should('include', text)
//   })
// })