function getAppreciation(){
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're Doing Great!</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #20C4B7;
            color: white;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 18px;
            line-height: 1.6;
            color: #333;
        }
        .content .quote {
            font-style: italic;
            font-size: 20px;
            color: #555;
        }
        .footer {
            padding: 20px;
            text-align: center;
            background-color: #f4f4f9;
            color: #888;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        .footer p {
            margin: 0;
        }
        .cta {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #20C4B7;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .cta:hover {
            background-color: #1da59d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>You're Amazing!</h1>
        </div>
        <div class="content">
            <p>Hey there,</p>
            <p>We just wanted to take a moment to say: <strong>Great job!</strong> You've been making steady progress, and your efforts are truly inspiring.</p>
            <p class="quote">"Success is the sum of small efforts, repeated day in and day out." - Robert Collier</p>
            <p>Keep going, and remember that every step forward counts, no matter how small. You’re building something remarkable!</p>
            <a href="https://www.leetcode.com" class="cta">Keep Solving</a>
        </div>
        <div class="footer">
            <p>Keep up the amazing work! The best is yet to come.</p>
        </div>
    </div>
</body>
</html>
`
}
export default getAppreciation;