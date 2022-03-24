import React from 'react';
import {Descriptions} from 'antd';
import Favorite from './Favorite';
function MovieInfo(props) {
  const {movie,movieId} = props;
  //console.log("movie= ,",movie);
  return (
    <><div style={{width: '85%', margin: '1rem auto'}}>
    <div style = {{display:'flex',justifyContent:'flex-end'}}>
        <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
    </div>
    </div>
    <Descriptions title="Movie Info" bordered>
        <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
        <Descriptions.Item label="Release Date">{movie.release_date}</Descriptions.Item>
        <Descriptions.Item label="Revenue">{movie.revenue}</Descriptions.Item>
        <Descriptions.Item label="Runtime">{movie.runtime}</Descriptions.Item>
        <Descriptions.Item label="Vote Average">{movie.vote_average}</Descriptions.Item>
        <Descriptions.Item label="Votes">{movie.vote_count}</Descriptions.Item>
        <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
        <Descriptions.Item label="Popularity">{movie.pipularity}</Descriptions.Item>
    </Descriptions>
    </>
  );
}

export default MovieInfo;