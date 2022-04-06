import React from 'react';
import { useState } from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import {v4 as uuidv4} from 'uuid';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';



function Upload({userData}){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleChange = (e)=>{
    const file = e.target.files[0];
    if(file == null){
      setError("Please select a file")
      setTimeout(()=>{
        setError('')
      }, 2000)
      return;
    }
  
    if((file.size/(1024*1024)) > 50){
      setError("Please select a smaller file")
      setTimeout(()=>{
        setError('')
      }, 2000)
      return;
    }
  
    let uid = uuidv4();
    setLoading(true);
    const storageRef = ref(storage, `${userData.uid}/posts/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        console.log("Upload is " + prog + "% done");
      },
      (error) => {
        console.log(error);
        setError(error.message)
      setTimeout(()=>{
        setError('')
      }, 2000)
      return;
  
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          let obj = {
            likes: [],
            postId: uid,
            postUrl:downloadURL,
            profileName: userData.name,
            profileUrl:userData.photoUrl,
            uid: userData.uid,
            timestamp: serverTimestamp()
          }
          // console.log(obj);
          setDoc(doc(db, "posts", uid), obj);
          // console.log("post added in post collection")
          updateDoc(doc(db, "users", userData.uid), {
            posts: arrayUnion(uid)
          })
  
          //firestore 
          setLoading(false);
          setProgress(0);
          //  setDoc(doc(db, "users", user.user.uid), obj)
        });
      }
    );
  }  
  return(
        <div >
        {
          error != '' ? 
          <Alert severity="error">{error} </Alert> : 
          <Button className="upload-btn" variant="outlined" component="label" startIcon={<MovieIcon/>} style={{marginTop: '0.8rem'}}>
          <input type="file" hidden accept="video/*" 
            style={{display:'none'}}
            onChange = {handleChange}/>
          Upload
        </Button>
        }
        
        
        <Box sx={{ width: '100%' }}>
     { loading && <LinearProgress variant="determinate" value={progress} style={{marginTop:'0.2rem'}} />
     }
    </Box>
        
        </div>
    )
}
export default Upload