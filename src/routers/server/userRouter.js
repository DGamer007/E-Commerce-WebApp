const router = require('express').Router();
const { sendError } = require('../../utils/backend-utils');
const firewall = require('../firewall');
const { prisma } = require('../../prisma');

router.get('/me/products', firewall, async (req, res) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: req.user.id }, include: { products: true } });

        console.log(user);

        res.status(200).send({ data: user.products });
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

module.exports = router;