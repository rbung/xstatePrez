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

export const paymentMachine = createMachine<typeof initialContext, Event>({
  // TODO add you logic here 👨‍💻👩‍💻
})
