import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res, next) => {
    res.send(require('../../fixtures/processes.json'))
  });

router.route('/process_names')
  .get((req, res, next) => {
    res.send(require('../../fixtures/process_names.json'))
  });

export default router;
