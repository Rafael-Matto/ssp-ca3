//requiring built in file system of nodejs
const fs = require("fs");
const express = require("express")
//requiring express router for routes
const router = express.Router();

//getting jobs data from JSON file
const loadJobs = () => {
  try {
    const dataBuffer = fs.readFileSync("./data/jobs.json")
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}
//storing job data to jobs for further use in project
const jobs = loadJobs()


//writing job data in JSON file
const saveJobs = (jobs) => {
  const dataJSON = JSON.stringify(jobs);
  fs.writeFileSync("./data/jobs.json", dataJSON);
};

module.exports = router;