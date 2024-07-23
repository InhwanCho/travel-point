// cypress/integration/auth_spec.ts

describe("Auth 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getDataTest("login-btn").click();
  });

  it("로그인 실패 및 성공 테스트", () => {
    // 로그인 API 응답 모킹
    cy.intercept('POST', '/api/loginForm', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          message: "Invalid credentials"
        }
      });
    }).as('loginRequest');

    cy.getDataTest("loginpage-email-input").within(() => {
      cy.get("input").type("wh_dlsghks@naver.com");
    });

    cy.getDataTest("loginpage-password-input").within(() => {
      cy.get("input").type("wrongpassword");
    });

    cy.getDataTest("loginpage-login-btn").within(() => {
      cy.get("button").click();
    });

    cy.getDataTest("loginpage-password-input").within(() => {
      cy.get("p").contains("비밀번호는");
    });
    
    cy.getDataTest("loginpage-password-input").within(() => {
      cy.get("input").type("qlalfqjsghQ1!");
    });
    cy.getDataTest("loginpage-login-btn").within(() => {
      cy.get("button").click();
    });
    cy.wait('@loginRequest');
    
    cy.getDataTest("loginpage-error").should('be.visible');
  });
});
