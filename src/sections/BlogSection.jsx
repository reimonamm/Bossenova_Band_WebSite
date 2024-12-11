import React, { useState } from 'react';
import "../styles/BlogSection.css";
import BlogText from "../data/BlogText.js";

const BlogSection = () => {
    const [visiblePosts, setVisiblePosts] = useState({});

    const toggleContentVisibility = (index, part) => {
        setVisiblePosts((prev) => ({
            ...prev,
            [`${index}-${part}`]: !prev[`${index}-${part}`],
        }));
    };

    return (
        <div className="blogMainContainer">
            <div className="blogPortraitBox">
                {BlogText.map((text, index) => (
                    <div key={index} className="blogTextContent">
                        <h3>{text.heading1}</h3>
                        <h6>{text.intro1}</h6>
                        <p className={visiblePosts[`${index}-content1`] ? "visible" : ""}>
                            {text.content1}
                        </p>
                        <button
                            className="toggleButton"
                            onClick={() => toggleContentVisibility(index, 'content1')}
                        >
                            {visiblePosts[`${index}-content1`] ? "Peida" : "Loe edasi"}
                        </button>

                        <h3>{text.heading2}</h3>
                        <h6>{text.intro2}</h6>
                        <p className={visiblePosts[`${index}-content2`] ? "visible" : ""}>
                            {text.content2}
                        </p>
                        <button
                            className="toggleButton"
                            onClick={() => toggleContentVisibility(index, 'content2')}
                        >
                            {visiblePosts[`${index}-content2`] ? "Peida" : "Loe edasi"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(BlogSection);