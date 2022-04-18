// import React, { useContext, useState } from 'react'
// import { TransactionContext } from '../../context/TransactionContext';
// import { pinFileToIPFS, pinJSONToIPFS, testAuthentication } from '../../utils/data';
// import { mintNFT } from '../../utils/nftContract';

// function NFT() {
//     const { currentAccount } = useContext(TransactionContext)
//     const [file, setFile] = useState()
//     const [data, setData] = useState({
//         name: '',
//         description: ''
//     })
//     const handleChange = (e) => {
//         e.preventDefault();
//         setData({ ...data, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             const res = await testAuthentication();
//             if (res.status === 200) {
//                 const file1 = await pinFileToIPFS(file)

//                 //Create NFT metadata JSON
//                 const metadata = {
//                     image: `https://gateway.pinata.cloud/ipfs/${file1?.IpfsHash}`,
//                     name: data.name ?? '',
//                     description: data.description ?? '',
//                     attributes: [
//                         { "trait_type": "color", "value": "brown" },
//                         { "trait_type": "background", "value": "white" }
//                     ]
//                 }
//                 const pinataJSONBody = {
//                     pinataContent: metadata
//                 };
//                 const file2 = await pinJSONToIPFS(pinataJSONBody)

//                 const metadataUrl = `https://gateway.pinata.cloud/ipfs/${file2?.IpfsHash}`;
//                 const response = await mintNFT(metadataUrl, currentAccount)
//                 console.log("NFT Contract details \n", response)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     return (
//         <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
//             <div className="flex flex-col md:p-12 py-12 px-4">
//                 {currentAccount ? (
//                     <>
//                         <h3 className="text-white text-3xl text-center my-2">
//                             Mint NFT 
//                         </h3>
//                         <form onSubmit={handleSubmit}>
//                             <input type="text" value={data.name} onChange={handleChange} name='name' placeholder='NFT name' />
//                             <input type="text" value={data.description} onChange={handleChange} name='description' placeholder='NFT description' />
//                             <input type="file" onChange={(e) => {
//                                 const data = e.target.files[0];
//                                 setFile(data)
//                             }} name='image' />
//                             <button type="submit" className='text-white bg-red'>Min NFT</button>
//                         </form>
//                     </>
//                 ) : (
//                     <h3 className="text-white text-3xl text-center my-2">
//                         Connect your account to mint a nft
//                     </h3>
//                 )}



//             </div>
//         </div>
//     )
// }

// export default NFT