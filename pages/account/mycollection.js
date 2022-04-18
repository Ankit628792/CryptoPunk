import { useMoralis } from "react-moralis"
import { Connect } from "../../components"

function mycollection() {
  const { user, isAuthenticated } = useMoralis()
  if (!isAuthenticated) return <Connect />

  return (
    <div>mycollection</div>
  )
}

export default mycollection