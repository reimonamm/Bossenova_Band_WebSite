import React from 'react';
import "../styles/BlogSection.css";

const BlogSection = () => {

    return (
        <div className="blogMainContainer">
            <div className="blogPortraitBox">
                <div className="blogWrapper">
                    <div className="typing">
                        Tuleb varsti...
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(BlogSection);