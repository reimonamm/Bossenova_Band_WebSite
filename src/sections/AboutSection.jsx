import React, {useEffect, useState} from "react";
import "../styles/AboutSection.css";
import aboutGalleryItems from "../data/aboutGalleryItems.js";

const AboutSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    //Detect mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile); //Cleanup
    }, []);

    const handleItemClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setActiveIndex(null);
        }
    };

    return (
        <div className="aboutMainContainer">
            <div className="portraitBox">
                <h1>Meist</h1>
                <div className="aboutGalleryContainer">
                    {aboutGalleryItems.map((item, index) => (
                        <div
                            key={index}
                            className={`aboutGalleryItem ${activeIndex === index ? "active" : ""}`}
                            onClick={() => handleItemClick(index)}
                            onMouseEnter={() => !isMobile && setActiveIndex(index)} // Highlight on hover for desktop
                            onMouseLeave={handleMouseLeave} // Reset state on hover out
                            style={{
                                backgroundImage: `url(${item.image})`,
                                backgroundPosition: item.backgroundPosition,
                                backgroundSize: "cover",
                            }}
                        >
                            <div className="aboutGalleryName">
                                <p>{item.quote}<span>{item.author}</span></p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default React.memo(AboutSection);