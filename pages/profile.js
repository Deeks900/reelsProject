import React from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from "../context/auth";
import ProfileComp from '../components/ProfileComp'
function Profile(){
    const {user} = useContext(AuthContext)
    const Redirect = ()=>{
      const router = useRouter();
      router.push('/login');
      return null;
    }
    return(
        <>
        {
           user?.uid ? <ProfileComp /> : <Redirect />
        }
            
        </>
    )
}

export default Profile;