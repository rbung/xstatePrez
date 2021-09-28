import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import React, { useState } from 'react'
import { proceedPayment } from './api/payment'
import PaymentKO from './PaymentKO'
import PaymentOK from './PaymentOK'

export default function PaymentForm() {
  // TODO create a state machine and use it 😎
  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [invalidName, setInvalidName] = useState(false)
  const [invalidCard, setInvalidCard] = useState(false)
  const [displayForm, setDisplayForm] = useState(true)
  const [paid, setPaid] = useState(false)
  const [paymentError, setPaymentError] = useState(false)

  const handleSubmit = () => {
    setInvalidName(name === '')
    setInvalidCard(card === '')
    if (name && card) {
      proceedPayment({ name, card })
        .then(() => {
          setPaid(true)
          setDisplayForm(false)
        })
        .catch(() => {
          setPaymentError(true)
          setDisplayForm(false)
        })
    }
  }

  return (
    <>
      {displayForm && (
        <>
          <FormControl id="name" isRequired isInvalid={invalidName}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormErrorMessage>The field is required</FormErrorMessage>
            <FormHelperText>Name on your card</FormHelperText>
          </FormControl>
          <FormControl id="card-number" isRequired isInvalid={invalidCard}>
            <FormLabel>Card number</FormLabel>
            <Input
              type="text"
              value={card}
              onChange={(e) => setCard(e.target.value)}
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
      {paid && <PaymentOK />}
      {paymentError && (
        <PaymentKO
          onClick={() => {
            setPaymentError(false)
            setDisplayForm(true)
          }}
        />
      )}
    </>
  )
}
