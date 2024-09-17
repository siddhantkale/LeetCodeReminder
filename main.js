import { LeetCode } from "leetcode-query";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();  

//create leetcode object
const leetcode = new LeetCode();


//mongodb connection data
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "Leetcode";//your database name
const collectionName = "solved_problems";//your collection name

//get all non-premium problems
async function getAvailableProblems(difficulty){
    
    //get problems according to difficulty
    const response = await leetcode.problems({limit:1000000,filters:{difficulty: difficulty}});
    var problems = response["questions"];

    //filter non-premium problems
    problems = problems.filter((problem)=>{
        return problem["isPaidOnly"] ===false;
    });
    return problems;
}

async function getSolvedProblems(){
    //connect to client and access collection
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    //get all solved problems
    const solvedProblems = await collection.find().toArray();
    client.close();
    return solvedProblems;
}



//non-premium available problems according to difficulty
const easyProblems = await getAvailableProblems("EASY");
const medProblems =await  getAvailableProblems("MEDIUM");
const hardProblems = await getAvailableProblems("HARD"); 


//get all solved problems
const solvedProblems = await getSolvedProblems();
console.log(solvedProblems);

