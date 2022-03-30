// https://api.coingecko.com/api/v3/exchanges
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiHeaders = {
    'Accept': 'application/json'
}

const baseUrl = 'https://api.coingecko.com/api/v3'

const createRequest = (url) => ({ url, headers: apiHeaders })

export const cryptoExchangeApi = createApi({
    reducerPath: 'cryptoExchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        })
    }),
});

export const { useGetExchangesQuery } = cryptoExchangeApi