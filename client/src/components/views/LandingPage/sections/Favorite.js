import React, { useEffect, useState } from 'react'
import axios from 'axios';
//import { Button } from 'antd';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LikeDislikes from '../../LandingPage/sections/LikeDislikes';

function Favorite(props) { 
    const user = useSelector(state => state.user);

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [FavoriteCount, setFavoriteCount] = useState(0);
    const [Favorited, setFavorited] = useState(false)
    const variables = {
        movieId: movieId,
        userFrom: userFrom,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }
    const favoriteCountSet = ()=>{
        axios.post('/api/favorite/favoriteCount', variables)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.favorited);
                    setFavoriteCount(response.data.favoriteCount);
                } else {
                    alert('Failed to get Favorite Information')
                }
            })
    }
    const onClickFavorite = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            //when we are already subscribed 
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                        favoriteCountSet();
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            // when we are not subscribed yet

            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        //console.log("added");
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                        favoriteCountSet();
                    } else {
                        alert('Failed to Add To Favorite');
                    }
                })
        }
        
    }
    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.favoriteNumber);
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('Failed to get Favorite Number')
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.favorited);
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get Favorite Information')
                }
            })

            favoriteCountSet();

    }, [])


    return (
        <>
            <Button onClick={onClickFavorite} > {!Favorited ? "Add to Favorite" : "Remove from Favorite"}
            {
                !Favorited ? <FavoriteBorderOutlinedIcon fontSize='small' style={{marginLeft:'2px'}} />
                :
                <FavoriteIcon fontSize='small' style={{marginLeft:'2px'}} />
            }
            </Button>
            {FavoriteCount?
            <Button variant="contained" style={{marginLeft:'5px'}} disabled> {FavoriteCount}
            </Button>:null
            }
            {
                <LikeDislikes video videoId={movieId} userId={localStorage.getItem("userId")}></LikeDislikes>
            }
        </>
    )
}

export default Favorite

