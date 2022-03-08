import React from "react";
import {useState, useContext, useEffect} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import reels from "../../asset/reels1.jpg";
import Button from "@mui/material/Button";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../asset/bg1.jpg";
import img2 from "../../asset/bg2.jpg";
import img3 from "../../asset/bg3.jpg";
import img4 from "../../asset/bg4.jpg";
import img5 from "../../asset/bg5.jpg";
import {Router, useRouter} from 'next/router';
import {AuthContext} from '../../context/auth';
function Index() {

  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {forgot, user} = useContext(AuthContext);
  const handleClick = async()=>{
    try{
      setLoading(true)
      setError('')
      await forgot(email)
      console.log("Email sent");
      router.push('./login');
    }
    catch(err){
      console.log(err);
      setError(err.message)
      setTimeout(()=>{
        setError('')
      }, 2000)
    }
    setLoading(false);
  }

  useEffect(()=>{
    if(user){
      router.push('/');
    }
  }, [user])

  return (
    <div className="login-container">
      {/* left box */}
      {/* This div is for fixed phone image */}
      <div className="carbg">
        {/* This div is for caraousel */}
        <div className="car">
          <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            interval={2000}
            autoPlay={true}
            showArrows={false}
          >
            <Image src={img1} />
            <Image src={img2} />
            <Image src={img3} />
            <Image src={img4} />
            <Image src={img5} />
          </Carousel>
        </div>
      </div>

      {/* Right Box */}
      <div>
        <div className="login-card">
          <Image src={reels} />
          <TextField
            size="small"
            margin="dense"
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          {/* <TextField
            size="small"
            margin="dense"
            fullWidth
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          /> */}
          {/* Showing the error */}
          {
            error != '' && 
            <div style={{ color: "red" }}>{error}</div>
          }
          
          {/* login button */}
          <Button variant="contained" fullWidth style={{ marginTop: "0.8rem" }} onClick={handleClick}>
            Send Email
          </Button>
          {/* <div style={{ color: "blue", marginTop: "0.5rem" }}>
            Forgot Password ?
          </div> */}
        </div>

        {/* Lower Box */}
        <div className="login-bottom-card">
          Don&apos;t Have an Account ? <span style={{ color: "blue" }}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

export default Index;
