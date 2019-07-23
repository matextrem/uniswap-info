import React, { Component } from 'react';
import styled from 'styled-components'
import { Box, Card, Flex, Text } from 'rebass'
import Wrapper from '../components/Theme'
import Title from '../components/Title'
import Footer from '../components/Footer'
import Panel from '../components/Panel'
import Select from '../components/Select'
import Loader from '../components/Loader'
import Item from '../components/Item'
import { Header, Divider } from '../components'
import { BASE_ICONS_URL, DEFAUL_ICON_LOGO, toNicePrice, notFoundLogo, homeFilters } from '../helpers/'


export const ListItem = styled(Box)`
  &:hover {
    background-color: rgba(43, 43, 43, 0.05);
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  }
`

export const Logo = styled.img`
  width: 24px;
  height: 24px;
  position: relative;
  float: left;
  bottom: 5px;
  right: 10px;
}
  `

class HomePage extends Component {

  async componentDidMount() {
    this.props.poolsListStore.fetchPools()
  }

  getTitle(symbol) {
    let uri = `${BASE_ICONS_URL}${symbol.toLowerCase()}@2x.png`;
    if (notFoundLogo.includes(symbol))
      uri = DEFAUL_ICON_LOGO;
    return <div style={{ position: 'relative' }}>
      <Logo src={uri} />
      <span>{symbol}</span>
    </div>
  }

  render() {
    const { data } = this.props.poolsListStore.state;
    const fields = ["Market", "Market Size", "Supply APR", "Borrow APR"];
    const displayData = data.map(el => {
      return {
        market: el.underlying_name,
        market_size: Number(el.cash.value).toFixed(2),
        apr_rate: (Number(el.supply_rate.value) * 100).toFixed(2),
        borrow_rate: (Number(el.borrow_rate.value) * 100).toFixed(2),
        symbol: el.underlying_symbol
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
          <Title title="Liquidity pools list" />
          <Select
            placeholder="Select a filter"
            options={homeFilters}
            onChange={select => this.props.poolsListStore.filterPools(select.filter)}
          />
        </Header>
        <Panel width={[1, 1, 1, 1 / 2]} m="0 auto" color="black" bg="white" className="-transition">
          <Card
            fontWeight='bold'
            p={4}
            borderRadius={8}
            boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'
          >
            <Flex flexWrap="wrap" justifyContent="space-between">
              {fields.map(field => (
                <Box key={field}>
                  <Text color="textDim" textAlign="right" fontWeight='bold'
                    p={20} fontSize={[12, 16]}>
                    {field}
                  </Text>
                </Box>
              ))}
            </Flex>
            {displayData.map(el => (
              <ListItem disabled={el.symbol === "ETH"} key={el.market} onClick={() => el.symbol !== "ETH" && this.props.history.push(`/${el.symbol}`)}>
                <Divider />
                <Flex flexWrap="wrap" p={12} justifyContent="space-between">
                  <Item title={this.getTitle(el.symbol)} styles={{ textAlign: "left", fontWeight: 'bold' }} />
                  <Item title={toNicePrice(el.market_size)} styles={{ textAlign: "left" }} />
                  <Item title={`${el.apr_rate}%`} styles={{ textAlign: 'right' }} />
                  <Item title={`${el.borrow_rate}%`} styles={{ textAlign: 'right' }} />
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