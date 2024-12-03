import React, { useState, useEffect } from 'react';
import '../styles/MenuSection.css';
import FeedbackSection from "./FeedbackSection.jsx";
import ContactSection from "./ContactSection.jsx";

const MenuSection = ({ scale = 0.8, moveCamera, positions, currentIndex }) =>{
    const style = {
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: `center center`,
        position: 'absolute',
        top: '65%',
        left: '50%',
    };

    const [showBackButton, setShowBackButton] = useState(false);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [isContactVisible, setIsContactVisible] = useState(false);


    //Camera Movement
    const handleMoveToPosition = (targetIndex) =>{
        if (!moveCamera || !positions) return;

        moveCamera(targetIndex);

        //FeedBack Section
        if (targetIndex === 6){
            setTimeout(() => {
                setIsFeedbackVisible(true);
            },2000);

        } else {
            setIsFeedbackVisible(false);
        }

        //Contact Section
        if (targetIndex === 7){
            setTimeout(() => {
                setIsContactVisible(true)
            }, 3000);
        } else{
            setIsContactVisible(false);
        }

        //Hide Menu
        setTimeout(() =>{
            const menu = document.querySelector('.menu')
            if (menu) menu.style.display = 'none';
        }, 1000);

        //Show Back Button
        setTimeout(() => {
            setShowBackButton(true);
        }, 3000);
    };

    //Back to Menu
    const handleBackToMenu = () =>{
        moveCamera(1);
        setShowBackButton(false);
        setIsFeedbackVisible(false);
        setIsContactVisible(false);
        setTimeout(() =>{
            const backBtn = document.querySelector('.backButton')
            if(backBtn) backBtn.style.display = 'none';
        }, 300);
        setTimeout(() =>{
            const menu = document.querySelector('.menu')
            if (menu) menu.style.display = 'block';
        },2000);

    }


    return (
        <>
            <div className="menu" style={style}>
                <input type="checkbox" id="toggle"/>
                <label id="show-menu" htmlFor="toggle">

                    <div className="btn">
                        <i className="material-icons md-36 toggleBtn menuBtn">menu</i>
                        <i className="material-icons md-36 toggleBtn closeBtn">close</i>
                    </div>

                    {/*Pildid*/}
                    <div className="btn" onClick={() => handleMoveToPosition(3)}>
                        <img src="/Pildid.svg" style={{width: '44px', height: '44px',}} />
                    </div>

                    {/*Meist*/}
                    <div className="btn" onClick={() => handleMoveToPosition(4)}>
                        <img
                            src="/Meist.svg"
                            alt="Book icon"
                            style={{width: '42px', height: '42px',}}
                        />
                    </div>

                    {/*Tellijale*/}
                    <div className="btn" onClick={() => handleMoveToPosition(5)}>
                        <img src="/Tellijale.svg" style={{width: '60px', height: '60px',}}/>
                    </div>

                    {/*Tagasiside*/}
                    <div className="btn" onClick={() => handleMoveToPosition(6)}>
                        <img src="/Tagasiside.svg" style={{width: '69px', height: '69px',}}/>
                    </div>

                    {/*Kontakt*/}
                    <div className="btn" onClick={() => handleMoveToPosition(7)}>
                        <img src="/Kontakt.svg" style={{width: '64px', height: '64px',}}/>
                    </div>

                    {/*Blogi*/}
                    <div className="btn" onClick={() => handleMoveToPosition(8)} >
                        <img src="/Blogi.svg" style={{width: '60px', height: '60px',}}/>
                    </div>

                    {/*Esinemised*/}
                    <div className="btn" onClick={() => handleMoveToPosition(9)}>
                        <img src="/Esinemised.svg" style={{width: '69px', height: '69px',}}/>
                    </div>

                    {/*Videod*/}
                    <div className="btn" onClick={() => handleMoveToPosition(2)}>
                        <img src="/Videod.svg" style={{width: '48px', height: '48px',}}/>
                    </div>

                </label>
            </div>

            {/* Back to Menu Button */}
            {showBackButton && (
                <button
                    className="backButton button"
                    onClick={handleBackToMenu}
                >
                    <i className="material-icons">arrow_back</i>

                </button>
            )}

            {isFeedbackVisible && <FeedbackSection/>}
            {isContactVisible && <ContactSection/>}
        </>


    );
};

export default MenuSection;