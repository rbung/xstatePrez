import {
  Center,
  ChakraProvider,
  Divider,
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import PaymentForm from './PaymentForm'

function App() {
  return (
    <ChakraProvider>
      <Flex height="full" alignItems="center" justifyContent="center">
        <Stack spacing="8" width="xl">
          <Center>
            <Heading>Payment Form</Heading>
          </Center>
          <Divider />
          <PaymentForm />
        </Stack>
      </Flex>
    </ChakraProvider>
  )
}

export default App
