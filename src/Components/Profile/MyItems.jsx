import { Button } from "reactstrap"
import ItemCard from "../HomePage/ItemCard"
import '../../styles/MyItems.css'
import { useState } from "react"

const MyItems = (props) => {
    const [filter, setFilter] = useState("All")
    return (
        <div className="my-items-container">
            <div className="items-filter">
                <Button color="light" onClick={(e) => setFilter("All")}> All </Button>
                <Button color="light" onClick={(e) => setFilter("Offered")}> Offered </Button>
                <Button color="light" onClick={(e) => setFilter("Saved")}> Saved </Button>
                <Button color="light" onClick={(e) => setFilter("Sold")}> Sold </Button>
            </div>
            {filter && <h3>{filter}</h3>}
            <ItemCard items={filter}/>
        </div>
    )
}

export default MyItems