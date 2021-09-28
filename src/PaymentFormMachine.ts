import { assign, createMachine } from 'xstate'

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
      },
      processing: {
        invoke: {
          src: 'proceedPayment',
          onDone: 'success',
          onError: 'error',
        },
      },
      error: {
        on: {
          RETRY: 'updating',
        },
      },
      success: {
        on: {
          RELOAD: {
            target: 'updating',
            actions: 'reset',
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

export default PaymentFormMachine
