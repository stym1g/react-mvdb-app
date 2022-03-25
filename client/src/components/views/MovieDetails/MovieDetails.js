import React,{useEffect, useState} from 'react'
import {API_URL,API_KEY,IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/sections/MainImage';
import {Button,Row} from 'antd';
import GridCard from '../LandingPage/sections/GridCard';
import axios from 'axios';
import Comments from '../LandingPage/sections/Comments';
import MovieInfo from '../LandingPage/sections/MovieInfo';

function MovieDetails(props) {
    const movieId = props.match.params.movieId;
    const [movie,setMovie] = useState([]);
    const [crews,setCrews] = useState([]);
    const [CommentLists, setCommentLists] = useState([]);
    const [LoadingForMovie, setLoadingForMovie] = useState(true);
    const [LoadingForCasts, setLoadingForCasts] = useState(true);
    const [actorToggle,setActorToggle] = useState(false);
    const movieVariable = {
        movieId: movieId
    }

    const toggleActorView = ()=>{
        setActorToggle(!actorToggle);
    }

    function fetchDetailInfo(endpointForMovieInfo){
        //console.log(endpointForMovieInfo);
        fetch(endpointForMovieInfo)
        .then(response=>response.json())
        .then(result=>{
            const endpointForCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            fetch(endpointForCrew)
            .then(response=>response.json())
            .then(result=>{
                //console.log("result=",result);
                setCrews(result.cast);
                setLoadingForCasts(false);
            }).catch(error=>{console.log(error)})
            //console.log(result);
            setMovie(result);
            setLoadingForMovie(false);
            //console.log(`${IMAGE_BASE_URL}w1280${movie.backdrop_path && movie.backdrop_path}`);
        }).catch(error=>{console.log("Error= ".error)})
    }

    
    useEffect(()=>{
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo);
        axios.post('/api/comment/getComments', movieVariable)
        .then(response=>{
            //console.log(response);
            if(response.data.success){
                console.log("response.data.comments: ",response.data.comments);
                setCommentLists(response.data.comments);
            }else{
                console.log("Failed to get comments");
            }
        })
    },[]);

    const updateComment = (newComment)=>{
        setCommentLists(CommentLists.concat(newComment));
    }
    
  return (
    <div>
        {
            !LoadingForMovie ? <MainImage image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path && movie.backdrop_path}`} 
            title={movie.original_title} text={movie.overview}
            /> : <div>loading...</div>
            
        }
    {/**body */}
    {/**Movie info */}
    {
        !LoadingForMovie ? <MovieInfo movie={movie} movieId={movieId} /> : <div>loading...</div>
    }
    <br />
    {/**Actors Grid */}
    <div style={{display:'flex', justifyContent:'center',margin:'2rem'}}>
        <Button onClick={toggleActorView}>Toggle Actor View</Button>
    </div>
    {actorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            !LoadingForCasts ? crews.map((cast, index) => (
                                cast.profile_path &&
                                <GridCard actor image={cast.profile_path} characterName={cast.characterName} />
                            )) :
                                <div>loading...</div>
                        }
                    </Row>
                }
                <br />
    

    {/**Comments */}
    <Comments movieTitle = {movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
    
    </div>
  )
}

export default MovieDetails;