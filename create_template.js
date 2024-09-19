function get_html(easy,medium,hard){
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #5cb85c;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            text-align: center;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Rise and Shine: Tackle Today’s Ultimate LeetCode Challenges!</h1>
        <p>Hello Siddhant,</p>
        <p>It’s time to ignite your coding passion! Here are your LeetCode challenges for today:</p>
        
        <p><strong>Easy:</strong> <a href=${easy['url']} class="button">${easy['title']}</a></p>
        <p><strong>Medium:</strong> <a href=${medium['url']} class="button">${medium['title']}</a></p>
        <p><strong>Hard:</strong> <a href=${hard['url']} class="button">${hard['title']}</a></p>

        <p>Remember, every problem you solve is a step closer to mastery. Embrace the challenge and make the most of today!</p>

        <p>Happy Coding!</p>
        <p>Best regards,<br>Your Motivator</p>
    </div>
</body>
</html>
`
}
export default get_html