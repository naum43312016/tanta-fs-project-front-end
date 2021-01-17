import { Button } from "reactstrap"
import ItemCard from "../HomePage/ItemCards"
import '../../Styles/MyItems.css'
import { useState, useEffect } from "react"
import axios from 'axios';
import { BASE_URL } from '../HomePage/Home'

const MyItems = (props) => {
    const [filter, setFilter] = useState("All")
    const [cards, setCards] = useState([]);
    const [sellingCards, setSellingCards] = useState([]);
    const [purshasedCards, setPurshasedCards] = useState([]);
    const [favoriteCards, setFavoriteCards] = useState([]);

    useEffect(() => { //getting all items on first app render, we will change the link later
        axios.get('http://localhost:3001/home/get-all-items')
            .then(res => setCards(res.data))
            .catch(err => 'There was an issue fetching all the items');
    }, [])

    useEffect(() => { 
        const sellingItems = []
        const purchasedItems = []
        const favoriteItems = []
        axios.get(`${BASE_URL}/user/${localStorage.getItem('sessionID')}`) // Fetch user infos for fetching items
        .then(res => {
            res.data.items.forEach(item => { // Getting offered items
                axios.get(`${BASE_URL}/item/${item}`)
                .then(res => sellingItems.push(res.data))
                .catch(err => console.error(err))
                setSellingCards(sellingItems)
            })
            res.data.purchasedItems.forEach(item => { // Getting purshased items
                axios.get(`${BASE_URL}/item/${item}`)
                .then(res => purchasedItems.push(res.data))
                .catch(err => console.error(err))
                setPurshasedCards(purchasedItems)
            })
            res.data.favoriteItems.forEach(item => { // Getting favorites items
                axios.get(`${BASE_URL}/item/${item}`)
                .then(res => favoriteItems.push(res.data))
                .catch(err => console.error(err))
                setFavoriteCards(favoriteItems)
            })
        })
        .catch(err => console.error(err))
    }, [])
    
    return (
        <div className="my-items-container mt-2">
            <div> </div>
            <div className="items-filter">
                <Button color="light" onClick={(e) => setFilter("All")}> All </Button>
                <Button color="light" onClick={(e) => setFilter("Offered")}> Offered </Button>
                <Button color="light" onClick={(e) => setFilter("Saved")}> Saved </Button>
                <Button color="light" onClick={(e) => setFilter("Purshased")}> Purshased </Button>
                <Button color="light" onClick={(e) => setFilter("Sold")}> Sold </Button>
            </div>
            <h3 className="mt-2">{filter}</h3>
            {filter=='All' && <ItemCard cards={cards} items={filter}/>}
            {filter=='Offered' && sellingCards && <ItemCard cards={sellingCards} items={filter}/>}
            {filter=='Saved' && favoriteCards && <ItemCard cards={favoriteCards} items={filter}/>}
            {filter=='Purshased' && purshasedCards && <ItemCard cards={purshasedCards} items={filter}/>}  
        </div>
    )
}

export default MyItems