<?php
// Start the session
session_start();

// Define variables and initialize with empty values
$first_name = $last_name = $email = $comments = "";
$errors = [];

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate required fields
    if (empty($_POST["first_name"])) {
        $errors["first_name"] = "First name is required.";
    } else {
        $first_name = htmlspecialchars($_POST["first_name"]);
    }

    if (empty($_POST["last_name"])) {
        $errors["last_name"] = "Last name is required.";
    } else {
        $last_name = htmlspecialchars($_POST["last_name"]);
    }

    if (empty($_POST["email"])) {
        $errors["email"] = "Email is required.";
    } else {
        $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors["email"] = "Invalid email format.";
        }
    }

    if (empty($_POST["comments"])) {
        $errors["comments"] = "Comments cannot be empty.";
    } else {
        $comments = htmlspecialchars($_POST["comments"]);
    }

    // If no errors, move to preview step
    if (empty($errors) && isset($_POST["preview"])) {
        $_SESSION["form_data"] = $_POST;
        header("Location: form_all.php?preview=1");
        exit();
    }

    // If confirming, finalize the submission
    if (empty($errors) && isset($_POST["confirm"])) {
        $submitted = true;
        session_destroy();
    }
}

// Retrieve session data if preview step
if (isset($_GET["preview"]) && isset($_SESSION["form_data"])) {
    $form_data = $_SESSION["form_data"];
    $first_name = htmlspecialchars($form_data["first_name"]);
    $last_name = htmlspecialchars($form_data["last_name"]);
    $email = htmlspecialchars($form_data["email"]);
    $comments = htmlspecialchars($form_data["comments"]);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignment 02 – Part 1 – <?= $first_name . ' ' . $last_name ?></title>
    <style>
        .error { color: red; font-size: 0.9em; }
    </style>
</head>
<body>

<?php if (!isset($_GET["preview"]) && !isset($submitted)) : ?>
    <h2>Form Entry</h2>
    <form action="form_all.php" method="post">
        <label>First Name:
            <input type="text" name="first_name" value="<?= $first_name ?>">
            <span class="error"><?= $errors["first_name"] ?? "" ?></span>
        </label>
        <br>

        <label>Last Name:
            <input type="text" name="last_name" value="<?= $last_name ?>">
            <span class="error"><?= $errors["last_name"] ?? "" ?></span>
        </label>
        <br>

        <label>Email:
            <input type="text" name="email" value="<?= $email ?>">
            <span class="error"><?= $errors["email"] ?? "" ?></span>
        </label>
        <br>

        <label>Comments:
            <textarea name="comments"><?= $comments ?></textarea>
            <span class="error"><?= $errors["comments"] ?? "" ?></span>
        </label>
        <br>

        <button type="submit" name="preview">Preview</button>
    </form>

<?php elseif (isset($_GET["preview"])) : ?>
    <h2>Preview</h2>
    <p><strong>First Name:</strong> <?= $first_name ?></p>
    <p><strong>Last Name:</strong> <?= $last_name ?></p>
    <p><strong>Email:</strong> <?= $email ?></p>
    <p><strong>Comments:</strong> <?= $comments ?></p>

    <form action="form_all.php" method="post">
        <input type="hidden" name="first_name" value="<?= $first_name ?>">
        <input type="hidden" name="last_name" value="<?= $last_name ?>">
        <input type="hidden" name="email" value="<?= $email ?>">
        <input type="hidden" name="comments" value="<?= $comments ?>">

        <button type="submit">Go Back</button>
        <button type="submit" name="confirm">Confirm</button>
    </form>

<?php elseif (isset($submitted)) : ?>
    <h2>Form Confirmed</h2>
    <p>Thank you, <?= $first_name ?>, for your submission!</p>
<?php endif; ?>

</body>
</html>
