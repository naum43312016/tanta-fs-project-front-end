import { Button } from "reactstrap"
import ItemCards from "../HomePage/ItemCards"
import '../../Styles/MyItems.css'
import { useState, useEffect } from "react"
import axios from 'axios';
import BASE_URL from '../../Tools/URLs';

const MyItems = () => {
    const [filter, setFilter] = useState("Offered")
    const [sellingItems, setSellingItems] = useState([]);
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [soldItems, setSoldItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [filteredArray, setFilteredArray] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get(BASE_URL + '/home/get-all-items')
            .then(res => setAllItems(res.data))
            .catch(err => null);
    }, [])

    useEffect(() => {
        axios.get(BASE_URL + `/user/filter?type=${filter.toLowerCase()}`, { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => setCards(allItems.filter(item => res.data.includes(item._id))))
            .catch(err => console.log("Couldn't get filtered items"));
    }, [filter])

    return (
        <div className="my-items-container mt-2">
            <div> </div>
            <div className="items-filter">
                <Button color="light" onClick={() => setFilter("Selling")}> Selling </Button>
                <Button color="light" onClick={() => setFilter("Favorites")}> Saved </Button>
                <Button color="light" onClick={() => setFilter("Purchased")}> Purshased </Button>
                <Button color="light" onClick={() => setFilter("Sold")}> Sold </Button>
            </div>
            <h3 className="mt-2">{filter}</h3>
            <ItemCards cards={cards} />
        </div>
    )
}

export default MyItems