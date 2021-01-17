import axios from 'axios';
import { useEffect, useState } from 'react'
import {Container,Form, Input, Button} from 'reactstrap'
import '../../styles/ProfileSettings.css'
import dotenv from 'dotenv'

const ProfileSettings = () => {
    const [profileInfos, setProfileInfos] = useState(null)
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const userID = localStorage.getItem('sessionID')

    const handleChange = (e) => {
        setProfileInfos({
            ...profileInfos,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/user/${userID}`)
        .then(res => setProfileInfos(res.data))
    }, [])

    return (
        <Container>
            <Form action="" className="settings-form" onSubmit={e=> e.preventDefault()}>
                <h3>Profile settings</h3>
                <div className="user-coins"> </div>
                <Input className="settings-input" name="firstName" placeholder="First Name" onChange={e => handleChange(e)} value={profileInfos && profileInfos.firstName}/>
                <Input className="settings-input" name="lastName" placeholder="Last Name" onChange={e => handleChange(e)} value={profileInfos && profileInfos.lastName}/>
                <Input className="settings-input" type="text" name="address" placeholder="Address" onChange={e => handleChange(e)} value={profileInfos && profileInfos.address}/>
                <Input className="settings-input" name="phone" placeholder="Phone" onChange={e => handleChange(e)} value={profileInfos && profileInfos.phone}/>
                <Input className="settings-input" type="email" name="email" placeholder="Email" onChange={e => handleChange(e)} value={profileInfos && profileInfos.email}/>
                <Button color="light" > Save </Button>
            </Form>
        </Container>
    )

}

export default ProfileSettings