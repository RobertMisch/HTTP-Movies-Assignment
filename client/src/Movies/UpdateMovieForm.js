import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
//example movie object
// {
//     id: 5,
//     title: 'Tombstone',
//     director: 'George P. Cosmatos',
//     metascore: 89,
//     stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
//   }
const initialItem = {
    id: 0,
    title: '',
    director: '',
    metascore: '',
    stars: []
  };

function UpdateMovieForm(props){
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialItem);
    const { id } = useParams();
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies`)
          .then(res => {
            console.log(res)
            // setMovie(res.data); posibly have to filter this
          })
          .catch(err => console.log(err));
      }, [id]);

      const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'stars') {
          value= value.split("")
        }
    
        setMovie({
          ...movie,
          [e.target.name]: value
        });
      };
    
      const submitHandler = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
            // res.data
            props.setMovieList(res.data);
            push(`/`);
            // history.go(0) something gordon had to do to get things working
    
            // res.data ==> just updated item object
          })
          .catch(err => console.log(err));
      };
      return (
        <div>
          <h2>Update Movie</h2>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="title"
              value={movie.title}
            />
    
            <input
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="director"
              value={movie.director}
            />
    
            <input
              type="string"
              name="metascore"
              onChange={changeHandler}
              placeholder="metascore"
              value={movie.metascore}
            />
            <input
              type="string"
              name="stars"
              onChange={changeHandler}
              placeholder="stars"
              value={movie.stars.toString()}
            />
    
            <button >Update</button>
          </form>
        </div>
      );
}

export default UpdateMovieForm