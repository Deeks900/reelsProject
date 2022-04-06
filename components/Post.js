import React, { useContext, useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import { AuthContext } from '../context/auth';
import { arrayUnion, arrayRemove, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

function Post({postData, userData}){
    console.log(postData.likes);
    console.log(userData);
    const {user} = useContext(AuthContext);
    const [like, setLike] = useState(false);
    useEffect(()=>{
        if(postData.likes.includes(user.uid)){
            setLike(true);
        }
        else{
            setLike(false);
        }
    }, [postData])

    const handleClick = ()=>{
        if(!like){
            updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayUnion(user.uid)
            })
        }
        else{
            updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayRemove(user.uid)
            })
        }
    }
    return (
        <div className="post-container">
        <video 
        src={postData.postUrl}
          autoPlay={"autoplay"}
          preLoad="auto"
          loop />
        <div className="videos-info">
            <div className="avatar-container">
            <Avatar alt="Remy Sharp" src={postData.profileUrl} sx={{margin:"0.5rem"}}/>
            <p style={{color: "white",  fontWeight:"bold"}}>{postData.profileName}</p>
            </div>

            <div className="post-like">
                <FavoriteIcon onClick={handleClick} fontSize="large" style={like?{color:"red"}:{color:"white"}}/>
                {postData.likes.length>0 && postData.likes.length}
            </div>
        </div>
    </div>
    )
}

export default Post;