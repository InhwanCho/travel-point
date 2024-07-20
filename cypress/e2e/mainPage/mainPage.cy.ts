describe("메인페이지 600이하 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  context("폰사이즈 테스트", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });
    it("UI 테스트", () => {
      // 로고 체크
      cy.getDataTest("logo").should("be.visible");
      // 모바일용 검색 버튼 체크
      cy.getDataTest('search-btn').should('not.be.visible');
      cy.getDataTest("smallView-search-btn").should("be.visible");
    });
    it("기능 테스트",()=>{
      cy.getDataTest("next-btn-서울").click();
      // 2번 title 있는지 확인
      // 4번 title 있는지 확인...
      // 울산 as well

      // 테마

      // 축제
    });
  });
  context('데스크탑 화면 테스트', () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
    });
    it("UI 테스트", () => {
      cy.getDataTest("logo").should("be.visible");
      cy.getDataTest('search-btn').should('be.visible');
      cy.getDataTest("smallView-search-btn").should("not.be.visible");
    });    
  });  
});
