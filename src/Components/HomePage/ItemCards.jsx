import React, { useEffect, useState } from 'react';
import { Container, Row, Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pic from "./971c17c93f74bc7280e285153b2e1ace-700.jpg";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

const ItemCard = (props) => {

    return (
        <div>
        <div style={{ width: "80%", marginLeft: "10%" }} className="card-container mt-5 mb-5">
            {props.cards.map((item) => {
                return (<div style={{backgroundColor:"#F7F7F7"}}>
                    <Link to={{pathname: `/item/${item._id}`, state: item._id}}  >
                        <div style={{width:"100%", height:"230px", backgroundImage: `url(${item.imageUrl})`}} className="card-img" top width="100%" alt={item.name} />
                    </Link>
                    <CardBody className="overflow-dots">
                        <Row>
                            <CardTitle tag="h5" className="col-10">{item.name}</CardTitle>
                            <p>{item.price} <FontAwesomeIcon style={{color:"orange", fontSize:"20px"}} icon={faCoins} /></p>
                        </Row>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{item.condition}</CardSubtitle>
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </div>
                )
            })}
        </div>
    </div>
    )
}

export default ItemCard;