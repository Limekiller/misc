<?php

function get_cookie_array($contents) {
	preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $contents, $match_found);

	$cookies = array();
	foreach($match_found[1] as $item) {
	    parse_str($item,  $cookie);
	    $cookies = array_merge($cookies,  $cookie);
	}

	return $cookies;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $domain = $_POST['sitename'];

    if ($_POST['logintoken']) {
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => "https://$domain/login/index.php",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
	  CURLOPT_HEADER => 1,
          CURLOPT_POSTFIELDS => array('username' => $_POST['username'],'password' => $_POST['password'],'logintoken' => $_POST['logintoken']),
          CURLOPT_HTTPHEADER => array(
            'Cookie: MoodleSession=' . $_POST['moodlesession']
          ),
        ));
        
        $contents = curl_exec($curl);
        curl_close($curl);

        $cookies = get_cookie_array($contents);
	$finalmoodlesession = $cookies['MoodleSession'];

    } else {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "http://$domain/login/index.php",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HEADER => 1
        ));
        
        $contents = curl_exec($curl);
        curl_close($curl);

        $cookies = get_cookie_array($contents);

        $moodlesession = $cookies['MoodleSession'];
        $logintoken = explode('"', explode('logintoken" value="', $contents)[1])[0];
    }

}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Moodle Login</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet">
</head>

<style>
    * {
        font-family: 'Open Sans', sans-serif;
    }
    body {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f98012;
	flex-direction: column;
    }
    .loginBox {
        background-color: #fff9f7;
        padding: 1.5rem;
        box-shadow: 0px 0px 20px #00000030;
        border-radius: 1rem;
    }
    #form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .formGroup {
        display: flex;
        flex-direction: column;
    }
    input {
        margin-top: 0.25rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #d5d2d2;
        font-size: 1rem;
    }
    label {
        font-size: 0.75rem;        
    }
    button {
        background-color: #239cae;
        padding: 0.75rem;
        font-weight: bold;
        color: white;
        border: none;
        border-radius: 1rem;
        transition: all 0.2s ease;
    }
    button:hover {
        background-color: #005a75;
        cursor: pointer;
    }
    .info {
	color: white;
	text-align: center;
	margin-bottom: 1rem;
    }
    .info h1 {
	margin-top: 0rem;
    }
</style>

<body>
    <?php if ($finalmoodlesession) : ?>
        <div class='info'>
            <span>Please add the following value to your MoodleSession cookie:</span>
	    <h1><?php echo $finalmoodlesession; ?></h1>
        </div>
    <?php else : ?>
	<?php if ($domain) : ?>
	    <div class='info'>
	        <span>Logging in to</span>
	        <h1><?php echo $domain; ?></h1>
	    </div>
        <?php endif; ?>

        <div class="loginBox">

            <?php if ($_SERVER['REQUEST_METHOD'] == 'GET') : ?>
                <form action="" method="post" name="form" id="form">
                    <div class="formGroup">
                        <label for="sitename">Site domain</label>
                        <input type="text" name="sitename" id="sitename">
                    </div>
                    <button type="submit" value="Login">Submit</button>
                </form>

            <?php else : ?>
                <?php if ($logintoken) : ?>
            	    <form action="" method="post" name="form" id="form">
                <?php else : ?>
                    <form action="https://<?php echo $domain; ?>/login/index.php" method="post" name="form" id="form">
                <?php endif; ?>
                    <input type="hidden" name="logintoken" value="<?php echo $logintoken; ?>"/>
                    <input type="hidden" name="sitename" value="<?php echo $domain; ?>"/>
                    <input type="hidden" name="moodlesession" value="<?php echo $moodlesession; ?>"/>
                    <div class="formGroup">
                	<label for="username">Username</label>
                	<input type="text" name="username" id="username">
               	    </div>
                    <div class="formGroup">
                	<label class="control-label col-sm-3" for="pwd">Password</label>
                	<input type="password" name="password" id="pwd">
                    </div>
                    <button type="submit" value="Login">Submit</button>
                </form>
            <?php endif; ?>

	</div>

    <?php endif; ?>

</body>
</html>