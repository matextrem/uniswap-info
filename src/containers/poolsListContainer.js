import { Container } from 'unstated'

import { BASE_POOLS_URL } from '../helpers'

export class PoolsListContainer extends Container {
    state = {
        data: [],
    }

    async fetchPools() {
        try {
            const data = await fetch(`${BASE_POOLS_URL}v2/ctoken`)

            if (!data.ok) {
                throw Error(data.status)
            }

            const json = await data.json()

            this.setState({
                data: json.cToken
            })
        } catch (err) {
            console.log('error: ', err)
        }
    }
}