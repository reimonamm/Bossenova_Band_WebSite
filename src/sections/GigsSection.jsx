import React from 'react';
import "../styles/gigsSection.css";
import gigs from "../data/gigsText.js";

const gigsSection = () => {

    return (
        <div className="gigsMainContainer">
            <div className="gigsPortraitBox">
                {gigs.map((text, index) => (
                    <div key={index} className="gigsTextContent">
                        <h3>{text.title}</h3>
                        <h4>{text.date1}</h4>
                        <p>{text.gig1}</p>
                        <h4>{text.date2}</h4>
                        <p>{text.gig2}</p>
                        <h4>{text.date3}</h4>
                        <p>{text.gig3}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default React.memo(gigsSection)