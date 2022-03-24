import React, { useEffect, useState,useRef } from 'react'
import { Typography, Row } from 'antd';
import {API_URL, IMAGE_BASE_URL,API_KEY,IMAGE_SIZE,POSTER_SIZE} from "../../Config";
//import GridCard from '../../commons/GridCard';
import MainImage from './sections/MainImage';
import GridCard from './sections/GridCard';
const {Title} = Typography;
function LandingPage() {
    const buttonRef = useRef(null);
    const [movies,setMovies] = useState([]);
    const [Loading,setLoading] = useState(false);
    const [MainMovieImage,setMainMovieImage] = useState("");
    const [currentPage,setCurrentPage] = useState(0);
    const fetchMovies = (endpoint) =>{
        fetch(endpoint)
        .then(result => result.json())
        .then(result =>{
            //console.log("movies=",movies);
            setMovies([...movies,...result.results]);
            setMainMovieImage(MainMovieImage || result.results[0]);
            setCurrentPage(result.page);
        },setLoading(false))
        .catch(error => console.log('Error: ',error));
    }
    useEffect(()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    },[]);

    const loadMoreItems = () =>{
        //console.log("movies= ",movies);
        let endpoint = '';
        setLoading(true);
        //console.log('CurrentPage ',currentPage);
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`;
        fetchMovies(endpoint);
    }

    const handleScroll = ()=>{
        const windowHeight = "innerHeight" in window ? window.innerHeight:
        document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);
        const windowBottom = windowHeight+window.pageYOffset;
        if(windowBottom>=docHeight-1){
            //Load more items
            console.log('Clicked');
            buttonRef.current.click();
        }
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {MainMovieImage && 
                   <MainImage
                   image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                   title={MainMovieImage.original_title}
                   text={MainMovieImage.overView}
                   />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Title level={2}>Movies by latest</Title>
                <hr />
            <Row gutter={[16,16]}>
                {movies && movies.map((movie,index) => {
                    return(<React.Fragment key={index}>
                        <GridCard image={movie.poster_path ? 
                        `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`:null}
                         movieId={movie.id} key={movie.id}
                         movieName={movie.original_title}
                         characterName={movie.title}
                         ></GridCard>
                    </React.Fragment>);
                })}
            </Row>
            {Loading &&
                    <div>Loading...</div>}

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load More</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
