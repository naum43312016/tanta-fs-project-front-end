import { Button } from "reactstrap"
import ItemCards from "../HomePage/ItemCards"
import '../../Styles/MyItems.css'
import { useState, useEffect } from "react"
import axios from 'axios';
import BASE_URL from '../../Tools/URLs';

const MyItems = () => {
    const [filter, setFilter] = useState("All")
    const [cards, setCards] = useState([]);
    const [sellingItems, setSellingItems] = useState([]);
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [soldItems, setSoldItems] = useState([]);

    const filterItems = (array) => {
        let cardsArray = [];
        axios.get('http://localhost:3001/home/get-all-items')
        .then((res) => {
            if (filter === "All") {
                return setCards(res.data);
            }
            for (let i of array) {
                res.data.forEach((item) => {
                    if (item._id === i) {
                        cardsArray.push(item);
                    }
                })
            }
            setCards(cardsArray);
            console.log(cardsArray);
        })
        .catch(err => 'There was an issue fetching all the items');
    }

    useEffect(() => { //getting all items on first app render, we will change the link later
        switch (filter) {
            case "All": filterItems();
            break;
            case "Offered": filterItems(sellingItems);
            break;
            case "Purchased": filterItems(purchasedItems);
            break;
            case "Saved": filterItems(favoriteItems);
            break;
            case "Sold": filterItems(purchasedItems);
            break;
        }
    }, [filter])

    useEffect(() => {
        axios.get(`${BASE_URL}/user/${localStorage.getItem('sessionID')}`) // Fetch user infos for fetching items
            .then(res => {
                setSellingItems(res.data.items);
                setPurchasedItems(res.data.purchasedItems);
                setFavoriteItems(res.data.favoriteItems);
                setSoldItems(res.data.sold);
            })
    }, [filter])

    return (
        <div className="my-items-container mt-2">
            <div> </div>
            <div className="items-filter">
                <Button color="light" onClick={() => setFilter("All")}> All </Button>
                <Button color="light" onClick={() => setFilter("Offered")}> Offered </Button>
                <Button color="light" onClick={() => setFilter("Saved")}> Saved </Button>
                <Button color="light" onClick={() => setFilter("Purchased")}> Purshased </Button>
                <Button color="light" onClick={() => setFilter("Sold")}> Sold </Button>
            </div>
            <h3 className="mt-2">{filter}</h3>
            <ItemCards cards={cards} />
        </div>
    )
}

export default MyItems