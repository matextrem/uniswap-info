import React from 'react'
import { Flex, Box, Text } from "rebass";

const Table = ({ columns, data }) => (
    <Box width={[1, 3 / 4, 2 / 3, 1]}>
        <Flex flexWrap="wrap">
            {data.map((item, index) => {
                return (
                    <Box pr={24} width={1 / columns}>
                        <Text fontSize={14} color={index < columns ? "text" : "token"} className="-transition" lineHeight={1.4} fontWeight={500}>
                            {item}
                        </Text>
                    </Box>
                );
            })}
        </Flex>
    </Box>
);

export default Table;