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
        let products = await prisma.product.findMany({
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        });

        products = products.map(product => {
            product.image = product.image.toString('base64');
            return product;
        });

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

            const data = {
                ...req.body,
                categories: req.body.categories?.split(' ') ?? [],
                amount: parseFloat(req.body.amount),
                image,
                owner: { connect: { id: req.user.id } }
            };

            req.body.sale && (data.sale = parseFloat(req.body.sale));

            try {
                await prisma.product.create({ data });

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

router.patch('/update/product', firewall, multerMiddleware.single('image'), async (req, res) => {
    try {
        if (!req.body.id) {
            throw new Error('Product-Id required');
        }

        try {
            const data = {
                ...req.body,
                categories: req.body.categories?.split(' ') ?? [],
                amount: parseFloat(req.body.amount),
                owner: { connect: { id: req.user.id } }
            };
            delete data.id;
            req.body.sale && (data.sale = parseFloat(req.body.sale));

            if (req.file) {
                data.image = await sharp(req.file.buffer).resize({ width: 200, height: 200 }).png().toBuffer();
            }

            try {
                await prisma.product.update({
                    where: { id: req.body.id },
                    data
                });

                res.status(200).send({ message: 'Product updated successfully' });
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

router.delete('/delete/product', firewall, async (req, res) => {
    try {
        if (!req.body.id) {
            throw new Error('Product-Id required');
        }
        await prisma.product.delete({ where: { id: req.body.id } });

        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

module.exports = router;