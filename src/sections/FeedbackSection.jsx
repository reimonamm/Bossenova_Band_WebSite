import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/FeedbackSection.css';
import feedbackCards from '../data/Feedback.js';

const FeedbackSection = () => {
    const sliderRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Cards data
    const cards = [
        { img: '/FeedbackImages/pilt1.jpg', title: 'Liisi' },
        { img: '/FeedbackImages/pilt2.jpg', title: 'Card 2' },
        { img: '/FeedbackImages/pilt3.jpg', title: 'Card 3' },
        { img: '/FeedbackImages/pilt4.jpg', title: 'Card 4' },
        { img: '/FeedbackImages/pilt5.jpg', title: 'Card 5' },

    ];

    // Split text into spans for animation
    const splitTextIntoSpans = () => {
        const elements = document.querySelectorAll('.copy h1');
        elements.forEach((element) => {
            const text = element.innerText;
            const splitText = text
                .split('')
                .map((char) => (char === ' ' ? `<span>&nbsp;</span>` : `<span>${char}</span>`))
                .join('');
            element.innerHTML = splitText;

            // Set initial position for spans (y: -200)
            const spans = element.querySelectorAll('span');
            gsap.set(spans, { y: -200 });
        });
    };

    // Initialize card stacking animation
    const initializeCards = () => {
        if (sliderRef.current) {
            const cards = Array.from(sliderRef.current.querySelectorAll('.card'));
            gsap.to(cards, {
                y: (i) => -15 + 15 * i + '%', // Vertical stacking
                z: (i) => 15 * i, // Depth stacking
                duration: 1,
                ease: 'power3.out',
                stagger: -0.1,
            });
        }
    };

    // Handle card click animations
    const handleCardClick = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const slider = sliderRef.current;
        const cards = Array.from(slider.querySelectorAll('.card'));
        const lastCard = cards.pop(); // Remove last card
        const nextCard = cards[cards.length - 1]; // Second last card

        // Animate last card out
        gsap.to(lastCard.querySelectorAll('h1 span'), {
            y: 200,
            duration: 0.75,
            ease: 'power3.out',
        });

        gsap.to(lastCard, {
            y: '+=150%',
            duration: 0.75,
            ease: 'power3.out',
            onComplete: () => {
                slider.prepend(lastCard); // Add last card to the top
                initializeCards(); // Reinitialize stacking
                gsap.set(lastCard.querySelectorAll('h1 span'), { y: -200 }); // Reset spans
                setTimeout(() => setIsAnimating(false), 1000); // Allow animations again
            },
        });

        // Animate next card into focus
        gsap.to(nextCard.querySelectorAll('h1 span'), {
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.05,
        });
    };

    const preloadImages = () =>{
      const images = feedbackCards.map((card) => card.img);
      let loadedCount = 0;

      images.forEach((src) =>{
          const img = new Image();
          img.src = src;
          img.onload = () => {
              loadedCount +=1;
              if (loadedCount === images.length) {
                  setImagesLoaded(true);
              }
          }
      })
    };

    const precalculateLayouts = () => {
        if (sliderRef.current) {
            const cards = Array.from(sliderRef.current.querySelectorAll('.card'));
            cards.forEach((card) => {
                // Force layout calculation
                card.getBoundingClientRect();
            });
            console.log('Layouts precalculated');
        }
    };

    useEffect(() => {
        preloadImages(); // Start preloading images

        if (imagesLoaded) {
            precalculateLayouts();
            splitTextIntoSpans();
            initializeCards();

            // First Card Animation
            const firstCard = sliderRef.current?.querySelector('.card:last-child');
            if (firstCard) {
                const spans = firstCard.querySelectorAll('h1 span, p span');
                gsap.to(spans, {
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.05,
                });
            }
        }
    }, [imagesLoaded]);

    if (!imagesLoaded) {
        return <div className="loading">Loading...</div>; // Images loading
    }

    return (
        <>
            <div className="feedback-info">
                <p>Klikka pildile</p>
            </div>
            <div className="feedback-container" onClick={handleCardClick}>
                <div className="slider" ref={sliderRef}>
                    {feedbackCards.map((card, index) => (
                        <div className="card" key={index}>
                            <img src={card.img} alt={`Card ${index + 1}`} loading="lazy" />
                            <div className="copy">
                                <p>{card.text}</p>
                                <h1>{card.title}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FeedbackSection;