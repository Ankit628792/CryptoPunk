import React, { useEffect, useState } from 'react'
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Connect } from '../../components';
import TransactionsCard from '../../components/TransactionCard';
function transactions() {
    const Web3Api = useMoralisWeb3Api();
    const { user, isAuthenticated } = useMoralis()
    if (!isAuthenticated) return <Connect />
    const [transactions, setTransactions] = useState()
    const fetchTransactions = async () => {
        const options = {
            chain: "rinkeby",
            address: user.get('ethAddress'),
            order: "desc",
            from_block: "0",
            limit: 100
        };
        const { result } = await Web3Api.account.getTransactions(options);
        setTransactions(result)
    };

    useEffect(() => {
        user && fetchTransactions()
    }, [user])
    
    return (
        <>
            <h1 className='capitalize mt-5 text-center text-3xl sm:text-4xl 2xl:text-5xl font-bold'>Latest Transactions</h1>

            <div className='flex flex-wrap p-5 lg:p-10 items-center justify-evenly gap-10'>
                {transactions?.length > 0 && transactions?.reverse().map((transaction, i) => transaction && <TransactionsCard key={i} addressTo={transaction.to_address} addressFrom={transaction.from_address} timestamp={new Date(transaction.block_timestamp).toLocaleString()} amount={parseInt(transaction.value) / (10 ** 18)} />
                )}
            </div>
        </>
    )
}

export default transactions