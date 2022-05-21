import { useEffect, useState } from 'react'
import NFT from './NFT'
import Router from 'next/router';
import Loader from './Loader';


function NFTs({ home, owner, nftList }) {

    const [nft, setNft] = useState('')

    const [category, setCategory] = useState()

    useEffect(() => {
        fetch(`/api/usercollection`).then((data) => {
            return data.json();
        }).then((resp) => {
            setCategory(resp.data);
        })
    }, []);

    return (
        <section className={`p-5 sm:p-10 ${home && 'sm:my-20'} text-center`}>
            <h1 className='capitalize text-3xl sm:text-4xl 2xl:text-5xl font-semibold text-center'>{owner ? `My NFTs` : `Trending in all category`}</h1>
            {!owner && <p className='text-base sm:text-lg 2xl:text-xl max-w-3xl mx-auto text-zinc-300 text-center'>
                Top trending 🚀 and hot 🔥 NFT for you, start buying now
            </p>}
            {!home && !owner && category && <div className='scrollbar__hidden overflow-x-auto flex items-center gap-x-5 md:gap-x-10 py-5 mt-5 max-w-7xl mx-auto'>
                <span onClick={() => setNft('')} value='' className={`capitalize bg-teal-600 text-white  font-medium px-4 py-1.5 cursor-pointer rounded-3xl text-base md:text-lg hover:scale-105 transition-transform duration-150 ease-out ${!nft && 'bg-gray-50 text-gray-700'}`}>All</span>
                {category?.map(item =>
                    <span onClick={() => setNft(item.name)} key={item._id} value={item.name} className={`capitalize bg-teal-600 text-white font-medium px-4 py-1.5 min-w-max cursor-pointer rounded-3xl text-base md:text-lg hover:scale-105 transition-transform duration-150 ease-out ${item.name == nft && 'bg-gray-50 text-gray-700'}`}>
                        {item.name}
                    </span>
                )}
            </div>}
            {nftList?.length > 0 ? <div className='sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center items-stretch justify-evenly max-w-7xl mx-auto flex-wrap gap-12 lg:gap-y-16'>
                {nftList.map((item, i) => (nft === item?.metadata?.collection || nft === '') && < NFT key={i + i} nft={item} />)}
            </div> : <Loader />}
            {home && <button onClick={() => Router.push('/nft/assets')} className='text-teal-400 border-2 border-teal-400 hover:bg-teal-600 hover:text-white hover:scale-105 px-5 py-2 rounded-3xl mt-8 text-base sm:text-lg lg:text-xl font-medium transition-all duration-200 ease-out group flex items-center mx-auto'>View More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-10 transform scale-x-110 group-hover:scale-x-125 origin-left transition-transform duration-200 ease-out " viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>}
        </section>
    )
}

export default NFTs