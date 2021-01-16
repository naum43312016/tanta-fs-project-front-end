import React from 'react';
import { Container, Row, Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button } from 'reactstrap';
import Pic from "./971c17c93f74bc7280e285153b2e1ace-700.jpg";

const ItemCard = () => {
    return (
        <div style={{width:"80%", marginLeft:"10%"}} className="card-container mt-5 mb-5">
                <Card>
                    <CardImg top width="100%" src={Pic} alt="Card image cap" />
                    <CardBody className="overflow-dots">
                        <CardTitle tag="h5">Item</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Location</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="100%" src={Pic} alt="Card image cap" />
                    <CardBody className="overflow-dots">
                        <CardTitle tag="h5">Item</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Location</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="100%" src={Pic} alt="Card image cap" />
                    <CardBody className="overflow-dots">
                        <CardTitle tag="h5">Item</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Location</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="100%" src={Pic} alt="Card image cap" />
                    <CardBody className="overflow-dots">
                        <CardTitle tag="h5">Item</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Location</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="100%" src={Pic} alt="Card image cap" />
                    <CardBody className="overflow-dots">
                        <CardTitle tag="h5">Item</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Location</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="100%" src={Pic} alt="Card image cap" />
                    <CardBody className="overflow-dots">
                        <CardTitle tag="h5">Item</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Location</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    </CardBody>
                </Card>
        </div>
    )
}

export default ItemCard;