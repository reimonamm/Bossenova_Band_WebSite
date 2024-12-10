import React, {useEffect, useRef, useState} from "react";
import "../styles/AboutSection.css";
import aboutGalleryItems from "../data/aboutGalleryItems.js";
import aboutText from "../data/aboutText.js";

const AboutSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const boxRef = useRef(null);

    //Debounce
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() =>{
                func(...args);
            }, delay)
        }
    }

    //Sync scrolling
    useEffect(() => {
        const syncScroll = () => {
            if (containerRef.current && boxRef.current) {
                boxRef.current.scrollTop = containerRef.current.scrollTop;
            }
        };
        const container = containerRef.current;
        container.addEventListener("scroll", syncScroll);

        return () => {
            container.removeEventListener("scroll", syncScroll);
        };
    }, []);

    //Detect mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        const debouncedResize = debounce(checkIsMobile, 200);
        checkIsMobile();
        window.addEventListener("resize", debouncedResize);
        return () => window.removeEventListener("resize", debouncedResize); //Cleanup
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
        <div className="aboutMainContainer" ref={containerRef}>
            <div className="portraitBox" ref={boxRef}>


                {/*Gallery*/}
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

                {/*About Text*/}
                {aboutText.map((text, index) => (
                    <div key={index} className="aboutTextContent">
                        <h2>{text.hero}</h2>
                        <p>{text.p1}</p>
                        <p>{text.p2}</p>
                    </div>
                ))}

                {/*Trio + ABBA Section*/}
                <div className="aboutTrioSection aboutTextContent">
                    <h1>Bossenova Trio</h1>
                    <div className="aboutTrioImageContainer">
                        <img src="/BossenovaTrio.png" alt="TrioImage" loading="lazy" />
                    </div>
                    <p>
                        Bossenova pakub muusikalist meelelahutust akustilises võtmes.
                        Kolmeliikmeline koosseis sobib suurepäraselt väiksemale sündmusele või kohvikusse-baari.
                    </p>
                    <h1>Tribute to ABBA</h1>
                    <div className="aboutTrioImageContainer">
                        <img src="/Abba.jpg" alt="ABBAImage" loading="lazy" />
                    </div>
                    <p>
                        2021. aastal paluti meil kokku panna tribüütkava ABBA muusikaga ja pikemalt mõtlemata võtsime selle pakkumise vastu. Kontserdist Murimäe Veinikeldris sai meie jaoks selgeks, et seda kava me esitame veel!
                    </p>
                </div>


            </div>

        </div>
    );
};

export default React.memo(AboutSection);