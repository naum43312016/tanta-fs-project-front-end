import { faCamera} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import {Container,Form, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import '../../styles/AddItem.css'
import dotenv from 'dotenv'

const AddItem = () => {
    const [itemInfos, setItemInfos] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [categories, setCategories] = useState({categories: null, selected: null})
    const [pic, setPic] = useState({selectedFile: null})

    const baseURL = process.env.REACT_APP_BASE_URL
    const toggle = () => setDropdownOpen(prevState => !prevState);
  
    const ref = useRef(null)

    const handleChange = (e) => {
        setItemInfos({
            ...itemInfos,
            [e.target.name] : e.target.value
        })
    }
    const imageUploadStyle = {
        color: "#5BA9E6", 
        fontSize: "35px",
    }

    const handleSelect = (e) => {
        setCategories({...categories, selected: e.target.value})
        setItemInfos({...itemInfos, category: e.target.value})
    }

    const postItem = (e) => {
        e.preventDefault()
        const data = new FormData()
        for(let key in itemInfos) {
            data.append(key, itemInfos[key])
        }
        data.append('image', pic.selectedFile, `${Date.now()}-${pic.selectedFile.name}`)
        for(let pairs of data.entries()) {
            console.log(pairs)
        }
        axios.post(`${baseURL}/item`, data, {headers: {'Authorization' : 'Bearer ' + localStorage.getItem('token')}})
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get(`${baseURL}/category/all`)
        .then(res => setCategories({...categories, categories: res.data}))
        .catch(err => console.error(err))
    }, [])

    return (
        <Container>
        <Form action="" className="add-item-form" onSubmit={e=> postItem(e)} encType="multipart/form-data">
            <input type="file" ref={ref} id="hidden" onChange={(e) => {                  
                setPic({selectedFile :e.target.files[0]})
                } }/>
            <div className="image-upload" onClick={() => ref.current.click()}><FontAwesomeIcon style={imageUploadStyle} icon={faCamera}/></div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret color="light">
                    {categories.categories && categories.selected || 'Category'} {/* Setting the select name based on selected category  */}
                </DropdownToggle>
                <DropdownMenu >
                    {categories.categories && categories.categories.map((category, index) => (
                        <DropdownItem key={index} onClick={handleSelect} value={category.name}> {category.name} </DropdownItem>
                    ))}
                </DropdownMenu>
        </Dropdown>
            <Input className="add-item-input" name="name" placeholder="Name of product" onChange={e => handleChange(e)}/>
            <Input className="add-item-input" name="condition" placeholder="Contition" onChange={e => handleChange(e)}/>
            <Input className="add-item-input" type="number" name="price" placeholder="Price" onChange={e => handleChange(e)}/>
            <Input className="add-item-input" name="description" placeholder="Description" onChange={e => handleChange(e)}/>
            <Button color="light" type="submit"> Add an item </Button>
        </Form>
    </Container>
    )
}

export default AddItem