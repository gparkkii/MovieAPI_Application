import React, { useState } from 'react'

function ToggleButtons() {

    const [Toggle, setToggle] = useState(false);

    const ToggleView = () => {
        setToggle(!Toggle);
        console.log(Toggle);
    }

    return (
        <>
            {Toggle && 
                <div style={{ textAlign: 'center' }}>Check Toggle </div>
            }
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <button onClick={ToggleView}> View More </button> 
            </div>
        </>
    )
}

export default ToggleButtons;