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
    const handleSend = async (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!message.trim() || !name.trim() || !email.trim()) {
            setErrorMessage("Palun täida kõik väljad.");
            setIsSent(false);
            setTimeout(() => setErrorMessage(""), 5000);
            return;
        }

        try {
            // Send the form data using a POST request
            const response = await fetch("/backend/send_email.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    name: name,
                    email: email,
                    message: message,
                }),
            });

            // Check if the response is valid JSON
            let result;
            try {
                result = await response.json();
            } catch (err) {
                throw new Error("Invalid JSON response from server.");
            }

            // Handle server response
            if (response.ok && result.success) {
                // Email sent successfully
                setIsSent(true);
                setMessage("");
                setName("");
                setEmail("");
                setTimeout(() => setIsSent(false), 5000); // Reset success message
            } else {
                setErrorMessage(result.message || "Tehniline viga! Proovige hiljem uuesti.");
                setTimeout(() => setErrorMessage(""), 5000);
            }
        } catch (error) {
            setErrorMessage("Tehniline viga! Proovige hiljem uuesti.");
            setTimeout(() => setErrorMessage(""), 5000);
        }
    };

    // Input handlers
    const handleMessageChange = (e) => setMessage(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    return (
        <div className="contactMainContainer">
            <div className="contactPortraitBox">
                <article className="contactTextContent">
                    <h3>
                        Kui Teile tundub, et just Bossenova on õige bänd Teie sündmust rikastama, siis võtke meiega
                        ühendust!
                    </h3>
                    <p>
                        <textarea
                            className="message-area"
                            placeholder="Peo toimumise aeg, koht, külaliste arv, tehniline valmisolek, ürituse sisu"
                            value={message}
                            onChange={handleMessageChange}
                        />
                    </p>
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
                </article>

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

        </div>
    );
};

export default React.memo(ContactSection);