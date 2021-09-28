import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { useMachine } from '@xstate/react'
import React, { useState } from 'react'
import { proceedPayment } from './api/payment'
import PaymentFormMachine from './PaymentFormMachine'
import PaymentKO from './PaymentKO'
import PaymentOK from './PaymentOK'

export default function PaymentForm() {
  const [invalidName, setInvalidName] = useState(false)
  const [invalidCard, setInvalidCard] = useState(false)
  const [machine, send] = useMachine(
    PaymentFormMachine.withConfig({
      services: {
        proceedPayment: (ctx) => proceedPayment({ ...ctx }),
      },
    }),
    { devTools: true },
  )
  const { name, card } = machine.context

  const handleSubmit = () => {
    send({ type: 'SUBMIT' })
    setInvalidName(name === '')
    setInvalidCard(card === '')
  }

  return (
    <>
      {(machine.matches('updating') || machine.matches('processing')) && (
        <>
          <FormControl id="name" isRequired isInvalid={invalidName}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) =>
                send({ type: 'UPDATE_NAME', value: e.target.value })
              }
            />
            <FormErrorMessage>The field is required</FormErrorMessage>
            <FormHelperText>Name on your card</FormHelperText>
          </FormControl>
          <FormControl id="card-number" isRequired isInvalid={invalidCard}>
            <FormLabel>Card number</FormLabel>
            <Input
              type="text"
              value={card}
              onChange={(e) =>
                send({ type: 'UPDATE_CARD', value: e.target.value })
              }
            />
            <FormErrorMessage>The field is required</FormErrorMessage>
            <FormHelperText>Your card number</FormHelperText>
          </FormControl>
          <Button
            width="full"
            colorScheme="green"
            onClick={() => handleSubmit()}
          >
            Pay now
          </Button>
        </>
      )}
      {machine.matches('success') && <PaymentOK />}
      {machine.matches('error') && (
        <PaymentKO
          onClick={() => {
            send({ type: 'RETRY' })
          }}
        />
      )}
    </>
  )
}
