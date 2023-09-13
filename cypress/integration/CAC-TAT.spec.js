// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Felipe');
        cy.get('#lastName').type('Fernandes');
        cy.get('#email').type('teste@teste.com');
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', { delay: 0 });
        cy.get('button[type="submit"]').click();


        cy.get('.success').should('be.visible');
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Felipe');
        cy.get('#lastName').type('Fernandes');
        cy.get('#email').type('teste@teste.com');
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', { delay: 0 });
        cy.get('#email').type('teste@#teste.com');
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    })
    it('Verifica se campo de telefone não aceita letras', function() {
        cy.get('#phone').type('telefone');

        cy.get('#phone').should('be.empty');
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', function(){
        cy.get('#phone-checkbox').click();
        cy.get('#firstName').type('Felipe');
        cy.get('#lastName').type('Fernandes');
        cy.get('#email').type('teste@teste.com');
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', { delay: 0 });
        cy.get('#email').type('teste@#teste.com');
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Felipe').should('have.value', 'Felipe').clear().should('have.value', '');
        cy.get('#lastName').type('Fernandes').should('have.value', 'Fernandes').clear().should('have.value', '');
        cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com').clear().should('have.value', '');
        cy.get('#phone').type('7199999999').should('have.value', '7199999999').clear().should('have.value', '');
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    })
    it.only('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
    })
})