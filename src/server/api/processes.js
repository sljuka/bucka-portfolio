import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res, next) => {

    res.send(require('../../test/fixtures/processes.json'))

  });

export default router;
