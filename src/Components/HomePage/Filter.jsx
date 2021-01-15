import React from 'react';
import { Input, Row } from 'reactstrap';

const Filter = () => {
    return (
        <Row style={{height:"100px", paddingTop:"40px", paddingBottom:"130px"}} className="align-items-center ml-4">
            <div className="offset-sm-1 col-sm-2 mr-sm-5 col-3">
                <label>Find by category :</label>
                <Input type="select">
                    <option value="" selected>Choose here</option>
                </Input>
            </div>
            <button style={{ borderLeft: 'none' }} className="filter-btn col-2">Furniture</button>
            <button className="filter-btn col-2">Kitchen</button>
            <button className="filter-btn col-2">Garden</button>
            <button style={{ borderRight: 'none' }} className="filter-btn col-2">Electronics</button>
        </Row>
    )
}

export default Filter;