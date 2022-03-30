import Router from "next/router"
import { Cards } from "../components"
import { useMoralis } from "react-moralis";

const items = [
  {
    id: 1,
    imgSrc: '/assets/icons/predict.png',
    heading: "Predict Crypto market",
    desc: "Easily make predictions through our intuitive interface"

  },
  {
    id: 2,
    imgSrc: '/assets/icons/nft.png',
    heading: "List & Collect NFTs",
    desc: "Compete against fans and even run your own contests with us"

  },
  {
    id: 3,
    imgSrc: '/assets/icons/transfer.png',
    heading: "Send & Recieved Crypto",
    desc: "One of a kind prediction platform focused on entertainment events"

  },
  {
    id: 4,
    imgSrc: '/assets/icons/market.png',
    heading: "Crypto Market Analysis",
    desc: "Your deposits are securely maintained in Coinbase wallet"

  },
]

const details = [
  {
    id: 1,
    imgSrc: '/assets/images/prediction.svg',
    heading: 'Prediction',
    desc: 'Predict the market by our latest market details and news',
    link: '/market/'
  },
  {
    id: 2,
    imgSrc: '/assets/images/nft.svg',
    heading: 'NFT',
    desc: 'Buy and sell NFTs just in a click',
    link: '/nft/'
  },
  {
    id: 3,
    imgSrc: '/assets/images/analyse.svg',
    heading: 'Analyse',
    desc: 'Review and analyse market to invest in crypto',
    link: '/market/'
  },
  {
    id: 4,
    imgSrc: '/assets/images/transfer.svg',
    heading: 'Transfer',
    desc: 'Transafer and recieve crypto money in your crypto wallet',
    link: '/'
  }
]


const Home = () => {
  const { authenticate, isAuthenticated, logout } = useMoralis();

  return (
    <>
      <section className='flex items-center justify-center p-5 opac'>
        <img style={{ zIndex: -1 }} className='absolute p-10 w-full h-full m-0 object-contain filter saturate-200 overflow-hidden' src="/ani.svg" alt="" />
        <div className='text-center p-5'>
          <p className='text-base sm:text-lg text-teal-400'>
            Built on blockchain. powered by you
          </p>
          <h1 className='text-4xl sm:text-5xl 2xl:text-6xl max-w-xl 2xl:max-w-3xl  font-semibold'>
            The Future of Perpetuals <br className='hidden sm:inline-block' /> is Here
          </h1>
          <p className='text-base sm:text-lg 2xl:text-xl max-w-xl 2xl:max-w-3xl text-zinc-300'>
            Start investing in crypto and in NFTs, the crypto market is here
          </p>
          {isAuthenticated ?
            <button className='btn' onClick={() => logout()}>Disconnect Wallet</button>
            :
            <button className='btn' onClick={() => authenticate({ provider: "metamask", signingMessage: 'Connect to CryptoPunk' })}>Connect Wallet</button>
          }
        </div>
      </section>

      <Cards title='Take full control of your crypto' description='' items={items} />

      {details?.map(item =>
        <section key={item.id} className={`px-5 sm:px-10 py-10 lg:flex lg:${item.id % 2 != 0 && 'flex-row-reverse'} items-center justify-around max-w-6xl 2xl:max-w-7xl mx-auto`}>
          <div className='w-full text-center lg:text-left p-5 max-w-xl 2xl:max-w-2xl mx-auto'>
            <h1 className='capitalize text-3xl sm:text-4xl 2xl:text-5xl font-bold'>Built on ETH. <br />Owned by Your.</h1>
            <p className='text-base sm:text-lg 2xl:text-xl max-w-3xl mx-auto text-zinc-300'>{item.desc}</p>
            {/* <p className='text-base sm:text-lg 2xl:text-xl max-w-3xl mx-auto text-zinc-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, impedit? Tenetur illum cum tempora rem voluptates velit accusantium consectetur autem?</p> */}
          </div>
          <div className='w-full p-5 grid place-items-center'>
            <img className='glow-sm h-full max-h-96 object-contain' src={item.imgSrc} alt="" />
          </div>
        </section>
      )}

    </>
  )
}

export default Home
