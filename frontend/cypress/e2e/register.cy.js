describe('Cadastro de Tarefas', () => {
  it('Deve adicionar uma nova tarefa', () => {
    cy.visit('http://localhost:3000');
    // Preencher a descrição e marcar como concluída
    cy.get('input[placeholder="Descrição"]').type('Questionário Cypress');
    cy.get('input[type="checkbox"]').check();
    // Adicionar a tarefa
    cy.get('button').contains('Adicionar Tarefa').click();
    // Verificar se a tarefa aparece na lista
    cy.contains('Estudar Cypress - Concluída').should('be.visible');
    // Verificar se a tarefa concluída tem a classe 'completed' e o estilo de cor correto
    cy.contains('Estudar Cypress - Concluída')
      .should('have.class', 'completed')
      .and('have.css', 'color', 'rgb(40, 167, 69)'); // Cor verde para tarefa concluída
  });

  it('Deve listar tarefas corretamente', () => {
    cy.visit('http://localhost:3000');
    cy.get('h3').contains('Lista de Tarefas').should('be.visible');
  });

  it('Deve aplicar estilos corretamente ao adicionar uma tarefa pendente', () => {
    cy.visit('http://localhost:3000');
    // Adicionando tarefa pendente
    cy.get('input[placeholder="Descrição"]').type('Tarefa Pendente');
    cy.get('button').contains('Adicionar Tarefa').click();
    // Verifica se a tarefa pendente possui a classe 'pending' e o estilo de cor correto
    cy.contains('Tarefa Pendente - Pendente')
      .should('have.class', 'pending')
      .and('have.css', 'color', 'rgb(220, 53, 69)'); // Cor vermelha para tarefa pendente
  });
});
