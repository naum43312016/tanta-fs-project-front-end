import { Button } from "reactstrap"
import ItemCard from "../HomePage/ItemCard"
import '../../Styles/MyItems.css'
import { useState } from "react"

const MyItems = (props) => {
    const [filter, setFilter] = useState("All")
    
    return (
        <div className="my-items-container mt-2">
            <div className="items-filter">
                <Button color="light" onClick={(e) => setFilter("All")}> All </Button>
                <Button color="light" onClick={(e) => setFilter("Offered")}> Selling </Button>
                <Button color="light" onClick={(e) => setFilter("Saved")}> Saved </Button>
                <Button color="light" onClick={(e) => setFilter("Sold")}> Sold </Button>
            </div>
            {filter && <h3 className="mt-2">{filter}</h3>}
            <ItemCard items={filter}/>
        </div>
    )
}

export default MyItems