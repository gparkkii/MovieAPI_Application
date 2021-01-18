import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'antd';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../Common/GridCards';
import MainImage from "../LandingPage/Sections/MainImage";

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImg, setMainMovieImg] = useState(null);


    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        
        axios.get(endpoint)
            .then(function(response) {
                console.log(response);
                setMovies([...response.data.results]);
                setMainMovieImg(response.data.results[0]);
            })
            .catch( err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <div style={{width: '100%', margin: '0 auto'}}>
                {MainMovieImg && 
                    <MainImage 
                        image={`${IMAGE_BASE_URL}w1280${MainMovieImg.backdrop_path}`}
                        title={MainMovieImg.original_title}
                        description={MainMovieImg.overview}
                    />
                }
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h2> Latest Movies </h2>
                    <hr/>
                    <Row gutter={[16, 16]}>
                        { Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={ movie.poster_path ? 
                                        `${IMAGE_BASE_URL}w500${movie.poster_path}` : null
                                    }
                                    movieId = {movie.id}
                                    movieName = {movie.original_title}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button>Load More</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
