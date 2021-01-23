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
    
    useEffect(() => { // get offered item app rendering
        axios.get(`${BASE_URL}/home/get-all-items`)
        .then(res => res.data)
        .then(res => {
            const sellingCards = []
            res.forEach(item => {
                if(item.sellerId == localStorage.getItem('sessionID')) {
                    sellingCards.push(item) 
                }
            })
            setSellingItems(sellingCards)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {  // fetch all categories
        const getItems = () => {
            axios.get(`${BASE_URL}/user/${localStorage.getItem('sessionID')}`)
            .then(res => res.data)
            .then(res => {
                const purchasedCards = []
                const favoriteCards = []
                res.purchasedItems.forEach(item => {
                    axios.get(`${BASE_URL}/item/${item}`)
                    .then(res => res.data)
                    .then(res => purchasedCards.push(res))
                })
                res.favoriteItems.forEach(item => {
                    axios.get(`${BASE_URL}/item/${item}`)
                    .then(res => res.data)
                    .then(res => favoriteCards.push(res))
                })
                setPurchasedItems(purchasedCards)
                setFavoriteItems(favoriteCards)
            })
            .catch(err => console.error(err))
        }
        getItems()
    }, [])

    const adaptiveCards = () => { // get cards depending on category
        if(filter == "Saved") return favoriteItems
        else if (filter == "Purchased") return purchasedItems
        return sellingItems
    }

    return (
        <div className="my-items-container mt-2">
            <div> </div>
            <div className="items-filter">
                <Button color="light" onClick={(e) => setFilter("Offered")}>Offered</Button>
                <Button color="light" onClick={(e) => setFilter("Saved")}>Saved</Button>
                <Button color="light" onClick={(e) => setFilter("Purchased")}>Purchased</Button>
                <Button color="light" onClick={(e) => setFilter("Sold")}>Sold</Button>
            </div>
            <h3 className="mt-2">{filter}</h3>
            <ItemCards cards={adaptiveCards()} />
        </div>
    )
}

export default MyItems