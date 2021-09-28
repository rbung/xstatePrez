import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import React from 'react'

export default function PaymentOK() {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={3} fontSize="lg">
        Done!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thanks for your payment. <br />
        Our team will soon get back to you.
      </AlertDescription>
    </Alert>
  )
}
