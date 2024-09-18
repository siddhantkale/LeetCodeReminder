import { LeetCode } from "leetcode-query";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import get_html from "./create_template.js";

// Load environment variables from .env file
dotenv.config();

//create leetcode object
const leetcode = new LeetCode();
const leetcodeProblemBase = "https://leetcode.com/problems/";

//nodemailer  transporter details
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS,
  },
});

//mongodb connection data
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "Leetcode"; //your database name
const collectionName = "solved_problems"; //your collection name
const secondCollection = "daily_questions";//second collection to manage daily questions

//get all non-premium problems
async function getAvailableProblems(difficulty) {
  //get problems according to difficulty
  const response = await leetcode.problems({
    limit: 1000000,
    filters: { difficulty: difficulty },
  });
  var problems = response["questions"];

  //filter non-premium problems
  problems = problems.filter((problem) => {
    return problem["isPaidOnly"] === false;
  });
  return problems;
}

async function getSolvedProblems() {
  //connect to client and access collection
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  //get all solved problems
  //exclude _id field
  const solvedProblems = await collection
    .find({}, { projection: { _id: 0 } })
    .toArray();
  await client.close();
  return solvedProblems;
}

function getUnsolved(difficulty, availableProblems, solvedSet) {
  const unsolved = [];
  //perform check on all problems
  //check if unsolved and difficulty matches
  availableProblems.forEach((problem) => {
    if (
      difficulty == problem["difficulty"] &&
      !solvedSet.has(problem["title"])
    ) {
      unsolved.push({
        title: problem["title"],
        url: leetcodeProblemBase + problem["titleSlug"],
      });
    }
  });
  return unsolved;
}


//function to add daily questions for tracking status  to db
async function addToDailyQuestions(easy,medium,hard) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(secondCollection);
    
  const problems = [{
    'title':easy['title'],
  },{
    'title':medium['title'],
  },{
    'title':hard['title'],
  }];
 
 //insert into db
  const response = await collection.insertMany(problems);
  

  await client.close();
}


async function sendProblems() {
  //non-premium available problems according to difficulty
  const easyProblems = await getAvailableProblems("EASY");
  const medProblems = await getAvailableProblems("MEDIUM");
  const hardProblems = await getAvailableProblems("HARD");

  //get all solved problems and add to set for efficient lookup
  const solvedProblems = await getSolvedProblems();
  const solvedSet = new Set();
  solvedProblems.forEach((problem) => {
    solvedSet.add(problem);
  });

  //get unsolved problems by diffculty
  const unsolvedEasy = getUnsolved("Easy", easyProblems, solvedSet);
  const unsolvedMedium = getUnsolved("Medium", medProblems, solvedSet);
  const unsolvedHard = getUnsolved("Hard", hardProblems, solvedSet);

  //select random problems
  const easyProblem =
    unsolvedEasy[Math.floor(Math.random() * unsolvedEasy.length)];
  const medProblem =
    unsolvedMedium[Math.floor(Math.random() * unsolvedMedium.length)];
  const hardProblem =
    unsolvedHard[Math.floor(Math.random() * unsolvedHard.length)];

  //update daily questions collection
  await addToDailyQuestions(easyProblem,medProblem,hardProblem);
 
  //set up mailOptions
  const mailOptions = {
    from: process.env.MAIL,
    to: process.env.REC_MAIL,
    subject: "Achieve Greatness: Unlock Today's Top 3 LeetCode Problems!",
    //get html template
    html: get_html(easyProblem, medProblem, hardProblem),
  };

  //send mail to user
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}


//function to clear yesterday's daily questions
async function  clearDailyQuestions() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(secondCollection);

    //clear all records in daily questions
    await collection.deleteMany({});

    await client.close();
}



//create a new date object
const now = new Date();
const currentHour = now.getHours();

//send problems at 7 am
if(currentHour==7){
    sendProblems();

}//clear yesterday's daily questions
else if(currentHour==0){
    clearDailyQuestions();
}//at other hours send reminder or appreciation message according to status 
else{
    
}



