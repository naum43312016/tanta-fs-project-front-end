import { faCamera} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import {Container,Form, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import '../../styles/AddItem.css'
import dotenv from 'dotenv'

const AddItem = () => {
    const [profileInfos, setProfileInfos] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [categories, setCategories] = useState({categories: null, selected: null})
    const [pic, setPic] = useState({selectedFile: null})

    const baseURL = process.env.REACT_APP_BASE_URL
    const toggle = () => setDropdownOpen(prevState => !prevState);
  
    const ref = useRef(null)

    const handleChange = (e) => {
        setProfileInfos({
            ...profileInfos,
            [e.target.name] : e.target.value
        })
    }
    const imageUploadStyle = {
        color: "#5BA9E6", 
        fontSize: "35px",
    }
    const handleSelect = (e) => {
        setCategories({...categories, selected: e.target.value})
    }
    useEffect(() => {
        axios.get(`${baseURL}/category/all`)
        .then(res => setCategories({...categories, category: res.data}))
        .catch(err => console.error(err))
    }, [categories])
    return (
        <Container>
        <Form action="" className="add-item-form" onSubmit={e=> e.preventDefault()}>
            <input type="file" ref={ref} id="hidden" onChange={(e) => {                  
                setPic({selectedFile :e.target.files[0]})
                } }/>
            <div className="image-upload" onClick={() => ref.current.click()}><FontAwesomeIcon style={imageUploadStyle} icon={faCamera}/></div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret color="light">
                    Category
                </DropdownToggle>
                <DropdownMenu>
                    {categories.categories && categories.categories.map(category => (
                        <DropdownItem onClick={(e) => handleSelect(e)}> {category.name} </DropdownItem>
                    ))}
                </DropdownMenu>
        </Dropdown>
            <Input className="add-item-input" name="firstname" placeholder="First Name" onChange={e => handleChange(e)}/>
            <Input className="add-item-input" name="lastname" placeholder="Last Name" onChange={e => handleChange(e)}/>
            <Input className="add-item-input" name="phone" placeholder="Phone" onChange={e => handleChange(e)}/>
            <Input className="add-item-input" type="email" name="email" placeholder="Email" onChange={e => handleChange(e)}/>
            <Button color="light" > Add an item </Button>
        </Form>
    </Container>
    )
}

export default AddItem