/*
** 42 API Stuff - DO NOT EDIT
*/

const credentials = {
	client: {
		id: process.env.API_UID,
		secret: process.env.API_SECRET
	},
	auth: {
		tokenHost: 'https://api.intra.42.fr'
	}
};
const oauth2 = require('simple-oauth2').create(credentials);
const getToken = async (client) => {
	try {
		const result = oauth2.clientCredentials.getToken();
		const accessToken = oauth2.accessToken.create(await result);
		client.apiToken = accessToken.token.access_token;
	} catch (error) {
		console.log('[+] 42API Access Token error', error.message);
	}
}

module.exports = getToken;
