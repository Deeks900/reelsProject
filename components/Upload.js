import React from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

function Upload(){
    return(
        <div >
            <Button className="upload-btn" variant="outlined" component="label" startIcon={<MovieIcon/>} style={{marginTop: '0.8rem'}}>
          <input type="file" hidden accept="image/*" />
          Upload
        </Button>
        <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={50} style={{marginTop:'0.2rem'}} />
    </Box>
        </div>
    )
}
export default Upload