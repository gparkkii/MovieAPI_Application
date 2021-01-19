import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import { Row, Typography } from 'antd';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from '../DetailPage/MovieInfo';
import GridCards from '../Common/GridCards';
import ToggleButtons from '../Common/ToggleButtons';
import initialProfile from '../Common/profile.jpg';

function MovieDetail(props) {

    const { Title } = Typography;

    const [Movie, setMovie] = useState([]);
    const [Crew, setCrew] = useState([]);
    const [Cast, setCast] = useState([]);

    let movieId = props.match.params.movieId;
    let countActors = 8;
    let countCrews = 8;

    useEffect(() => {
        axios.get(`${API_URL}movie/${movieId}?api_key=${API_KEY}`)
            .then((response) => {
                // console.log(response.data);
                setMovie(response.data);
            })
    },[])

    useEffect(() => {
        axios.get(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
            .then((response) => {
                console.log(response.data);
                setCast(response.data.cast);
                setCrew(response.data.crew);
            })
    },[])
    
    const ViewMore = () => {
        countActors = countActors + 8;
    }

    return (
        <>
            {/* Headers */}
            {Movie.backdrop_path && <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                description={Movie.overview}
            />}
            <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto'}}>
                {/* Movie Info */}
                <Title level={2}> Movie Info </Title>
                <MovieInfo
                    movie={Movie}
                />
                <br/>
                
                {/* Actors Grid */}
                <Title level={2}> Actors </Title>
                <Row gutter={[16, 16]}>
                    {Cast && Cast.map((cast, index) => (
                        index < countActors ?
                            <React.Fragment key={index}>
                                <GridCards
                                    detailCast={true}
                                    image={cast.profile_path ? 
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}`
                                        : initialProfile
                                    }
                                    name={cast.name}
                                    character={cast.character}
                                    popularity={cast.popularity}
                                />
                            </React.Fragment> : null
                    ))}
                </Row>
                <button onClick={ViewMore}>
                    View More
                </button>

                {/* Crews Grid */}
                <Title level={2}> Crews </Title>
                <Row gutter={[16, 16]}>
                    {Crew && Crew.map((crew, index) => (
                        index < countCrews ? 
                            <React.Fragment key={index}>
                                <GridCards
                                    detailCrew={true}
                                    image={crew.profile_path ? 
                                        `${IMAGE_BASE_URL}w500${crew.profile_path}`
                                        : initialProfile
                                    }
                                    name={crew.name}
                                    job={crew.job}
                                    department={crew.department}
                                />
                            </React.Fragment> : null
                    ))}
                </Row>
                <button onClick={ViewMore}>
                    View More
                </button>
            </div>
        </>
    )
}

export default MovieDetail;
