import { Row, Container, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

const ItemDetails = (props) => {

    return (
        <div className="item-info">
            <img src={props.item.imageUrl} style={{ maxWidth: "80%", maxHeight: "300px" }} className="rounded mb-4"></img>
            <div classNameName="mt-5 item-text">
                <div>
                    <Row style={{ width: "80%" }} className="mb-2 align-items-center">
                        <h3 className="col-6">{props.item.condition}</h3>
                        <h5>{props.item.price} <FontAwesomeIcon style={{ color: "orange", fontSize: "20px" }} icon={faCoins} className="ml-2" /></h5>
                    </Row>
                    <h5 className="mb-3">{props.item.category}</h5>
                    <p>{props.item.description}</p>
                    <a href={props.item.imageUrl} target="_blank"><i></i>Full Image</a>
                </div>
                <Button color="primary" className="mt-3 ml-n1 d-block border">Purchase</Button>
            </div>
        </div>
    )
}

export default ItemDetails;