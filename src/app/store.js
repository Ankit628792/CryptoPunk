import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../crypto/cryptoApi";
import { cryptoNewsApi } from "../crypto/cryptoNewsApi";
import { cryptoExchangeApi } from "../crypto/cryptoExchangeApi";
import { nftApi } from "../crypto/nftApi";

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [cryptoExchangeApi.reducerPath]: cryptoExchangeApi.reducer,
        [nftApi.reducerPath]: nftApi.reducer,
    }
})