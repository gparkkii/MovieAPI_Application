import React from 'react'

function MainImage(props) {
    return (
        <div style={{
            background: `linear-gradient(to bottom, 
                rgba(0,0,0,0)39%,
                rgba(0,0,0,0)41%,
                rgba(0,0,0,0.65)100%),
                url('${props.image}'), #1c1c1c`,
                height: '620px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                position: 'relative'
        }}> 
            <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem'}}>
                <h2 style={{ color: 'white', fontSize: '36px'}}>{props.title}</h2>
                <p style={{ color: 'white', fontSize: '20px'}}> {props.description}</p>
            </div>
        </div>
    )
}

export default MainImage