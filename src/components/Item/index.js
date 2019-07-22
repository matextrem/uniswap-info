import React from 'react'
import { Box, Text } from 'rebass'


const Item = ({ title, styles }) => (
    <Box pr={24} width={1 / 4}>
        <Text
            {...styles}
            p={20} fontSize={[12, 16]}>
            {title}
        </Text>
    </Box>
)

export default Item