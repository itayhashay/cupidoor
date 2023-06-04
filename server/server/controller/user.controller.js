const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');

router.post('/', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(CREATED).json(user);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.post('/avatar/:id', async (req, res) => {
  try {
    const avatar = await userService.uploadUserPhoto(req.params.id, req.body.avatar);
    if (!avatar) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(avatar);
    }
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(OK).json(users);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.get('/avatar/:id', async (req, res) => {
  try {
    const avatar = await userService.getUserPhoto(req.params.id);
    if (!avatar) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(avatar);
    }
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(user);
    }
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(OK).json(user);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});


module.exports = router;