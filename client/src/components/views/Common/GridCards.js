import React from 'react';
import { Col } from 'antd';

function GridCards(props) {

    if (props.landingPage) {
        return (
            <>
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <a href={`/movie/${props.movieId}`}>
                            <img
                                style={{ width: '100%', height: '460px' }} 
                                src={props.image} 
                                alt={props.movieName}
                            />
                        </a>
                    </div>
                </Col>
            </>
        )
    } else if (props.detailCast) {
        return (
            <>
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <div>
                            <img
                                style={{ width: '100%', height: '400px' }} 
                                src={props.image} 
                                alt={props.name}
                            />
                            <p> Name : {props.name}</p>
                            <p> Character : {props.character}</p>
                            <p> popularity : {props.popularity}</p>
                        </div>
                    </div>
                </Col>
            </>
        )
    } else if (props.detailCrew) {
        return (
            <>
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <div>
                            <img
                                style={{ width: '100%', height: '400px' }} 
                                src={props.image} 
                                alt={props.name}
                            />
                            <p> Name : {props.name}</p>
                            <p> job : {props.job}</p>
                            <p> department : {props.department}</p>
                        </div>
                    </div>
                </Col>
            </>
        )
    }

}

export default GridCards
