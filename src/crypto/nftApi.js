import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseUrl = 'http://localhost:3000'

const createRequest = (url) => ({ url, headers: apiHeaders })

export const nftApi = createApi({
    reducerPath: 'nftApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getNFTs: builder.query({
            query: (count) => createRequest(`/api/nft?limit=${count}`),
        }),

        getNFTDetail: builder.query({
            query: (nftId) => createRequest(`/api/nft?id=${nftId}`),
        }),
    }),
});


export const {
    useGetNFTsQuery,
    useGetNFTDetailQuery
} = nftApi