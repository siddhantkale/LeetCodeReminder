function getReminder(easy,medium,hard){
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reminder to Stay on Track</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #20C4B7;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Friendly Reminder: Continue Solving !</h2>
    <p>Hey there!</p>
    <p>Just checking in to remind you to stay focused and keep moving forward. You're making great progress, and every step counts!</p>

    <p>Even small efforts today can make a big difference tomorrow. Take a moment to breathe, focus, and dive back into your journey towards success. You're closer than you think!</p>

    <p>Keep up the great work, and remember, we're cheering you on every step of the way!</p>

    
  </div>

</body>
</html>

    `
}
export default getReminder;