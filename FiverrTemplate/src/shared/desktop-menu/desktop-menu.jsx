import React from 'react';
import "./desktop-menu.scss"

//? nodeJS components
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserButton, useUser  } from "@clerk/clerk-react";


function Desktop_menu() {

  const [open, setOpen] = useState(false);



  const { isLoaded, isSignedIn, user } = useUser();



  return (
    <div className='links'>
        <Link className='link' to="/">Inicio</Link>
        <Link className='link' to="/gigs">Publicaciones</Link>
        {!isSignedIn && <Link className='link' to="/protected"> <button  className='btn-multi-color'>Unete</button> </Link>}
        {isSignedIn && 
        (
            
            <>
          
            <UserButton/>
            <div className='user' onClick={() => setOpen(!open)}>
            
            <span>{(user.primaryEmailAddress.emailAddress)}</span>
            {open && <div className="options">
                <Link className='link' to="/register">Completar perfil</Link>
                <Link className='link'to="/mygigs">Mis publicaciones</Link>
                <Link className='link'to="/uploadFiles">Upload Test</Link>
            </div>}
            </div>
            </>
        )
        }
    </div>
  )
}

export default Desktop_menu