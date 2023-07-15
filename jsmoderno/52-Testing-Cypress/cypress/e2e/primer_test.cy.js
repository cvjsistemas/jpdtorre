/// <reference types="cypress" />

describe('carga la pagina principal',()=>{


  it('debe cargar la pagina principal',()=>{

    
 cy.visit('http://127.0.0.1:5500/52-Testing-Cypress/index.html');

    //verifica elemento y su texto
    cy.contains('h1','Administrador de Pacientes de Veterinaria');

    //verifica que exista
    cy.get('[data-cy="titulo-proyecto"]').should('exist');

    //veririca que exista el elemento y contenga un texto
    cy.get('[data-cy="titulo-proyecto"]')
      .invoke('text')
      .should('equal', 'Administrador de Pacientes de Veterinaria');

      //verifica el texto de las citas
      cy.get('[data-cy="citas-heading"]')
        .invoke('text')
        .should('equal', 'No hay Citas, comienza creando una');
  });
});