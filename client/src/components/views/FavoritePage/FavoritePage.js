import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FavoritePage.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        FetchFavoritedMovies();
    }, [])

    const FetchFavoritedMovies = () => {
        axios.post('/api/favorite/getFavorited', { userFrom : localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    setFavorites(response.data.favorites);
                } else {
                    alert("즐겨찾기 정보를 가져오는데 실패했습니다.")
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }

        axios.post('/api/favorite/deleteFavorite', variables)
            .then(response => {
                if(response.data.success) {
                    FetchFavoritedMovies();
                } else {
                    alert("리스트에서 지우는데 실패했습니다.")
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {

        const Content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} alt="moviePoster" style={{width: '360px'}}/>
                    : "no image"
                }
            </div>
        )

        return <tr key={index}>
            <Popover content={Content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
                <td>{favorite.movieRuntime}</td>
                <td>
                    <button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button>
                </td>
        </tr>
    })

    return (
        <div style={{ width: '90%', margin: '3rem auto' }}>
            <h2> Favorite Movie </h2>
            <br/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove from Favorites</td>
                    </tr>
                </thead>
                <tbody>
                    { renderCards }
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
