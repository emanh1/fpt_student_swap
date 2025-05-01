import express from 'express';
import passport from 'passport';

export default (app) => {
  const router = express.Router();

  router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  router.get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`
    }),
    (req, res) => {
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`);
    }
  );

  router.get('/user', (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  });

  router.get('/logout', (req, res) => {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect(`${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`);
    });
  });

  app.use('/auth', router);
};