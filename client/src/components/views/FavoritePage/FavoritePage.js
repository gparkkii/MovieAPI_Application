import React from 'react';
import './FavoritePage.css';
import axios from 'axios';

function FavoritePage() {

    useEffect(() => {

        Axios.post('/api/favorite/getFavorited', { userForm : localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success) {

                } else {
                    alert("즐겨찾기 정보를 가져오는데 실패했습니다.")
                }
            })
    }, [])

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

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
