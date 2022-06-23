const { sendError } = require('../../utils/backend-utils');
const firewall = require('../firewall');
const { prisma } = require('../../prisma');

const router = require('express').Router();

router.get('/products', firewall, async (req, res) => {
    try {
        const products = await prisma.product.findMany({ include: { owner: true } });
        console.log(products);

        res.status(200).send({ data: products });
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

router.post('/create/product', firewall, async (req, res) => {
    try {
        const data = req.body;
        const product = await prisma.product.create({
            data: {
                ...data,
                owner: {
                    connect: { id: data.owner }
                }
            }
        });

        res.status(201).send({ message: 'Product created successfully' });
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