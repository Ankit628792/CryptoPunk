import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { Collections, Connect, Loader } from "../../components"

function mycollection() {
  const { user, isAuthenticated } = useMoralis()
  if (!isAuthenticated) return <Connect />

  const [collectionList, setCollectionList] = useState(null)

  useEffect(() => {
    user && fetch(`/api/collection?limit=100&walletAddress=${user?.get('ethAddress')}`).then(res => res.json()).then(data => setCollectionList(data?.data)).catch(e => console.log(e))
  }, [user])


  return (
    <>
      {
        collectionList ?
          <Collections owner collectionList={collectionList} />
          : <Loader />
    }
    </>
  )
}

export default mycollection

// export async function getServerSideProps() {

//   const collection = await fetch(`${process.env.host}/api/collection?limit=100`).then(res => res.json());
//   return {
//     props: {
//       collectionList: collection?.data,
//     }
//   }
// }