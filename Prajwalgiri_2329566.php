<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weather_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if (isset($_POST['cityname'])) {
  $city = $_POST['cityname'];
  $apiKey = "ca925ba0443f78b9c1b8d285bd03ebfa";
$url = "https://api.openweathermap.org/data/2.5/forecast?q=$city&appid=$apiKey&units=metric";
$response = file_get_contents($url);
$data = json_decode($response, true);
} else {
  echo "City name is not set in the POST request.";
}

// Extract relevant weather information
$cityname = $data["city"]["name"];
$countryCode = $data["city"]["country"];
$windSpeed = $data["list"][0]["wind"]["speed"];
$humidity = $data["list"][0]["main"]["humidity"];
$weatherIcon = $data["list"][0]["weather"][0]["icon"];
$weatherDescription = $data["list"][0]["weather"][0]["description"];
$temperature = $data["list"][0]["main"]["temp"];
$chancesOfRain = $data["list"][0]["pop"];
$feellike = $data["list"][0]["main"]["feels_like"];
$max_temp = $data["list"][0]["main"]["temp_max"];
$min_temp = $data["list"][0]["main"]["temp_min"];

// Prepare SQL statement to insert or update weather data
$today = date("Y-m-d");
$sql = "SELECT * FROM weather_data WHERE cityname = '$cityname' AND record_date = '$today'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Update existing record
    $sql = "UPDATE weather_data SET cityname='$cityname',country_code='$countryCode',record_date='$today',temperature = '$temperature', feels_like = '$feellike', max_temp = '$max_temp', min_temp = '$min_temp' WHERE cityname = '$cityname' AND record_date = '$today'";
} else {
    // Insert new record
    $sql = "INSERT INTO weather_data (cityname, country_code, record_date, temperature, feels_like, max_temp, min_temp) VALUES ('$cityname', '$countryCode', '$today', '$temperature', '$feellike', '$max_temp', '$min_temp')";
}

// Execute SQL statement
if ($conn->query($sql) === TRUE) {
    echo "Weather data inserted/updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$city = $_POST['cityname'] ?? '';
$today = date("Y-m-d");
$sql = "SELECT * FROM weather_data WHERE cityname = '$city' AND record_date >= DATE_SUB('$today', INTERVAL 6 DAY) ORDER BY record_date ASC";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
  $data = array();
  while ($row = $result->fetch_assoc()) {
   // Create an array to hold the data
   $data[] = $row;

  
  }
  echo json_encode($data);



} else {
  echo "No weather data found for $city in the last 7 days.";
}
$conn->close();

?>


 

