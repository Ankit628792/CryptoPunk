import useFetch from '../hooks/useFetch'
import { shortenAddress } from '../utils/contract';
const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
    const gifUrl = useFetch({ keyword });

    return (
        <div className=" bg-teal-900 rounded-xl flex flex-1 min-w-[280px] max-w-sm flex-col p-3 hover:shadow-2xl">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="display-flex justify-start w-full mb-6 p-2 text-lg">
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
                        <p className="text-white text-base">From: {shortenAddress(addressFrom ?? '0x00000000000000000000000000000')}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
                        <p className="text-white text-base">To: {shortenAddress(addressTo ?? '0x00000000000000000000000000000')}</p>
                    </a>
                    <p className="text-white text-base">Amount: {amount} ETH</p>
                    {message && (
                        <>
                            <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}
                </div>
                {keyword && <img
                    src={gifUrl || url}
                    alt="nature"
                    className="w-full max-w-xs h-60 rounded-md shadow-lg object-cover"
                />}
                <div className="bg-black p-3 px-5 min-w-max rounded-3xl -mt-5 shadow-2xl grid place-items-center">
                    <p className="text-teal-400 font-bold mb-0">{timestamp}</p>
                </div>
            </div>
        </div>
    );
};

export default TransactionsCard