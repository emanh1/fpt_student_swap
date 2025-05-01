import express from 'express';
import passport from 'passport';

export default (app) => {
  const router = express.Router();

  router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  router.get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: `${process.env.FRONTEND_URL}/login`
    }),
    (req, res) => {
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
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
    req.logout();
    res.redirect(process.env.FRONTEND_URL);
  });

  app.use('/auth', router);
};