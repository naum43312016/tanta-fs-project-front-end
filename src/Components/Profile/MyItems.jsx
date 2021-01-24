import { Button } from "reactstrap"
import ItemCards from "../HomePage/ItemCards"
import '../../Styles/MyItems.css'
import { useState, useEffect } from "react"
import axios from 'axios';
import BASE_URL from '../../Tools/URLs';

const MyItems = () => {
    const [filter, setFilter] = useState("Selling")
    const [cards, setCards] = useState([])
    // const [sellingItems, setSellingItems] = useState([]);
    // const [purchasedItems, setPurchasedItems] = useState([]);
    // const [favoriteItems, setFavoriteItems] = useState([]);
    // const [soldItems, setSoldItems] = useState([]);


    useEffect(() => {
        console.log('updated')
        axios.get(`${BASE_URL}/user/filter?type=${filter.toLowerCase()}`)
            .then(res => setCards(res))
            .catch(err => console.log(err))
    }, [filter])


    return (
        <div className="my-items-container mt-2">
            <div> </div>
            <div className="items-filter">
                <Button color="light" onClick={(e) => setFilter("Selling")}>Selling</Button>
                <Button color="light" onClick={(e) => setFilter("Favourites")}>Favourites</Button>
                <Button color="light" onClick={(e) => setFilter("Purchased")}>Purchased</Button>
                <Button color="light" onClick={(e) => setFilter("Sold")}>Sold</Button>
            </div>
            <h3 className="mt-2">{filter}</h3>
            <ItemCards cards={cards} />
        </div>
    )
}

export default MyItems