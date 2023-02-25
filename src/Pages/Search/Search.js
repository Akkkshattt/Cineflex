import { useEffect, useState } from "react";
import { Button, Tab, Tabs, TextField } from '@material-ui/core';
import { createTheme, ThemeProvider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPaginatiom";

const Search = ()=>{
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setsearchText] = useState("");
    const [content, setContent] = useState();
    const [numofPages, setnumofPages] = useState();

    const darkTheme = createTheme({
        palette:{
            type:"dark",
        primary:{
            main:"#fff",
        }
        },
    });

    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
          );
          setContent(data.results);
          setnumofPages(data.total_pages);
          // console.log(data);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
      }, [type, page]);

    return (
        <div>
           {/* <span className="pageTitle">Search Your Favourite Show or movie</span>  */}
           <ThemeProvider theme={darkTheme}>
               <div style={{display:"flex" , margin:"15px 0"}}>

           <TextField 
           style={{flex:1}}
           classname="searchBox"
           label="search"
           variant = "filled"
           onChange={(e) => setsearchText(e.target.value)}
           />
           <Button variant="contained" style={{marginLeft: 10}} onClick={fetchSearch} > <SearchIcon/> </Button>
               </div> 
            <Tabs value={type} indicatorColor="primary" textColor="primary"
            onChange={(event , newValue) => {
                setType(newValue);
                setPage(1);
            }} 
            style={{paddingBottom: 5, textAlign:"center"}}
            >
              <Tab style={{width:"50%"}} label="Search Movies" />
              <Tab style={{width:"50%"}} label="Search Tv Series" />
            </Tabs>

           </ThemeProvider>

           <div className="trending">
                {
                    content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={type?"tv":"movie"}
                            vote_average={c.vote_average}
                        />
                    ))}
            
            {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}

            </div>
            {numofPages >> 1 && (
                <CustomPagination setPage={setPage} numofPages={numofPages} />
            )}

        </div>
    )
};

export default Search