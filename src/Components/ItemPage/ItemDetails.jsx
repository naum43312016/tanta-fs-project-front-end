import { Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import BASE_URL from '../../Tools/URLs';
import axios from 'axios';
import { confirmPurchase, itemPurchased } from '../../Tools/WebsiteResponses';
import { useHistory } from 'react-router-dom';

const ItemDetails = (props) => {
    const history = useHistory();

    const purchaseItem = async () => {
        if (await confirmPurchase()) {
            axios.put(`${BASE_URL}/purchase/${props.item._id}`, '', {headers: {authorization: 'Bearer ' + localStorage.getItem('token')}})
                .then(res => console.log(res), itemPurchased(), history.push('/'))
                .then(err => console.log("Unable to purchase item"))
        }
    }

    return (
        <div className="item-info">
            <img src={props.item.imageUrl} style={{ maxWidth: "80%", maxHeight: "300px" }} alt="" className="rounded mb-4"></img>
            <div classNameName="mt-5 item-text">
                <div>
                    <Row style={{ width: "80%" }} className="mb-2 align-items-center">
                        <h3 className="col-6">{props.item.condition}</h3>
                        <h5>{props.item.price} <FontAwesomeIcon style={{ color: "orange", fontSize: "20px" }} icon={faCoins} className="ml-2" /></h5>
                    </Row>
                    <h5 className="mb-3">{props.item.category}</h5>
                    <p>{props.item.description}</p>
                    <a href={props.item.imageUrl} target="_blank" rel="noreferrer"><i></i>Full Image</a>
                </div>
                <Button color="primary" className="mt-3 ml-n1 d-block border" onClick={purchaseItem}>Purchase</Button>
            </div>
        </div>
    )
}

export default ItemDetails;