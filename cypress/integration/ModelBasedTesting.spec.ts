/// <reference types="cypress" />
/// <reference types="node" />

import { assign, createMachine } from 'xstate'
import { createModel } from '@xstate/test'

const initialContext = {
  name: '',
  card: '',
}

type Event =
  | { type: 'UPDATE_CARD'; value: string }
  | { type: 'UPDATE_NAME'; value: string }
  | { type: 'SUBMIT' }
  | { type: 'RETRY' }
  | { type: 'RELOAD' }

export const PaymentFormMachine = createMachine<typeof initialContext, Event>(
  {
    id: 'MyPaymentMachine',
    initial: 'updating',
    context: initialContext,
    states: {
      updating: {
        on: {
          UPDATE_CARD: {
            target: 'updating',
            actions: assign({ card: (_, event) => event.value }),
          },
          UPDATE_NAME: {
            target: 'updating',
            actions: assign((_, event) => ({ name: event.value })),
          },
          SUBMIT: [
            {
              target: 'processing',
              cond: 'checkForm',
            },
          ],
        },
        meta: {
          test: function () {
            cy.get('#name').should('be.visible')
            cy.get('#card-number').should('be.visible')
          },
        },
      },
      processing: {
        invoke: {
          id: 'proceedPayment',
          src: 'proceedPayment',
          onDone: 'success',
          onError: 'error',
        },
        meta: {
          test: function () {
            cy.get('#name').should('be.visible')
            cy.get('#card-number').should('be.visible')
          },
        },
      },
      error: {
        on: {
          RETRY: 'updating',
        },
        meta: {
          test: function () {
            cy.get('#name').should('not.exist')
            cy.get('#card-number').should('not.exist')
            cy.get('.chakra-alert')
              .should('exist')
              .should('contain', 'Something went wrong')
          },
        },
      },
      success: {
        on: {
          RELOAD: {
            target: 'updating',
            actions: 'reset',
          },
        },
        meta: {
          test: function () {
            cy.get('#name').should('not.exist')
            cy.get('#card-number').should('not.exist')
            cy.get('.chakra-alert')
              .should('exist')
              .should('contain', 'Thanks for your payment')
          },
        },
      },
    },
  },
  {
    actions: {
      reset: assign(initialContext),
    },
    guards: {
      checkForm: (ctx) => ctx.name !== '' && ctx.card !== '',
    },
  },
)

const testModel = createModel(PaymentFormMachine, {
  events: {
    UPDATE_CARD: function () {
      cy.get('#card-number').type('Card12345')
    },
    UPDATE_NAME: function () {
      cy.get('#name').type('Rodolphe')
    },
    SUBMIT: function () {
      cy.get('button').click()
    },
    RETRY: function () {
      cy.get('button').click()
    },
    RELOAD: {},
  },
})

context('Payment Form', () => {
  const testPlans = testModel.getSimplePathPlans()
  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path) => {
        it(path.description, function () {
          cy.intercept(
            { method: 'POST', url: '/api/payment/proceed' },
            {
              statusCode: path.description.includes('error') ? 500 : 200,
              delay: 1000,
              body: {},
            },
          ).as('Payment')
          cy.visit('/').then(path.test)
        })
      })
    })
  })
})
