const router = require('express').Router();
const { sendError } = require('../../utils/backend-utils');
const firewall = require('../firewall');
const { prisma } = require('../../prisma');

router.get('/me/products', firewall, async (req, res) => {
    try {
        try {
            const count = await prisma.product.count({ where: { ownerId: req.user.id } });
            if (!count) {
                res.status(200).send({ body: { count } });
                return;
            }

            if (!req.query?.take) {
                throw new Error('Number of Items per page is required as "take" query Parameter');
            }

            const queryObject = {
                where: { ownerId: req.user.id },
                take: parseInt(req.query.take),
                skip: parseInt(req.query?.page ?? 0) * req.query.take
            };

            try {
                const products = await prisma.product.findMany(queryObject);

                res.status(200).send({ body: { products, count } });
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

module.exports = router;