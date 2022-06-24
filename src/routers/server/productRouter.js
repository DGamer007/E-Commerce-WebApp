const multer = require('multer');
const sharp = require('sharp');
const { prisma } = require('../../prisma');
const firewall = require('../firewall');
const { sendError } = require('../../utils/backend-utils');

const router = require('express').Router();

const multerMiddleware = multer({
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            callback(new Error('Please upload an Image file'));
        }

        callback(undefined, true);
    }
});

router.get('/products', firewall, async (req, res) => {
    try {
        const products = await prisma.product.findMany({ include: { owner: true } });
        console.log(products);

        res.status(200).send({ body: products });
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

router.post('/create/product', firewall, multerMiddleware.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('Product Image is required');
        }

        try {
            const image = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toBuffer();

            try {
                await prisma.product.create({
                    data: {
                        ...req.body,
                        categories: req.body.categories?.split(' ') ?? [],
                        image,
                        owner: { connect: { id: req.user.id } }
                    }
                });

                res.status(201).send({ message: 'Product saved successfully' });
            } catch (err) {
                throw err;
            }
        } catch (err) {
            throw err;
        }
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

router.patch('/update/product', firewall, async (req, res) => {
    try {
        const { id, data } = req.body;

        const product = await prisma.product.update({ where: { id }, data });

        res.status(200).send({ message: 'Product updated successfully' });
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

router.delete('/delete/product', firewall, async (req, res) => {
    try {
        const { id } = req.body;
        await prisma.product.delete({ where: { id } });

        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

module.exports = router;