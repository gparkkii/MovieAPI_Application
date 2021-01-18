import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Typography, Row } from 'antd';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../Common/GridCards';
import MainImage from "../LandingPage/Sections/MainImage";

const { Title } = Typography;

function LandingPage() {

    const buttonRef = useRef(null);

    const [Movies, setMovies] = useState([]);
    const [MainMovieImg, setMainMovieImg] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [Loading, setLoading] = useState(true);
 
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    },[]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])

    const fetchMovies = ( endpoint ) => {
        axios.get(endpoint)
            .then(function(response) {
                console.log(response);
                setMovies([...Movies, ...response.data.results]);
                setMainMovieImg(MainMovieImg || response.data.results[0]);
                console.log(MainMovieImg);
                setCurrentPage(response.data.page);
            }, setLoading(false))
            .catch( err => {
                console.log(err);
                alert("로딩에 실패하였습니다.");
            })
    }

    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true);
        console.log('CurrentPage :', CurrentPage)
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${ CurrentPage + 1 }`;
        fetchMovies(endpoint);
    };

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight
            : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {
            // loadMoreItems()
            console.log('clicked')
            buttonRef.current.click();
        }

    }

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
                    <Title level={2}> Latest Movies </Title>
                    <hr/>
                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={movie.poster_path ? 
                                        `${IMAGE_BASE_URL}w500${movie.poster_path}`
                                        : null
                                    }
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
                {Loading && <div>Loading...</div>}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button 
                        className="loadMore"
                        ref={buttonRef}
                        onClick={loadMoreItems}
                    >
                        Load More Movies
                    </button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
