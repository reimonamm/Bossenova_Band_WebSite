import React, { useState } from "react";
import "../styles/ContactSection.css";

const ContactSection = () => {
    const [isSent, setIsSent] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleInputChange  =useCallback(
        debounce((setter, value) => setter(value), 300),
        []
    );

    const handleSend = (e) => {
        e.preventDefault();
        setIsSent(true);
        setMessage("");
        setName("");
        setEmail("");
        setTimeout(() => setIsSent(false), 5000); // Reset after animation
    };

    const handleMessageChange = (e) => setMessage(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    return (
        <div className={`contact-container ${isSent ? "sent" : ""}`}>
                <article className="letter">
                    <div className="side">
                        <h1>Kui Teile tundub, et just Bossenova on õige bänd Teie sündmust rikastama, siis võtke meiega ühendust!s</h1>
                        <p>
                    <textarea
                        className="message-area"
                        placeholder="Your message"
                        value={message}
                        onChange={handleMessageChange}
                    />
                        </p>
                    </div>
                    <div className="side">
                        <p>
                            <textarea
                                className="placeholder-textarea"
                                placeholder="Sinu nimi"
                                value={name}
                                onChange={handleNameChange}
                            ></textarea>
                        </p>
                        <p>
                            <textarea
                                className="placeholder-textarea"
                                placeholder="E-mail"
                                value={email}
                                onChange={handleEmailChange}
                            ></textarea>
                        </p>
                        <p>
                            <button id="sendLetter" onClick={handleSend}>
                                Saada
                            </button>
                        </p>
                    </div>
                </article>
                <div className="envelope front"></div>
                <div className="envelope back"></div>

            <p className="result-message centered">
                Aitäh sõnumi eest! Vastame esimesel võimalusel.
            </p>
        </div>
    );
};

export default React.memo(ContactSection);