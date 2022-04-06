import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { AuthContext } from '../context/auth'
import { db } from "../firebase";
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore'

function ProfileComp(){
    const {user} = useContext(AuthContext)
    console.log("Hi" + user);
    const [posts, setPosts] = useState([]);
    const [postIds, setPostIds] = useState([]);
    const [userData, setUserData] = useState({});

    // Jab bhi user ki state update hogi tab ye useState chalega
    useEffect(()=>{
        console.log(user.uid)
        
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{
            // console.log(doc.data());
            setUserData(doc.data())
            setPostIds(doc.data().posts)
        })
        return ()=>{
            unsub();
        }
    }, [user])

    useEffect(async()=>{
        let tempArray = [];
        postIds.map(async(postid, idx)=>{
            const unsub = onSnapshot(doc(db, "posts", postid), (doc)=>{
                tempArray.push(doc.data())
                setPosts([...tempArray])
            })
        })
    }, [postIds])

    return(
        <>
            <Navbar />
            <div>
                <div className = "profile-upper">
                    <img src = {userData?.photoUrl} style={{height:"8rem", width:"8rem", borderRadius:"50%"}}/>
                    <div style={{flexBasis:"40%"}}>
                        <h1>{userData?.name}</h1>
                        <h3>Posts: {userData?.posts?.length}</h3>
                    </div>
                </div>
                <hr />
                <div className = "profile-videos">
                {
                    posts.map((post)=>{
                        return <video src={post.postUrl}/>
                    })
                }
                    
                </div>
            </div>
        </>
    )
}

export default ProfileComp;