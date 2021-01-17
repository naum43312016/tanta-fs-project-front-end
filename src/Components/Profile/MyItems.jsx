import { Button } from "reactstrap"
import ItemCard from "../HomePage/ItemCards"
import '../../Styles/MyItems.css'
import { useState, useEffect } from "react"
import axios from 'axios';

const MyItems = (props) => {
    const [filter, setFilter] = useState("All")
    const [cards, setCards] = useState([]);

    useEffect(() => { //getting all items on first app render, we will change the link later
        axios.get('http://localhost:3001/home/get-all-items')
            .then(res => setCards(res.data))
            .catch(err => 'There was an issue fetching all the items');
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
            {filter=='All' && <ItemCard cards={cards} items={filter}/>}
            {filter=='Offered' && <ItemCard cards={cards} items={filter}/>}
            {filter=='Purshased' && <ItemCard cards={cards} items={filter}/>}  
        </div>
    )
}

export default MyItems