import React, {useState, lazy, Suspense, useCallback, useMemo} from 'react';
import '../styles/MenuSection.css';

const FeedbackSection = lazy(() => import('./FeedbackSection'));
const ContactSection = lazy(() => import('./ContactSection'));
const AboutSection = lazy(() => import('./AboutSection'));
const CustomerSection = lazy(() => import('./CustomerSection'));
const GigsSection = lazy(() => import('./GigsSection.jsx'));
const GallerySection = lazy(() => import('./GallerySection'));
const BlogSection = lazy(() => import('./BlogSection'));

const MenuSection = ({ scale = 0.8, moveCamera, positions }) =>{

    const style = useMemo(() => ({
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: `center center`,
        position: 'absolute',
        top: '65%',
        left: '50%',
    }), [scale]);

    const [showBackButton, setShowBackButton] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

    const sectionMap = {
        3: { name: "GallerySection", delay: 2500},
        4: { name: "AboutSection", delay: 2800 },
        5: { name: "CustomerSection", delay: 2000 },
        6: { name: "FeedbackSection", delay: 2000 },
        7: { name: "ContactSection", delay: 3000 },
        8: { name: "BlogSection", delay: 3000 },
        9: { name: "GigsSection", delay: 2000 },
    };

    const renderSection = () => {
        switch (activeSection) {
            case "AboutSection":
                return <AboutSection/>
            case "FeedbackSection":
                return <FeedbackSection />;
            case "ContactSection":
                return <ContactSection />;
            case "CustomerSection":
                return <CustomerSection />;
            case "GigsSection":
                return <GigsSection />;
            case "GallerySection":
                return <GallerySection />;
            case "BlogSection":
                return <BlogSection />;
            default:
                return null;
        }
    };

    //Camera Movement
    const handleMoveToPosition = useCallback(
        (targetIndex) => {
            if (!moveCamera || !positions) return;

            moveCamera(targetIndex);

            const sectionInfo = sectionMap[targetIndex];
            if (sectionInfo) {
                const { name, delay } = sectionInfo;
                setTimeout(() => {
                    setActiveSection(name);
                }, delay);
            } else {
                setActiveSection(null);
            }

            // Hide Menu
            setTimeout(() => {
                const menu = document.querySelector('.menu');
                if (menu) menu.style.display = 'none';
            }, 1000);

            // Show Back Button
            setTimeout(() => {
                setShowBackButton(true);
            }, 3000);
        },
        [moveCamera, positions, sectionMap]
    );

    const handleMenuClick = (targetIndex) => {
        handleMoveToPosition(targetIndex);
    }

    //Back to Menu
    const handleBackToMenu = useCallback(() => {
        moveCamera(1);
        setShowBackButton(false);
        setActiveSection(null);

        setTimeout(() => {
            const backBtn = document.querySelector('.backButton');
            if (backBtn) backBtn.style.display = 'none';
        }, 300);

        setTimeout(() => {
            const menu = document.querySelector('.menu');
            if (menu) menu.style.display = 'block';
        }, 2000);
    }, [moveCamera]);




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
                    <div className="btn" onClick={() => handleMenuClick(3)}>
                        <img src="/Pildid.svg" style={{width: '44px', height: '44px',}} />
                    </div>

                    {/*Meist*/}
                    <div className="btn" onClick={() => handleMenuClick(4)}>
                        <img
                            src="/Meist.svg"
                            alt="Book icon"
                            style={{width: '42px', height: '42px',}}
                        />
                    </div>

                    {/*Tellijale*/}
                    <div className="btn" onClick={() => handleMenuClick(5)}>
                        <img src="/Tellijale.svg" style={{width: '60px', height: '60px',}}/>
                    </div>

                    {/*Tagasiside*/}
                    <div className="btn" onClick={() => handleMenuClick(6)}>
                        <img src="/Tagasiside.svg" style={{width: '69px', height: '69px',}}/>
                    </div>

                    {/*Kontakt*/}
                    <div className="btn" onClick={() => handleMenuClick(7)}>
                        <img src="/Kontakt.svg" style={{width: '64px', height: '64px',}}/>
                    </div>

                    {/*Blogi*/}
                    <div className="btn" onClick={() => handleMenuClick(8)} >
                        <img src="/Blogi.svg" style={{width: '60px', height: '60px',}}/>
                    </div>

                    {/*Esinemised*/}
                    <div className="btn" onClick={() => handleMenuClick(9)}>
                        <img src="/Esinemised.svg" style={{width: '69px', height: '69px',}}/>
                    </div>

                    {/*Videod*/}
                    <div className="btn" onClick={() => handleMenuClick(2)}>
                        <img src="/Videod.svg" style={{width: '48px', height: '48px',}}/>
                    </div>

                </label>
            </div>

            {/* Back to Menu Button */}
            {showBackButton && (
                <button
                    className="backButton"
                    onClick={handleBackToMenu}
                >
                    <i className="material-icons">arrow_back</i>

                </button>
            )}

            <Suspense fallback={<div>Loading...</div>}>
                {renderSection()}
            </Suspense>

        </>


    );
};

export default MenuSection;