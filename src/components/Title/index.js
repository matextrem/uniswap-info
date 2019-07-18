import React from 'react'
import { Text, Flex } from 'rebass'

import Emoji from '../Emoji'

export const Title = ({ title }) => (
  <Flex alignItems="center">
    <Text fontSize="1.5rem" lineHeight="1">
      <Emoji symbol="🦄" label="Unicorn" />
    </Text>
    <Text fontWeight={500} mx="1rem" lineHeight="1.5rem">
      {title}
    </Text>
  </Flex>
)

export default Title
