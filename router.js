//requiring built in file system of nodejs
const fs = require("fs");
const express = require("express")
//requiring express router for routes
const router = express.Router();
//requiring sanitize-html package to safe play with user's data on server side
const sanitizeHTML = require('sanitize-html')
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
//home route
router.get("/", function (req, res) {
  res.render("home", { jobsdata: jobs,success:req.flash('success'),errors:req.flash('errors') })
})
//route for posting new job where we data entry our new job post
router.get("/postJob", function (req, res) {
  res.render("postJob");
});
//route for getting specific job detail
router.get("/jobdetail/:id",(req,res)=>{
    let jobDetailObject
    jobs.forEach(job => {
    if(job.id == req.params.id){
        jobDetailObject = job
    }
  })
  
  res.render('jobdetails',{job:jobDetailObject})

})



//writing job data in JSON file
const saveJobs = (jobs) => {
  const dataJSON = JSON.stringify(jobs);
  fs.writeFileSync("./data/jobs.json", dataJSON);
};

module.exports = router;