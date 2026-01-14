<?php
    if(isset($_POST['mail'])) {

        // EDIT THE 2 LINES BELOW AS REQUIRED
        $email_to = "jovanivezic@gmail.com";
        $email_subject = "Contact from www.dekoracijesmaragd.rs site.";


        $name = $_POST['name']; // required
        $email_from = $_POST['mail']; // required
        $subject = $_POST['subject']; // required
        $text = $_POST['message']; // required

        $email_message = "Message from Website: \n\n";

        function clean_string($string) {
          $bad = array("content-type","bcc:","to:","cc:","href");
          return str_replace($bad,"",$string);
        }

        $email_message .= "Name: ".clean_string($name)."\n";
        $email_message .= "Email: ".clean_string($email_from)."\n";
        $email_message .= "Subject: ".clean_string($subject)."\n";
        $email_message .= "Message: ".clean_string($text)."\n";


    // create email headers
    $headers = 'From: '.$email_from."\r\n".
    'Reply-To: '.$email_from."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    if(@mail($email_to, $email_subject, $email_message, $headers)) {
        $data['status'] = TRUE;
        $data['msg'] = 'E-mail has been sent!';
        $data['class'] = 'success';
    } else {
        $data['status'] = FALSE;
        $data['msg'] = 'Your e-mail has not been sent!';
        $data['class'] = 'error';
    }

    echo json_encode($data);
}
?>