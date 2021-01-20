import React, {useEffect, useState} from 'react';
import axios from 'axios';

function FavoriteButton(props) {

    const movieId = props.movieId;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRuntime = props.movieInfo.runtime;
    const userFrom = props.userFrom;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRuntime: movieRuntime
    }

    useEffect(() => {

        axios.post("/api/favorite/favoriteNumber", variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert("즐겨찾기 정보를 가져오는데 실패했습니다.")
                }
            })

        axios.post("/api/favorite/favorited", variables)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert("즐겨찾기 정보를 가져오는데 실패했습니다.")
                }
            })

    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            axios.post("/api/favorite/cancelFavorite", variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert("즐겨찾기 삭제를 실패했습니다.");
                    }
                })
        } else {
            axios.post("/api/favorite/addFavorite", variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert("즐겨찾기 등록에 실패했습니다.");
                    }
                })
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
            <button onClick={onClickFavorite}> { Favorited ? "Not Favorite" : "Add to Favorite" } {FavoriteNumber} </button>
        </div>
    )
}

export default FavoriteButton
