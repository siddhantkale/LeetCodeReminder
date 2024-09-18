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


//function to add solved problems based on recent user submissions
async function addSolved(){
    try{
        //get recent user AC submissions
        const response = await leetcode.user("siddhantkale300");
        const recent20Submissions = response["recentSubmissionList"];
        const recentSolved = new Set();
        recent20Submissions.forEach((submission)=>{
            if(submission['statusDisplay']=="Accepted"){
                recentSolved.add(submission["title"]);
            }
        });

        //connect to client and access collection
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        //upsert AC problems 
        for (const problem of recentSolved) {
            await collection.updateOne(
                { title: problem }, 
                { $setOnInsert: { 'title': problem } }, 
                { upsert: true }
            );
        }
        console.log("success");
        await client.close();
    }
    catch(err){
        console.error(err);
    }
   
}
await addSolved();