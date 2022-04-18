// import { SiEthereum } from 'react-icons/si'
// import { BsInfoCircle } from 'react-icons/bs'
import LoaderSm from '../../components/LoaderSm';
import Services from '../../components/Services';
import { useEffect, useState } from 'react';
import { checkIfTransactionsExists, sendTransaction, shortenAddress } from '../../utils/contract';
import { useMoralis } from 'react-moralis';
import TransactionsCard from '../../components/TransactionCard';
import dummyData from '../../utils/dummyData';
import { Connect } from '../../components';
const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input placeholder={placeholder} name={name} value={value} type={type} min={0.0001} step="0.0001" onChange={(e) => handleChange(e, name)} className='my-2 w-full p-2 outline-none bg-transparent text-white border border-gray-600 text-sm' />
)

function index() {
    const { user, isAuthenticated } = useMoralis()
    if (!isAuthenticated) return <Connect />
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState();
    const [transactions, setTransactions] = useState([]);

    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: '',
        currentAccount: user?.get('ethAddress')
    })
    const handleChange = (e, name) => {
        setFormData({ ...formData, [name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { addressTo, amount, message, keyword } = formData;
        if (!addressTo || !amount || !keyword || !message)
            return window.alert('Fill all details')
        else {
            const { success, count } = await sendTransaction(formData, setIsLoading)
            if (success) {
                setTransactionCount(count)
                setFormData({
                    addressTo: '',
                    amount: '',
                    keyword: '',
                    message: '',
                    currentAccount: user?.get('ethAddress')
                })
            }
        }
    }

    const fetchTransactions = async () => {
        const data = await checkIfTransactionsExists();
        setTransactions(data)
    }

    useEffect(() => {
        if (user) {
            formData.currentAccount = user.get('ethAddress')
            fetchTransactions();
        }
        setTransactionCount(localStorage.getItem('transactionCount'))
    }, [transactionCount, user])
    return (
        <>
            <div className='flex w-full justify-center items-center'>
                <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                    <div className="flex flex-1 justify-start flex-col mf:mr-10">
                        <h1 className='text-3xl sm:text-5xl text-white py-1'>Send Crypto <br />across the world</h1>
                        <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Explore the crypto world. buy and sell crypto coins easily, trusted cryptoon to be your crypto market partner</p>
                        {/* {! && <button type="button" onClick={() => connectWallet()} className='inline-flex max-w-max flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] text-white text-base font-bold'>Connect Wallet</button> */}
                        {/* } */}
                        <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
                            <div className={`rounded-tl-2xl ${commonStyles}`}>
                                Reliability
                            </div>
                            <div className={commonStyles}>
                                Security
                            </div>
                            <div className={`rounded-tr-2xl ${commonStyles}`}>
                                Etherium
                            </div>
                            <div className={`rounded-bl-2xl ${commonStyles}`}>
                                Web 3.0
                            </div>
                            <div className={commonStyles}>
                                Low fess
                            </div>
                            <div className={`rounded-br-2xl ${commonStyles}`}>
                                Blockchain
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
                        <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                            <div className="flex justify-between flex-col w-full h-full">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                                        <img className='h-7 filter invert' src='/assets/icons/eth-logo.svg' alt='' />
                                        {/* <SiEthereum fontSize={21} color='#fff' /> */}
                                    </div>
                                    {/* <BsInfoCircle fontSize={17} color="#fff" /> */}
                                </div>
                                <div>
                                    <p className='text-white font-light text-sm'>
                                        {isAuthenticated && shortenAddress(user.get('ethAddress'))}
                                    </p>
                                    <p className='text-white font-semibold text-lg mt-1'>
                                        Etherium
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='p-5 sm:p-8 sm:w-96 w-full flex flex-col justify-start items-center border border-teal-900 rounded-lg mb-10 backdrop-filter backdrop-blur bg-teal-800 bg-opacity-10 focus-within:bg-opacity-20'>
                            <Input placeholder='Address To' name="addressTo" type="text" value={formData?.addressTo} handleChange={handleChange} />
                            <Input placeholder='Amount (ETH)' name="amount" type="number" value={formData?.amount} handleChange={handleChange} />
                            <Input placeholder='Keyword (Gif)' name="keyword" type="text" value={formData?.keyword} handleChange={handleChange} />
                            <Input placeholder='Enter Message' name="message" type="text" value={formData?.message} handleChange={handleChange} />

                            <div className='h-[1px] w-1/2 mx-auto bg-teal-500 my-2 rounded-lg ' />
                            {isLoading ? <LoaderSm /> : <button type='button' onClick={handleSubmit} disabled={isLoading} className='text-white w-full mt-2 border-[1px] p-2 border-gray-500 rounded-full cursor-pointer hover:bg-teal-600 transition-colors duration-100 text-lg font-semibold'>Send Now </button>}
                        </div>
                    </div>

                </div>
            </div>

            <Services />

            <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
                <div className="flex flex-col md:p-12 py-12 px-4">
                    {isAuthenticated ? (
                        <>
                            <h3 className="text-white text-3xl text-center my-2">
                                Latest Transactions
                            </h3>
                            <div className="gap-10 flex flex-wrap justify-evenly items-center mt-10">
                                {(transactions?.length > 0 ? [...transactions] : [...dummyData])?.reverse().map((transaction, i) => (
                                    <TransactionsCard key={i} {...transaction} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <h3 className="text-white text-3xl text-center my-2">
                            Connect your account to see the latest transactions
                        </h3>
                    )}

                </div>
            </div>
        </>
    )
}

export default index