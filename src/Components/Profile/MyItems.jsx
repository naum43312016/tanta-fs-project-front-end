import { Button } from "reactstrap"
import ItemCards from "../HomePage/ItemCards"
import '../../Styles/MyItems.css'
import { useState, useEffect } from "react"
import axios from 'axios';
import BASE_URL from '../../Tools/URLs';

const MyItems = () => {
    const [filter, setFilter] = useState("Selling")
    const [allItems, setAllItems] = useState([]);
    const [allPurchasedItems, setAllPurchasedItems] = useState();
    const [cards, setCards] = useState([]);

    const fetchFilteredItems = (array, initialRender) => {
        axios.get(BASE_URL + `/user/filter?type=${initialRender ? initialRender.toLowerCase() : filter.toLowerCase()}`, { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => setCards(array.filter(item => res.data.includes(item._id))))
            .catch(err => console.log("Couldn't get filtered items"));
    }

    useEffect(() => {
        setTimeout(() => fetchFilteredItems(allItems, "Selling"))
        axios.get(BASE_URL + '/home/get-all-items')
            .then(res => setAllItems(res.data))
            .catch(err => null);
        axios.get(BASE_URL + '/get-all-purchased-items')
            .then(res => setAllPurchasedItems(res.data))
            .catch(err => null);
    }, [])

    useEffect(() => {
        if (filter === 'Favorites' || filter === 'Selling') {
            fetchFilteredItems(allItems);
        }
        else if (filter === 'Purchased' || filter === 'Sold') {
            fetchFilteredItems(allPurchasedItems);
        }
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