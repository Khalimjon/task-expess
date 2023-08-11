const express = require('express')
const Joi = require("joi");
const router = express.Router();

const contacts = [
    {
        id: 1,
        fullName: 'john James',
        email: 'john12@gmail.com',
        message: 'dlashaskhdkash',
        status: 'new'
    },
    {
        id: 2,
        fullName: 'john terry',
        email: 'terry123"email.com',
        message: 'dnajkgdjkajkhjka',
        status: 'viewed'
    },
    {
        id: 3,
        fullName: 'frank joe',
        email: 'frank23@gmail.com',
        message: 'djkasjkdjkasgdkas',
        status: 'new'
    },
    {
        id: 4,
        fullName: 'potter kane',
        email: 'potter"email.com',
        message: 'dgagdjagdgasjgdshjgd',
        status: 'viewed'
    }
];


router.get('/', (req, res) => {
    res.status(200).send(contacts)
})



router.get('/:id', (req, res) =>{
    const contact = contacts.find(c=>c.id === parseInt(req.params.id));
    if(!contact)
        return   res.status(400).send(`by following Id user not found...`);

    contact.status = 'viewed';

    res.send(contact)
});


router.post('/', (req, res) =>{

    const schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required().min(5),
        message: Joi.string().required().min(5),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        // Handle validation error
        return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });
    }

    const contact = {
        id: contacts.length + 1,
        fullName: value.name,
        message: value.message,
        email: value.email,
        status: 'new'
    };
    contacts.push(contact);
    res.status(201).send(contact);

});

router.put('/:id', (req, res) =>{
    //finding contact
    const contact = contacts.find(c=>c.id === parseInt(req.params.id));
    if(!contact)
        return   res.status(404).send(`by following Id user not found...`);


    //Validation code
    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        // Handle validation error
        res.status(400).send(error.details[0].message);
    }
    //update contact
    contact.name = req.body.name;
    //resend contact
    res.send(contact)

})


router.delete('/:id', (req, res)=>{
    const contact = contacts.find(c => c.id === parseInt(req.params.id))

    if(!contact)
        return res.status(404).send(`such kind of user not found!!!`);

    const contactIndex = contacts.indexOf(contact)
    contacts.splice(contactIndex, 1);

    res.send(contacts)
})

module.exports = router






