import { Cards, Collections, NFTs } from '../../components'

const items = [
  {
    id: 1,
    imgSrc: '/assets/icons/wallet.png',
    heading: "Set up your wallet",
    desc: "Login using your crypto wallet account to sell and buy NFTs",
  },
  {
    id: 2,
    imgSrc: '/assets/icons/artwork.png',
    heading: "Create Artwork",
    desc: "Create your collection. Add profile & banner images and set a secondary sales free"
  },
  {
    id: 3,
    imgSrc: '/assets/icons/upload.png',
    heading: "Upload",
    desc: "Upload your work, customize your NFTs with some details."

  },
  {
    id: 4,
    imgSrc: '/assets/icons/list.png',
    heading: "Listing",
    desc: "Set up and list them to sell. You choose how you want to sell your NFTs and we help you sell them!"

  },
]

const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function index({ collectionList, nftList }) {
  return (
    <>
      <section className='p-10 text-center flex flex-col items-center justify-center relative'>
        <h1 className='text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold max-w-2xl 2xl:max-w-3xl'><span className='text-teal-300'>Discover</span> Arts, Collect and Sell Rare <span className='text-teal-300'>NFTs</span></h1>
        <p className='max-w-3xl text-lg md:text-xl text-gray-400'>The amazing digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.</p>
      </section>

      <Collections home collectionList={collectionList} />

      <Cards title='Create and sell your NFTs ✨' description='In just some following steps' items={items} />

      <NFTs home nftList={nftList} />

      {/* <section className='p-10 sm:my-20 text-center'>
        <h1 className='capitalize text-3xl sm:text-4xl 2xl:text-5xl font-semibold text-center'>Top Creators of this week</h1>
        <p className='text-base sm:text-lg 2xl:text-xl max-w-3xl mx-auto text-zinc-300 text-center'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, aspernatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, beatae!
        </p>
        <div className='max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-4 md:gap-8'>
          {users.map(user =>
            <div key={user} className='py-2 pl-3 pr-8 m-2 min-w-max max-w-xs flex items-center gap-x-4 rounded-lg backdrop-filter backdrop-blur bg-teal-800 hover:bg-opacity-30 hover:scale-105 transition-all duration-150 ease-out bg-opacity-10 '>
              <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className='w-12 md:w-16 h-12 md:h-16 rounded-2xl object-cover m-1' alt="" />
              <div>
                <h1 className='text-base md:text-lg text-white mb-1'>TorikHanna</h1>
                <p className='text-sm md:text-base text-gray-400 mb-0 text-left'>💲14,821</p>
              </div>
            </div>
          )}
        </div>
      </section> */}
    </>
  )
}

export default index

export async function getServerSideProps() {
  const collection = await fetch(`${process.env.host}/api/collection?limit=6`).then(res => res.json());
  const nft = await fetch(`${process.env.host}/api/nft?limit=8`).then(res => res.json())
  return {
    props: {
      collectionList: collection?.data,
      nftList: nft?.data
    }
  }
}