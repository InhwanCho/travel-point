

describe('메인페이지 테스트', () => {
  beforeEach(()=>{
    cy.visit('/');
  });
  it('로고 있는지 확인', () => {
    cy.getDataTest('logo').should('be.visible');
  });
});