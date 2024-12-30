<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["success" => false, "message" => "Kõik väljad peavad olema täidetud."]);
        exit;
    }

    // Prepare email
    $to = "info@bossenova.ee";
    $subject = "Uus sõnum Bossenova veebilehelt";
    $headers = "From: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8";

    // Email content
    $emailContent = "Nimi: $name\n";
    $emailContent .= "Email: $email\n\n";
    $emailContent .= "Sõnum:\n$message\n";

    // Send email
    if (mail($to, $subject, $emailContent, $headers)) {
        echo json_encode(["success" => true, "message" => "Aitäh! Teie sõnum on saadetud."]);
    } else {
        echo json_encode(["success" => false, "message" => "Kahjuks tekkis probleem."]);
    }
}
?>