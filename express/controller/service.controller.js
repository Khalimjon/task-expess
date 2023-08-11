const express = require('express');
const Joi = require('joi');
const router = express.Router();
const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
});

const services = [
    {
        id: 1,
        name: 'rafting',
        image: '',
    },
    {
        id: 2,
        name: 'hiking',
        image: '',
    },
    {
        id: 3,
        name: 'camping',
        image: '',
    },
];

router.get('/', (req, res) => {
    res.status(200).send(services);
});

router.get('/:id', (req, res) => {
    const service = services.find((s) => s.id === parseInt(req.params.id));
    if (!service) return res.status(404).send(`Service not found.`);
    res.send(service);
});

router.post('/', upload.single('image'), (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        // Handle validation error
        return res.status(400).send(error.details[0].message);
    }

    const service = {
        id: services.length + 1,
        name: value.name,
        image: req.file ? req.file.filename : '', // Get the uploaded image filename
    };

    services.push(service);
    res.status(201).send(service);
});

router.put('/:id', (req, res) => {
    const service = services.find((s) => s.id === parseInt(req.params.id));
    if (!service) return res.status(404).send(`Service not found.`);

    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        // Handle validation error
        return res.status(400).send(error.details[0].message);
    }

    service.name = req.body.name;
    res.send(service);
});

router.delete('/:id', (req, res) => {
    const service = services.find((s) => s.id === parseInt(req.params.id));

    if (!service) return res.status(404).send(`Service not found.`);

    const serviceIndex = services.indexOf(service);
    services.splice(serviceIndex, 1);

    res.send(services);
});

module.exports = router;
