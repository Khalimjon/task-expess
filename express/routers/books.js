const express = require('express')
const Joi = require("joi");
const router = express.Router();




const books = [
    {id: 1, name: 'book1' },
    {id: 2, name: 'books3' },
    {id: 3, name: 'book4' },
    {id: 4, name: 'book5' },
]

router.get('/', (req, res) => {
    res.status(200).send(books)
})



router.get('/:id', (req, res) =>{
    const book = books.find(b=>b.id === parseInt(req.params.id));
    if(!book)
        return   res.status(400).send(`quyidagi Id bo'yicha kitob topilmadi...`);

    res.send(book)
});


router.post('/', (req, res) =>{

    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        // Handle validation error
        res.status(400).send(error.details[0].message);
        return;
    }

    const book = {
        id: books.length + 1,
        name: value.name,
    };
    books.push(book);
    res.status(201).send(book);

});

router.put('/:id', (req, res) =>{
    //finding book
    const book = books.find(b=>b.id === parseInt(req.params.id));
    if(!book)
        return   res.status(404).send(`quyidagi Id bo'yicha kitob topilmadi...`);


    //Validation code
    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        // Handle validation error
        res.status(400).send(error.details[0].message);
    }
    //update book
    book.name = req.body.name;
    //resend book
    res.send(book)

})


router.delete('/:id', (req, res)=>{
    const book = books.find(b => b.id === parseInt(req.params.id))

    if(!book)
        return res.status(404).send(`bunday kitob topilmadi...`);

    const bookIndex = books.indexOf(book)
    books.splice(bookIndex, 1);

    res.send(books)
})

module.exports = router
