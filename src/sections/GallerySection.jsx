import React, { useEffect, useState, useRef } from "react";
import "../styles/GallerySection.css";
import { useMemo } from "react";



const GallerySection = () => {
    const navigationRef = useRef(null);

    const galleryImages = useMemo(() => {
        const images = [];
        for (let i = 1; i <= 12; i++) {
            images.push(`/GalleryImages/pilt${i}.jpg`);
        }
        return images;
    }, []);

    //Debounce function
    function debounce(func, delay){
        let timeout;
        return(...args)=>{
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    }



    useEffect(() => {
        if (galleryImages.length === 0) {
            console.error("No images found to initialize the slider.");
            return;
        }

        class Slider {
            constructor(slider) {
                if (!slider) {
                    console.error("Slider element is not found");
                    return;
                }

                this.slider = slider;
                this.display = slider.querySelector(".galleryImageDisplay");
                this.navButtons = Array.from(slider.querySelectorAll(".galleryNavButton"));
                this.prevButton = slider.querySelector(".galleryPrevButton");
                this.nextButton = slider.querySelector(".galleryNextButton");
                this.currentSlideIndex = 0;

                if (!this.display || this.navButtons.length === 0 || !this.prevButton || !this.nextButton) {
                    console.error("One or more required elements are missing in the slider");
                    return;
                }

                // Debounced thumbnail scrolling function
                this.scrollThumbnail = debounce((thumbnail) => {
                    thumbnail.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                    });
                }, 100);

                this.initialize();
            }

            initialize() {
                this.setupSlider();
                this.eventListeners();
            }

            setupSlider() {
                this.showSlide(this.currentSlideIndex);
            }

            showSlide(index) {
                this.currentSlideIndex = index;
                const selectedButton = this.navButtons[this.currentSlideIndex];
                const imgSrc = selectedButton.querySelector("img").src;

                // Set the background image
                if (this.display) {
                    this.display.style.backgroundImage = `url(${imgSrc})`;
                }

                // Update navigation button states
                this.navButtons.forEach((button, i) => {
                    button.setAttribute("aria-selected", i === this.currentSlideIndex);
                });

                // Ensure the active thumbnail is in view
                const thumbnail = this.navButtons[this.currentSlideIndex];
                if (thumbnail) {
                    this.scrollThumbnail(thumbnail); // Debounced scrolling
                }
            }

            eventListeners() {
                this.prevButton.addEventListener("click", () => this.handleNavigation(-1));
                this.nextButton.addEventListener("click", () => this.handleNavigation(1));
                this.navButtons.forEach((button, index) => {
                    button.addEventListener("click", () => this.showSlide(index));
                });
                document.addEventListener("keydown", (e) => this.handleKeyNavigation(e));
            }
            handleKeyNavigation(event){
                if (event.key === "ArrowLeft") {
                    this.handleNavigation(-1);
                } else if (event.key === "ArrowRight") {
                    this.handleNavigation(1);
                }
            }


            handleNavigation(direction) {
                const nextIndex =
                    (this.currentSlideIndex + direction + this.navButtons.length) % this.navButtons.length;
                this.showSlide(nextIndex);
            }
        }

        const sliderElement = document.querySelector(".galleryImageSlider");
        if (sliderElement) {
            new Slider(sliderElement);
        }
    }, [galleryImages]);

;

    return (
        <div className="galleryMainContainer">
            <div className="galleryImageSlider">
                {/* Background Display */}
                <div className="galleryImageDisplay"></div>

                {/* Navigation and Controls */}
                <section className="gallerySliderContent">
                    <button type="button" className="galleryControlButton galleryPrevButton">
                        <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="galleryIcon"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                            />
                        </svg>
                    </button>
                    <button type="button" className="galleryControlButton galleryNextButton">
                        <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="galleryIcon"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                            />
                        </svg>
                    </button>
                </section>

                <nav className="gallerySliderNavigation" ref={navigationRef}>
                    {galleryImages.map((image, index) => (
                        <button
                            key={index}
                            className="galleryNavButton"
                            aria-selected={index === 0}
                        >
                            <img
                                className="galleryThumbnail"
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                loading="lazy"
                            />
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default React.memo(GallerySection);