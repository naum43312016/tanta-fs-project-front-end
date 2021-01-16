import React from 'react';
import { Input, Row } from 'reactstrap';

const Filter = (props) => {

    const buttonCategory = (e) => {
        props.setCategory(e.target.innerText);
    }

    const inputCategory = (e) => {
        props.setCategory(e.target.value);
    }
    
    return (
        <Row style={{ height: "100px", marginBottom: "40px", marginTop:"45px"}} className="filter-row align-items-center justify-content-center">
            <div className="category-input offset-sm-1 offset-0 col-md-2 mb-sm-0 mb-4 col-6">
                <label>Find category</label>
                <Input onChange={inputCategory} value={props.category} type="select">
                    <option value="" defaultValue>Choose Here</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Garden">Garden</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="PCs and Laptops">PCs and Laptops</option>
                    <option value="Sports">Sports</option>
                </Input>
            </div>
            <div className="price-input col-md-2 mb-sm-0 mb-4 col-6 col-3">
                <label>Find Price</label>
                <Input onChange={inputCategory} value={props.category} type="select">
                    <option value="" defaultValue>Choose Here</option>
                    <option value="0-5">0-5 coins</option>
                    <option value="6-10">6-10 coins</option>
                    <option value="11-15">11-15 coins</option>
                    <option value="16-20">16-20 coins</option>
                </Input>
            </div>
            <button className="filter-btn col-2" onClick={buttonCategory}>Furniture</button>
            <button className="filter-btn col-2" onClick={buttonCategory}>Kitchen</button>
            <button className="filter-btn col-2" onClick={buttonCategory}>Electronics</button>
        </Row>
    )
}

export default Filter;