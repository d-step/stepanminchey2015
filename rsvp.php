<?php

$servername = "localhost";
$username = "derek";
$password = "Rockwall10";
$dbname = "stepanminchey2015";

$name = $_POST['name'];
$email = $_POST['email'];
$numberofguests = $_POST['guests'];

if ($email == '')
{
    $email = null;
}

// Create connection
$conn = mysql_connect($servername, $username, $password);

mysql_select_db($dbname, $conn);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);

    echo "Connection failed";
}

$sql = "INSERT INTO RSVP (name, email, numberofguests) VALUES ('" . $name . "','" . $email . "','" . $numberofguests . "')";

if (mysql_query($sql)) {
    echo "Thank you for your response!";
} else {
    echo "Unable to RSVP. Please try again.";
}

// send email
$headers = "From:no-reply@stepanminchey2015.com\r\n";
$headers .= "Return-Path: no-reply@stepanminchey2015.com\r\n";
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$subject = $name . " has RSVP'd!";

$date = date('m/d/Y');

$body = "<div>" . $name . " responded to your event on " . $date . ".</div>";
$body .= "<div>Number of guests: " . $numberofguests . "</div>";

if ($email == "")
{
    $body .= "<div>Email: Not provided.</div>";
}
else
{
    $body .= '<div>Email: <a href="mailto:' .$email.'">'.$email.'</a></div>';
}

//$to = 'derek.stepan@gmail.com';

$to = "jmstepan846@gmail.com";

mail($to, $subject, $body, $headers);

?>