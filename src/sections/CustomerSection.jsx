import React from 'react';
import "../styles/CustomerSection.css";
import customerText from "../data/customerText.js";

const CustomerSection = () => {
    return(
        <div className="customerMainContainer">
            <div className="customerPortraitBox">

                {customerText.map((text, index) => (
                    <div key={index} className="customerTextContent">
                        <h3>{text.hero1}</h3>
                        <p>{text.p1}</p>
                        <h4>{text.title1}</h4>
                        <ul>
                            {text.p2.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                        <h3>{text.hero2}</h3>
                        <p>{text.p3}</p>
                        <h3>{text.hero3}</h3>
                        <p>{text.p4}</p>
                        <p>{text.p5}</p>
                        <p>{text.p6}</p>
                        <p>{text.p7}</p>
                        <h4>{text.title2}</h4>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default React.memo(CustomerSection);