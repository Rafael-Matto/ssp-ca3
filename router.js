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

//creating new job post and saving data to JSON file also Sanitizing HTML for malicious code
router.post("/createPost", function (req, res) {
  let jobTitle = sanitizeHTML(req.body.jobTitle.trim(),{allowedTags:[],allowedAttributes:{}});
  let description =  sanitizeHTML(req.body.jobD.trim(),{allowedTags:[],allowedAttributes:{}});
  let salary = sanitizeHTML(req.body.salary.trim(),{allowedTags:[],allowedAttributes:{}}) ;
  let location = sanitizeHTML(req.body.location.trim(),{allowedTags:[],allowedAttributes:{}});
  let companyName = sanitizeHTML(req.body.cName.trim(),{allowedTags:[],allowedAttributes:{}});
  let yearsOfEx = sanitizeHTML(req.body.years.trim(),{allowedTags:[],allowedAttributes:{}});
  let jobType = sanitizeHTML( req.body.jobType.trim(),{allowedTags:[],allowedAttributes:{}});
  let email = sanitizeHTML(req.body.email.trim(),{allowedTags:[],allowedAttributes:{}});

  let id = 0;
  jobs.forEach((job) => {
    id = job.id;
  });
  id = id + 1;

  const tempJobs = jobs.filter((job) => {
    return job.id === req.body.id;
  })
  if (tempJobs.length === 0) {
    jobs.push({
      id: id,
      jobTitle: jobTitle,
      description: description,
      companyName: companyName,
      type: jobType,
      salary: salary,
      location: location,
      experience: yearsOfEx,
      email:email
    });
    saveJobs(jobs);
    console.log("Adding Job");
    req.flash('success','New Post Successfully created')
    req.session.save(function(){
    res.redirect("/")
  })
  }else {
    
    console.log("Job Already Exists! or Something Wrong");
    req.flash('errors','Job Already Exists! or Something Wrong')
    req.session.save(function(){
    res.redirect("/")
  })
  }
});

//Post delete page
router.get("/deletepost", (req, res) => {
  res.render("deletepost", { jobsdata: jobs });
});
//removing post from JSON file
router.get("/removepost/:id", (req, res) => {
  let id = req.params.id;
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].id == id) {
      jobs.splice(i, 1);
      saveJobs(jobs)
      req.flash('success','Post Successfully deleted')
      req.session.save(function(){
        res.redirect("/")
      })
    }
  }
})

//editing already exists job post data
router.get("/editpost/:id",(req,res)=>{
    let jobDetailObject
  jobs.forEach(job => {
    if(job.id == req.params.id){
        jobDetailObject = job
    }
  })
  
  res.render('editpost',{job:jobDetailObject})

})

//updating jobs data in JSON file
router.post('/updatepost',(req,res)=>{
  let id = req.body.id; 
  
  let jobTitle = sanitizeHTML(req.body.jobTitle.trim(),{allowedTags:[],allowedAttributes:{}});
  let description = sanitizeHTML(req.body.jobD.trim(),{allowedTags:[],allowedAttributes:{}});
  let salary = sanitizeHTML(req.body.salary.trim(),{allowedTags:[],allowedAttributes:{}});
  let location = sanitizeHTML(req.body.location.trim(),{allowedTags:[],allowedAttributes:{}});
  let companyName = sanitizeHTML(req.body.cName.trim(),{allowedTags:[],allowedAttributes:{}});
  let yearsOfEx = sanitizeHTML(req.body.years.trim(),{allowedTags:[],allowedAttributes:{}});
  let jobType = sanitizeHTML(req.body.jobType.trim(),{allowedTags:[],allowedAttributes:{}});
  let email = sanitizeHTML(req.body.email.trim(),{allowedTags:[],allowedAttributes:{}});

  jobs.forEach(function(job){
    if (job.id == id) {
       job.jobTitle = jobTitle
       job.description = description
       job.salary = salary
       job.location =location
       job.companyName = companyName
       job.experience = yearsOfEx
       job.type = jobType
       job.email = email
       saveJobs(jobs)
      
    }
  })

  req.flash('success','Post Successfully updated')
  req.session.save(function(){
  res.redirect("/")
})

})

//writing job data in JSON file
const saveJobs = (jobs) => {
  const dataJSON = JSON.stringify(jobs);
  fs.writeFileSync("./data/jobs.json", dataJSON);
};

module.exports = router;