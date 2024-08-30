const axios = require('axios');

class CalendlyOAuth {
    constructor(clientId, clientSecret, redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.authUrl = 'https://auth.calendly.com/oauth/authorize';
        this.tokenUrl = 'https://auth.calendly.com/oauth/token';
        this.apiUrl = 'https://api.calendly.com';
    }

    // Generate the OAuth authorization URL
    getAuthorizationUrl() {
        const url = `${this.authUrl}?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}`;
        return url;
    }

    // Exchange authorization code for an access token
    async exchangeCodeForToken(code) {
        try {
            const response = await axios.post(this.tokenUrl, new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.redirectUri,
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }).toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            res.status(200).json({ access_token: response.data.access_token });
            return response.data.access_token;
        } catch (error) {
            console.error('Error exchanging code for token:', error.response?.data || error.message);
            throw new Error('Failed to exchange authorization code for access token');
        }
    }
}

module.exports = CalendlyOAuth;
