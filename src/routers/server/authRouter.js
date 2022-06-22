const router = require('express').Router();
const { prisma, generateAuthToken, findByCredentials } = require('../../prisma');
const { filterUser, encodePassword, sendError, setCookies, clearCookies, decodeToken } = require('../../utils/backend-utils');

router.get('/authenticate', async (req, res) => {
    try {
        if (!req.cookies.token) {
            clearCookies(res);
            res.status(401).send({ message: 'Authorization token required' });
            return;
        }

        const token = req.cookies.token;

        try {
            const { id } = decodeToken(token);

            try {
                const user = await prisma.user.findUnique({ where: { id, tokens: { has: token } } });

                setCookies(res, { email: user.email, token });
                res.status(202).send({ message: 'Authenticated', data: { user: filterUser(user), token } });

            } catch (err) {
                throw err;
            }

        } catch (err) {
            throw err;
        }

    } catch (err) {
        console.error(err);
        clearCookies(res);
        sendError(err, res);
    }
});

router.post('/login', async (req, res) => {
    try {
        try {
            const user = await findByCredentials(req.body.email, req.body.password);

            try {
                const token = await generateAuthToken(user.id);

                setCookies(res, { email: user.email, token });
                res.status(200).send({ message: 'User loggedIn Successfully', data: { token, user: filterUser(user) } });
            } catch (err) {
                throw err;
            }
        } catch (err) {
            throw err;
        }
    } catch (err) {
        console.error(err);
        clearCookies(res);
        sendError(err, res);
    }
});

router.post('/signup', async (req, res) => {
    try {
        try {
            try {
                req.body.password = await encodePassword(req.body.password);
            } catch (err) {
                throw err;
            }

            const user = await prisma.user.create({ data: { ...req.body, tokens: [] } });

            try {
                const token = await generateAuthToken(user.id);

                setCookies(res, { email: user.email, token });
                res.status(201).send({ message: 'User created Successfully', data: { user: filterUser(user), token } });
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