import React, { Component } from 'react';
import styled from 'styled-components'
import { Box, Card, Flex, Text } from 'rebass'
import Wrapper from '../components/Theme'
import Title from '../components/Title'
import Footer from '../components/Footer'
import Panel from '../components/Panel'
import Loader from '../components/Loader'
import { Header, Divider } from '../components'
import { toNicePrice } from '../helpers/'


export const ListItem = styled(Box)`
  &:hover {
    background-color: rgba(43, 43, 43, 0.05);
    cursor: pointer;
  }
`

class HomePage extends Component {

  async componentDidMount() {
    this.props.poolsListStore.fetchPools()
  }

  render() {
    const { data } = this.props.poolsListStore.state;
    const displayData = data.map(el => {
      return {
        market: el.underlying_name,
        market_size: Number(el.cash.value).toFixed(2),
        apr_rate: (Number(el.supply_rate.value) * 100).toFixed(2),
        borrow_rate: (Number(el.borrow_rate.value) * 100).toFixed(2)
      }
    });
    if (data.length === 0)
      return (
        <Wrapper>
          <Loader fill="true" />
        </Wrapper>
      )
    return (
      <Wrapper>
        <Header px={24} py={3} bg={['mineshaft', 'transparent']} color={['white', 'black']}>
          <Title />
        </Header>
        <Panel width={[1, 1, 1, 1 / 2]} m="0 auto" color="black" bg="white" className="-transition">
          <Card
            fontWeight='bold'
            p={4}
            borderRadius={8}
            boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'
          >
            <Flex flexWrap="wrap" justifyContent="space-between">
              <Box>
                <Text color="textDim" textAlign="right" fontWeight='bold'
                  p={20} fontSize={[12, 16]}>
                  Market
                    </Text>
              </Box>
              <Box>
                <Text color="textDim" textAlign="right" fontWeight='bold'
                  p={20} fontSize={[12, 16]}>
                  Market Size
                    </Text>
              </Box>
              <Box>
                <Text color="textDim" textAlign="right" fontWeight='bold'
                  p={20} fontSize={[12, 16]}>
                  Supply APR
                    </Text>
              </Box>
              <Box>
                <Text color="textDim" textAlign="right" fontWeight='bold'
                  p={20} fontSize={[12, 16]}>
                  Borrow APR
                    </Text>
              </Box>
            </Flex>
            {displayData.map(el => (
              <ListItem key={el.market}>
                <Divider />
                <Flex flexWrap="wrap" p={12} justifyContent="space-between">
                  <Box pr={24} width={1 / 4}>
                    <Text textAlign="left" fontWeight='bold'
                      p={20} fontSize={[12, 16]}>
                      {el.market}
                    </Text>
                  </Box>
                  <Box pr={24} width={1 / 4}>
                    <Text textAlign="right" p={20} fontSize={[12, 16]}>
                      ${toNicePrice(el.market_size)}
                    </Text>
                  </Box>
                  <Box pr={24} width={1 / 4}>
                    <Text textAlign="right" p={20} fontSize={[12, 16]} >
                      {el.apr_rate}%
                      </Text>
                  </Box>
                  <Box pr={24} width={1 / 4}>
                    <Text textAlign="right" p={20} fontSize={[12, 16]} >
                      {el.borrow_rate}%
                      </Text>
                  </Box>
                </Flex>
              </ListItem>
            ))}
          </Card>
        </Panel>
        <Footer />
      </Wrapper >
    );
  };
}

export default HomePage