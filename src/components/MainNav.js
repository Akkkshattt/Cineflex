import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { positions } from '@mui/system';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width:'100%',
        position:"fixed",
        bottom:0,
        Color: "#2d313a",
        zIndex: 100,
    },
}); 

export default function SimpleBottomNavigation() {
    const classes = useStyles(); 
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate(); 

    React.useEffect(() => {
       if (value===0) navigate('/')
       else if(value ===1) navigate('/movies')
       else if(value ===2) navigate('/series')
       else if(value ===3) navigate('/search')
    }, [value])
    

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        className={classes.root}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color: "red" }} label="Trending " icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color: "red" }} label="Movie" icon={<MovieFilterIcon />} />
        <BottomNavigationAction style={{color: "red" }} label="TV series" icon={<LiveTvIcon />} />
        <BottomNavigationAction style={{color: "red" }} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}