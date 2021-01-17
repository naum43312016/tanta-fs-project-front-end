import { Row, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

const ItemDetails = (props) => {

    return (
        <Row style={{ backgroundColor: "#F7F7F7", padding: "20px", height: "fit-content", overflow:"hidden"}} className="mb-5 rounded">
            <img src={props.item.imageUrl} style={{ maxWidth: "80%", maxHeight: "300px", float: "left" }} className="ml-5 rounded mt-4 mb-5"></img>
            <ul style={{ listStyle: "none" }} className="ml-5 col-5 mt-5">
                <div className="d-flex mb-4">
                    <li className="mb-5 mr-5"><span className="font-weight-bold mr-3">Name:</span> {props.item.name}</li>
                    <li className="mb-5 ml-5"><span className="font-weight-bold mr-3">Price:</span> {props.item.price} <FontAwesomeIcon style={{ color: "orange", fontSize: "20px" }} icon={faCoins} className="ml-2" /></li>
                </div>
                <div className="d-flex mb-4">
                    <li className="mb-5 mr-5"><span className="font-weight-bold mr-3">Condition:</span> {props.item.condition}</li>
                    <li className="mb-5 ml-5"><span className="font-weight-bold mr-3">Category:</span> {props.item.category}</li>
                </div>
                <div className="d-flex mb-4">
                    <li className="mb-4 mr-5" style={{wordBreak:"break-word"}}><span className="font-weight-bold mr-3">Description:</span> {props.item.description}</li>
                    <li className="mb-4 ml-5"><a href={props.item.imageUrl} target="_blank">Full Image</a></li>
                </div>
            </ul>
        </Row>
    )
}

export default ItemDetails;

// <div style={{backgroundColor:"#F7F7F7", padding:"20px", height:"800px", width:"60%"}}>
// <Row className='justify-content-center'>
//     <img src={props.item.imageUrl} style={{maxWidth:"80%", maxHeight:"300px", float:"left"}} className="ml-5 rounded mt-4"></img>

// </Row>
// <ul style={{listStyle:"none"}} className="ml-5">
//         <li className="mb-5"><span className="font-weight-bold">Name:</span> {props.item.name}</li>
//         <li className="mb-5"><span className="font-weight-bold">Price:</span> {props.item.price} <FontAwesomeIcon style={{color:"orange", fontSize:"20px"}} icon={faCoins} className="ml-2" /></li>
//         <li className="mb-5"><span className="font-weight-bold">Name:</span> {props.item.name}</li>
//         <li className="mb-5"><span className="font-weight-bold">Name:</span> {props.item.name}</li>
//         <li className="mb-4"><span className="font-weight-bold">Name:</span> {props.item.name}</li>
//     </ul>
// </div>