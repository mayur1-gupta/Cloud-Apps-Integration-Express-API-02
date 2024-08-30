// routes/authRoutes.js
const express = require('express');
const CalendlyOAuth = require('../services/calendlyOAuth');

const router = express.Router();

// Create an instance of the CalendlyOAuth class
const calendlyOAuth = new CalendlyOAuth(
    process.env.CALENDLY_CLIENT_ID,
    process.env.CALENDLY_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// Redirect the user to Calendly's OAuth authorization page
router.get('/oauth/authorize', (req, res) => {
    const authUrl = calendlyOAuth.getAuthorizationUrl();
    res.redirect(authUrl);
});

// Handle the OAuth callback and exchange the code for an access token
router.get('/oauth/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const accessToken = await calendlyOAuth.exchangeCodeForToken(code);
        console.log('Access Token:', accessToken);

        // Store the access token securely (e.g., in a session, database, etc.)
        res.status(200).json({ access_token: accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
