const ANILIST_CLIENT_ID = '40847';
const ANILIST_AUTH_URL = `https://anilist.co/api/v2/oauth/authorize?client_id=${ANILIST_CLIENT_ID}&response_type=token`;
const ANILIST_API = 'https://graphql.anilist.co';

function anilistGetToken() {
    return localStorage.getItem('anilist_token');
}

function anilistSetToken(token) {
    localStorage.setItem('anilist_token', token);
}

function anilistRemoveToken() {
    localStorage.removeItem('anilist_token');
}

function anilistIsLoggedIn() {
    return !!anilistGetToken();
}

async function anilistQuery(query, variables = {}) {
    const token = anilistGetToken();
    const res = await fetch(ANILIST_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ query, variables }),
    });
    if (!res.ok) throw new Error(`AniList HTTP ${res.status}`);
    const { data, errors } = await res.json();
    if (errors) throw new Error(errors[0].message);
    return data;
}