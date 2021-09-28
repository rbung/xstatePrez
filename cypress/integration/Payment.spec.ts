describe('Payment Form', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('should validate correctly', function () {
    cy.get('button').click()
    cy.get('#name-feedback').should('contain', 'The field is required')
    cy.get('#card-number-feedback').should('contain', 'The field is required')

    cy.get('#name').type('Rodolphe')
    cy.get('button').click()
    cy.get('#name-feedback').should('not.exist')
    cy.get('#card-number-feedback').should('contain', 'The field is required')

    cy.get('#name').clear()
    cy.get('#card-number').type('Card12345')
    cy.get('button').click()
    cy.get('#name-feedback').should('contain', 'The field is required')
    cy.get('#card-number-feedback').should('not.exist')
  })

  it('should display ok if payment is OK', function () {
    cy.intercept(
      { method: 'POST', url: '/api/payment/proceed' },
      { statusCode: 200, body: {} },
    ).as('Payment')

    cy.get('#name').type('Rodolphe')
    cy.get('#card-number').type('Card12345')
    cy.get('button').click()

    cy.get('#name').should('not.exist')
    cy.get('#card-number').should('not.exist')
    cy.get('.chakra-alert')
      .should('exist')
      .should('contain', 'Thanks for your payment')
  })

  it('should display an error if payment is KO', function () {
    cy.intercept(
      { method: 'POST', url: '/api/payment/proceed' },
      { statusCode: 500, body: {} },
    ).as('Payment')

    cy.get('#name').type('Rodolphe')
    cy.get('#card-number').type('Card12345')
    cy.get('button').click()

    cy.get('#name').should('not.exist')
    cy.get('#card-number').should('not.exist')
    cy.get('.chakra-alert')
      .should('exist')
      .should('contain', 'Something went wrong')
  })

  // TODO to unskip
  it.skip('should API be called once', function () {
    cy.intercept(
      { method: 'POST', url: '/api/payment/proceed' },
      { statusCode: 200, delay: 2000, body: {} },
    ).as('Payment')
    cy.intercept('/api/payment/proceed', cy.spy().as('spyPaymentRequest'))

    cy.get('#name').type('Rodolphe')
    cy.get('#card-number').type('Card12345')
    // click 4 times on the button
    cy.get('button').click()
    cy.get('button').click()
    cy.get('button').click()
    cy.get('button').click()
    cy.get('.chakra-alert')
      .should('exist')
      .should('contain', 'Thanks for your payment')

    cy.get('@spyPaymentRequest').its('callCount').should('equal', 1)
  })
})
