import { Button } from "reactstrap"
import ItemCard from "../HomePage/ItemCards"
import '../../styles/MyItems.css'
import { useEffect, useState } from "react"
import axios from "axios"
import dotenv from 'dotenv'

const MyItems = (props) => {
    const [filter, setFilter] = useState("All")
    const [cards, setCards] = useState(null) //Getting user's cards
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const userID = localStorage.getItem('sessionID')
    useEffect(()=>{
        axios.get(`${BASE_URL}/user/${userID}`)
        .then(res => setCards(res.data.items))
    }, [])
    return (
        <div className="my-items-container mt-2">
            <div className="items-filter">
                <Button color="light" onClick={(e) => setFilter("All")}> All </Button>
                <Button color="light" onClick={(e) => setFilter("Offered")}> Selling </Button>
                <Button color="light" onClick={(e) => setFilter("Saved")}> Saved </Button>
                <Button color="light" onClick={(e) => setFilter("Sold")}> Sold </Button>
            </div>
            {filter && <h3 className="mt-2">{filter}</h3>}
            {/* {cards && <ItemCard cards={cards} items={filter}/>} */}
        </div>
    )
}

export default MyItems