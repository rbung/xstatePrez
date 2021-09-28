import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/alert'
import { CloseButton } from '@chakra-ui/react'
import React from 'react'

interface Props {
  onClick: () => void
}

export default function PaymentKO({ onClick }: Props) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Oops</AlertTitle>
      <AlertDescription>Something went wrong 🥺</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => onClick()}
      />
    </Alert>
  )
}
