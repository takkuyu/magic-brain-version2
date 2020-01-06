import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png';
import './Logo.css'


const Logo = () => {
    return (
        <div>
            <div className="logo-container ma4 ">
                <Tilt className="Tilt shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner pa3"><img style={{ paddingTop: '5px' }} alt='logo' src={brain} /> </div>
                </Tilt>
                <h1>Magic Brain<span>.</span></h1>
            </div>

        </div>
    );
}

export default Logo;