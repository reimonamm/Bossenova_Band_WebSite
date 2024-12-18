import React, { useEffect, useState } from "react";

const ContactSection = () => {
    // CSS Lazy Loading
    useEffect(() => {
        import("../styles/ContactSection.css").catch((error) =>
            console.error("Failed to load CSS:", error)
        );
    }, []);

    // State for message, name, email, success, and error
    const [isSent, setIsSent] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Handle form submission
    const handleSend = (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!message.trim() || !name.trim() || !email.trim()) {
            setErrorMessage("Palun täida kõik väljad."); // Show error message
            setIsSent(false); // Ensure success message doesn't show
            setTimeout(() => setErrorMessage(""), 5000); // Clear error after 5 seconds
            return;
        }

        // Clear error and show success message
        setErrorMessage(""); // Clear any error message
        setIsSent(true); // Show success message
        setMessage("");
        setName("");
        setEmail("");

        // Reset success message after 5 seconds
        setTimeout(() => setIsSent(false), 5000);
    };

    // Input handlers
    const handleMessageChange = (e) => setMessage(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    return (
        <div className="contact-container">
            <article className="letter">
                <div className="side">
                    <h1>
                        Kui Teile tundub, et just Bossenova on õige bänd Teie sündmust rikastama, siis võtke meiega
                        ühendust!
                    </h1>
                    <p>
                        <textarea
                            className="message-area"
                            placeholder="Peo toimumise aeg, koht, külaliste arv, tehniline valmisolek, ürituse sisu"
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

            {/* Error and Success Messages */}
            <p
                className={`result-message ${
                    isSent ? "visible success" : errorMessage ? "visible error" : ""
                }`}
            >
                {isSent
                    ? "Aitäh sõnumi eest! Vastame esimesel võimalusel."
                    : errorMessage}
            </p>
        </div>
    );
};

export default React.memo(ContactSection);