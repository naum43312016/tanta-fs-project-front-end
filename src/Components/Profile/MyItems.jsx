import { Button } from "reactstrap"
import ItemCard from "../HomePage/ItemCards"
import '../../styles/MyItems.css'
import { useEffect, useState } from "react"
import axios from "axios"

const MyItems = (props) => {
    const [filter, setFilter] = useState("All")
    const [sellingCards, setSellingCards] = useState([]) //Getting user's cards
    const [purshasedCards, setPurshasedCards] = useState([]) //Getting user's cards

    const [currCategory, setCurrCategory] = useState('All')


    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const userID = localStorage.getItem('sessionID')
    useEffect(()=>{
        axios.get(`${BASE_URL}/user/${userID}`)
        .then(res => {
            const sellingItems = []
            res.data.items.map(item => {
                axios.get(`${BASE_URL}/item/${item}`)
                .then(res => sellingItems.push(res.data))
                .catch(err => console.error(err))
            })
            console.log('updated')
            setSellingCards(sellingItems)
        })

        axios.get(`${BASE_URL}/user/${userID}`)
        .then(res => {
            const purshasedItems = []
            res.data.purchasedItems.map(item => {
                axios.get(`${BASE_URL}/item/${item}`)
                .then(res => purshasedItems.push(res.data))
                .catch(err => console.error(err))
            })
            console.log('updated')
            setPurshasedCards(purshasedItems)
        })
        
    }, [])
    
    return (
        <div className="my-items-container mt-2">
            <div> </div>
            <div className="items-filter">
                <Button color="light" onClick={(e) => setFilter("All")}> All </Button>
                <Button color="light" onClick={(e) => setFilter("Offered")}> Selling </Button>
                <Button color="light" onClick={(e) => setFilter("Saved")}> Saved </Button>
                <Button color="light" onClick={(e) => setFilter("Purshased")}> Purshased </Button>
                <Button color="light" onClick={(e) => setFilter("Sold")}> Sold </Button>
            </div>
            <h3 className="mt-2">{filter}</h3>
            {filter=='All' && <ItemCard cards={[...sellingCards,...purshasedCards]} items={filter}/>}
            {filter=='Offered' && sellingCards && <ItemCard cards={sellingCards} items={filter}/>}
            {filter=='Purshased' && purshasedCards && <ItemCard cards={purshasedCards} items={filter}/>}  
        </div>
    )
}

export default MyItems