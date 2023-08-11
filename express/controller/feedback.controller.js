const express = require('express')
const Joi = require("joi");
const router = express.Router();

const feedbacks = [
    {
        id: 1,
        message: 'hello'
    },
    {
        id: 2,
        message: ''
    },
    {
        id: 3,
        message: ''
    }
]



const users = [
    {
        userId: 1,
        firstName: 'John',
        lastName: 'Terry'
    },
    {
        userId: 2,
        firstName: 'Tony',
        lastName: 'Stark'
    },
    {
        userId: 3,
        firstName: 'Frank',
        lastName: 'James'
    },
];


router.get('/', (req, res) => {
    res.status(200).send(feedbacks)
})



router.get('/:id', (req, res) =>{
    const feedback = feedbacks.find(f=>f.id === parseInt(req.params.id));
    if(!feedback)
        return   res.status(400).send(`by following Id user not found...`);

    res.send(feedback)
});


router.post('/', (req, res) =>{


    const schema = Joi.object({
        message : Joi.string().required().min(4),
        userId: Joi.number().required()
    });

    const { error } = schema.validate(req.body);
    //checking users ID for user exist or not
    const userId = users.find(u => u.userId === parseInt(req.body.userId));

    if(!userId){
        res.status(404).send(`user not found by following ID`)
        return;
    }

    if (error) {
        // Handle validation error
        res.status(400).send(error.details[0].message);
        return;
    }

    const feedback = {
        id: feedbacks.length + 1,
        message: req.body.message
    };
    feedbacks.push(feedback);
    res.status(201).send(feedbacks);

});

router.put('/:id', (req, res) =>{
    //finding user
    const feedback = feedbacks.find(f=>f.id === parseInt(req.params.id));
    if(!feedback)
        return   res.status(404).send(`by following ID users feedback not found...`);


    //Validation code
    const schema = Joi.object({
        message: Joi.string().required().min(3),
        userId: Joi.number().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        // Handle validation error
        res.status(400).send(error.details[0].message);
    }
    //update feedback
    feedback.message =req.body.message;
    //resend feedback
    res.send(feedback)

})


router.delete('/:id', (req, res)=>{
    const feedback = feedbacks.find(f => f.id === parseInt(req.params.id))

    if(!feedback)
        return res.status(404).send(`such kind of user's feedback  is not found...`);

    const feedbackIndex = feedbacks.indexOf(feedback)
    feedbacks.splice(feedbackIndex, 1);

    res.status(200).send(feedbacks)
})

module.exports = router
