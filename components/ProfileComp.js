import React from 'react'
import Navbar from './Navbar'
function ProfileComp(){
    return(
        <>
            <Navbar />
            <div>
                <div className = "profile-upper">
                    <img src = "https://imgs.search.brave.com/vooZq7sY9JOtiqtQu3NwHVSP6N_C2B8laogpCJvFuqs/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5C/UElTMDA5TTlsZG1D/TUdZcE1lcEt3SGFI/YSZwaWQ9QXBp" style={{height:"8rem", width:"8rem", borderRadius:"50%"}}/>
                    <div style={{flexBasis:"40%"}}>
                        <h1>Name</h1>
                        <h3>Posts: 10</h3>
                    </div>
                </div>
                <hr />
                <div className = "profile-videos">
                    <video />
                </div>
            </div>
        </>
    )
}

export default ProfileComp;