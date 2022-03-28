import React from 'react';
import {Col} from 'antd';
import {IMAGE_BASE_URL} from '../Config';

function GridCard(props) {
    console.log(props.cast);
    let {actor,image,movieId,movieName,characterName} = props;
    const POSTER_SIZE = 'w154';
    if(actor){
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{position: 'relative'}}>
                    <img style={{width:'100%',height:'320px'}}
                    alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
                </div>
            </Col>
        )
    }else{
        return(
            <Col lg={6} md={8} xs={24}>
                <div style={{position:'relative'}}>
                    <a href={`/movie/${movieId}`}>
                        <img
                        style={{width:'100%',height:'320px'}}
                        alt={movieName} src={image}
                        />
                    </a>
                </div>
            </Col>
        )
    }
}

export default GridCard;