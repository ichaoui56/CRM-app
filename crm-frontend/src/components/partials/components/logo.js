import React from 'react'
import { Image } from 'react-bootstrap';
import CBI from '../../../assets/images/CbiLogo.jpg'
const Logo = (props ) => {
    
    return (
        <>
            <Image className="rounded avatar-80" src={CBI} alt="Logo-pic" />
         </>
        )
    }
    
    export default Logo
