const Log = require('../models/Log');
function logMiddleware(req, res, next) {
    const log = new Log({
      level: 'info',
      message: `${req.method} ${req.url}`
    });
    log.save()
      .then(() => next())
      .catch(err => {
        console.error('Error saving log:', err);
        next(err);
      });
  }
  
  module.exports = logMiddleware;