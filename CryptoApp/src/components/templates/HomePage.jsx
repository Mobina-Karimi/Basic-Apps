import { useState } from "react"
import { useEffect } from "react"
import { getCoinList } from "../../services/CryptoApi"
import TableCoin from "../modules/TableCoin"
import Pagination from "../modules/Pagination"
import Search from "../modules/Search"
import Chart from "../modules/Chart"

function HomePage() {
    const[coins, setCoins] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState("USD")
    const [chart, setChart] = useState(null)

    useEffect(()=>{
        const getData = async() => {
            setIsLoading(true)
            const res = await fetch(getCoinList(page, currency))
            const json = await res.json()
            setCoins(json)
            setIsLoading(false)
        }
        getData()
    },[page, currency])
  return (
    <div>
        <Search currency={currency} setCurrency={setCurrency}/>
        <TableCoin 
          coins={coins} 
          isLoading={isLoading} 
          currency={currency} 
          setChart={setChart}
        />
        <Pagination page={page} setPage={setPage}/>
        {!!chart && <Chart chart={chart} setChart={setChart}/>}
    </div>
  )
}

export default HomePage