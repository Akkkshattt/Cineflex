import { Chip } from "@material-ui/core";
import axios from "axios"
import { useEffect } from "react";

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
}) =>{
    const handleAdd = (genre)=>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g)=>g.id !== genre.id));
        setPage(1);
    ;}

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres,genre]);
        setPage(1);
    }

    const fecthGenres = async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setGenres(data.genres);
};
 
    console.log(genres);   
 
    useEffect(() => {
      fecthGenres();

      return () => {
             setGenres({});
      };
    }, [])
        

    return <div style={{
        padding:"6px 0"
    }}>

    {selectedGenres && selectedGenres.map((genre) => (
      <Chip 
      label={genre.name}
      style=
      {{
          margin:2,
          fontFamily:"Times New Roman', Times, serif",
      }} 
      color="secondary"
      clickable
      size="small"
      key={genre.id}
      onDelete={() => handleRemove(genre)}
      />
    ))}

    {genres && genres.map((genre) => (
      <Chip 
      label={genre.name}
      style=
      {{
          margin:2,
          fontFamily:"Times New Roman', Times, serif"
      }} 
      clickable
      size="small"
      key={genre.id}
      onClick={ () => handleAdd(genre) }
      />
    ))}
    </div>
};

export default Genres