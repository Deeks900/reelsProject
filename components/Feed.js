import React from 'react'
import Upload from './Upload'
import Navbar from './Navbar'
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AuthContext } from '../context/auth';
import { db } from "../firebase";
import { useEffect, useContext, useState } from 'react'
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Post from './Post';
 
function Feed() {
    const [posts, setPosts] = useState([]);
    const user = useContext(AuthContext)
    // console.log(user);
    const [userData, setUserData] = useState({})
    // Jab bhi user ki state update hogi tab ye useState chalega
    useEffect(()=>{
        // console.log(user.user.uid)
        
        const unsub = onSnapshot(doc(db, "users", user.user.uid), (doc)=>{
            // console.log(doc.data());
            setUserData(doc.data())
        })
        return ()=>{
            unsub();
        }
    }, [user])

    useEffect( async()=>{
        const unsub = await onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot)=>{
            let tempArray = []
            snapshot.docs.map((doc)=>{
                tempArray.push(doc.data())
            })
            setPosts([...tempArray])
            
            // console.log(tempArray);
        })
        return ()=>{
            unsub();
        }
    }, [])
    
    return (
        <div className="feed-container">
           <Navbar userData={userData}/>
           <Upload userData = {userData}/>
           
           <div className="videos-container">
           
                {
                    
                    posts.map((post)=>{
                        
                            return <Post postData={post} userData={userData}/>
                        
                        
                        
                    })
                }
              
           </div>
        </div>
    );
}

export default Feed;