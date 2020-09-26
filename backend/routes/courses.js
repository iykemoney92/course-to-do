const router = require('express').Router();
let Course = require('../models/course.model');

router.route('/').get((req, res) => {
    Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Errror: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const credit_unit = req.body.credit_unit;
    const date = Date.parse(req.body.date);
    const email = req.body.email;


    const newCourse = new Course({name,
        username,
        description,
        duration,
        credit_unit,
        date});

    newCourse.save()
    .then(() => { 
        //send email via sendgrid to student if course is added
        res.json('Course added')}) 
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req,res)=>{
    Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res)=>{
    Course.findByIdAndDelete(req.params.id)
    .then(() => res.json('Corse deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res)=>{
    Course.findById(req.params.id)
    .then(course => {
        course.name = req.body.name;
        corse.username = req.body.username;
        course.description = req.body.description;
        course.duration = req.body.duration;
        course.credit_unit = req.body.credit_unit;
        course.date = Date.parse(req.body.date);
        course.email = req.body.email;

        course.save()
        .then(()=>res.json('Course updated'))
        .catch(err=>res.status(400).json('Error: '+err))
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

module.exports = router;