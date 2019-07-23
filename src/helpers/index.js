import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'

BigNumber.set({ EXPONENTIAL_AT: 50 })

export const BASE_URL = 'https://uniswap-api.loanscan.io/'
export const BASE_POOLS_URL = 'https://api.compound.finance/api/'
export const BASE_ICONS_URL = 'https://static.coincap.io/assets/icons/'

export const DEFAUL_ICON_LOGO = 'https://coincap.io/static/logo_mark.png'

export const toNiceDate = date => dayjs(date).format('MMM DD')

export const toNiceDateYear = date => dayjs(date).format('MMMM DD, YYYY')

export const toNicePrice = price => {
  if (price > 1000000) return `${Number(price / 1000000).toFixed(2)}M`
  return `${Number(price / 1000).toFixed(2)}k`
}
export const notFoundLogo = ["WBTC"];
export const isWeb3Available = async () => {
  /* eslint-disable */
  if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3(ethereum)
    try {
      await ethereum.enable()
      return true
    } catch (error) {
      return false
    }
  } else if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider)
    return true
  } else {
    return false
  }
  /* eslint-enable */
}
export const homeFilters = [
  {
    label: 'Market size ASC',
    value: 'mkt_asc',
    filter: (a, b) => a.cash.value - b.cash.value
  },
  {
    label: 'Market size DESC',
    value: 'mkt_desc',
    filter: (a, b) => b.cash.value - a.cash.value
  },
  {
    label: 'Supply APR ASC',
    value: 'supply_asc',
    filter: (a, b) => a.supply_rate.value - b.supply_rate.value
  },
  {
    label: 'Supply APR DESC',
    value: 'supply_desc',
    filter: (a, b) => b.supply_rate.value - a.supply_rate.value
  },
  {
    label: 'Borrow APR ASC',
    value: 'borrow_asc',
    filter: (a, b) => a.borrow_rate.value - b.borrow_rate.value
  },
  {
    label: 'Borrow APR DESC',
    value: 'borrow_desc',
    filter: (a, b) => b.borrow_rate.value - a.borrow_rate.value
  },
];

export const toK = (num, fixed) => {
  const formatter = divideBy => (fixed === true ? Number(num / divideBy).toFixed(4) : Number(num / divideBy))

  if (num > 999999 || num < -999999) {
    return `${formatter(1000000)}M`
  } else if (num > 999 || num < -999) {
    return `${formatter(1000)}K`
  } else {
    return formatter(1)
  }
}

export const setThemeColor = theme => document.documentElement.style.setProperty('--c-token', theme || '#333333')

export const Big = number => new BigNumber(number)

export const urls = {
  showTransaction: tx => `https://etherscan.io/tx/${tx}/`,
  showAddress: address => `https://www.etherscan.io/address/${address}/`,
  showBlock: block => `https://etherscan.io/block/${block}/`
}

export const formatTime = unix => {
  const now = dayjs()
  const timestamp = dayjs.unix(unix)

  const inSeconds = now.diff(timestamp, 'second')
  const inMinutes = now.diff(timestamp, 'minute')
  const inHours = now.diff(timestamp, 'hour')
  const inDays = now.diff(timestamp, 'day')

  if (inHours >= 24) {
    return `${inDays} ${inDays === 1 ? 'day' : 'days'} ago`
  } else if (inMinutes >= 60) {
    return `${inHours} ${inHours === 1 ? 'hour' : 'hours'} ago`
  } else if (inSeconds >= 60) {
    return `${inMinutes} ${inMinutes === 1 ? 'minute' : 'minutes'} ago`
  } else {
    return `${inSeconds} ${inSeconds === 1 ? 'second' : 'seconds'} ago`
  }
}
