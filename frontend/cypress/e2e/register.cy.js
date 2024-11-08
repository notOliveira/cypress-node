describe('Cadastro de Tarefas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Deve adicionar uma nova tarefa', () => {
    cy.get('input[placeholder="Descrição"]').type('Questionário Cypress');
    cy.get('input[type="checkbox"]').check();
    cy.get('button').contains('Adicionar Tarefa').click();

    // Verifique se a tarefa aparece com a classe correta
    cy.contains('Questionário Cypress - Concluída')
      .should('exist')
      .parent('li')
      .should('have.class', 'bg-completed');
  });

  it('Deve listar tarefas corretamente', () => {
    cy.get('h3').contains('Lista de Tarefas').should('be.visible');
    cy.contains('Nenhuma tarefa cadastrada').should('be.visible');
  });

  it('Deve aplicar estilos corretamente ao adicionar uma tarefa pendente', () => {
    cy.get('input[placeholder="Descrição"]').type('Tarefa Pendente');
    cy.get('button').contains('Adicionar Tarefa').click();

    // Verifique se a tarefa está pendente
    cy.contains('Tarefa Pendente - Pendente')
      .should('exist')
      .parent('li')
      .should('have.class', 'bg-pending');
  });

  it('Deve alternar o status de conclusão de uma tarefa', () => {
    cy.get('input[placeholder="Descrição"]').type('Tarefa para Alterar Status');
    cy.get('button').contains('Adicionar Tarefa').click();

    // Espera a tarefa ser listada
    cy.contains('Tarefa para Alterar Status - Pendente')
      .should('exist')
      .parent('li')
      .as('tarefaPendente');

    // Muda o status para "Concluída"
    cy.get('@tarefaPendente')
      .find('button.change-status-button')
      .click();

    // Confirma o status atualizado e a classe
    cy.contains('Tarefa para Alterar Status - Concluída')
      .should('exist')
      .parent('li')
      .should('have.class', 'bg-completed');
  });

  it('Deve excluir uma tarefa', () => {
    cy.get('input[placeholder="Descrição"]').type('Tarefa para Excluir');
    cy.get('button').contains('Adicionar Tarefa').click();

    cy.contains('Tarefa para Excluir - Pendente').should('be.visible');

    // Clica no botão de exclusão
    cy.contains('Tarefa para Excluir')
      .parent()
      .find('button.delete-button')
      .click();

    // Verifica que a tarefa foi removida
    cy.contains('Tarefa para Excluir').should('not.exist');
  });
});
