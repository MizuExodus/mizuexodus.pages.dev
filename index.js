// async function loadAnilistActivity() {
//     try {
//         const [{ User }, { Page }] = await Promise.all([
//             anilistGetUser(),
//             anilistGetActivity()
//         ]);

//         // Set avatar
//         const avatarDiv = document.getElementById('anilist-avatar');
//         avatarDiv.style.backgroundImage = `url(${User.avatar.large})`;
//         avatarDiv.style.backgroundSize = 'cover';
//         avatarDiv.style.backgroundColor = 'transparent';
//         avatarDiv.querySelector('svg').style.display = 'none';

//         // Set activities
//         const activityEls = document.querySelectorAll('.anilist .activity');
//         Page.activities.forEach((act, i) => {
//             if (!activityEls[i] || !act.media) return;
//             const el = activityEls[i];
//             el.href = act.siteUrl;
//             el.querySelector('.image').style.backgroundImage = `url(${act.media.coverImage.medium})`;
//             el.querySelector('.status').textContent = act.status;
//             el.querySelector('.title').textContent = act.media.title.userPreferred;
//             el.querySelector('time').textContent = new Date(act.createdAt * 1000).toLocaleDateString();
//         });
//     } catch (e) {
//         console.error('AniList error:', e);
//     }
// }

// loadAnilistActivity();

// async function loadLastFm() {
//     try {
//         const res = await fetch('/fetchlastfm');
//         if (!res.ok) return;
//         const { isPlaying, title, artist, image, url } = await res.json();

//         document.getElementById('lastfm-title').textContent = title;
//         document.getElementById('lastfm-artist').textContent = artist;
//         document.getElementById('lastfm-status').textContent = isPlaying ? '▶ Now Playing' : 'Last played';
//         document.getElementById('lastfm-image').style.backgroundImage = `url(${image})`;
//         document.getElementById('lastfm-link').href = url;
//     } catch (e) {
//         console.error('Last.fm error:', e);
//     }
// }

// loadLastFm();

updateScrollPercent();
['scroll', 'resize'].forEach(e => addEventListener(e, updateScrollPercent));

function updateScrollPercent() {
    document.body.style.setProperty('--scroll', scrollY / innerHeight);
}

const bg = document.querySelector('.background');

addEventListener('touchstart', () => bg.style.setProperty('--multiplier', '0'), { once: true });

let isUpdatingBgPosition = false;
let isMouseLeft = false;

addEventListener('mousemove', ({ clientX, clientY }) => {
    if (isUpdatingBgPosition) return;
    isUpdatingBgPosition = true;
    requestAnimationFrame(() => {
        if (isMouseLeft) return isUpdatingBgPosition = false;
        bg.style.setProperty('--tx', `${20 * (clientX - innerWidth / 2) / innerWidth}px`);
        bg.style.setProperty('--ty', `${20 * (clientY - innerHeight / 2) / innerHeight}px`);
        isUpdatingBgPosition = false;
    });
});

document.addEventListener('mouseleave', () => {
    isMouseLeft = true;
    bg.removeAttribute('style');
    applyBackgroundTransition();
});

document.addEventListener('mouseenter', () => {
    isMouseLeft = false;
    applyBackgroundTransition();
});

function applyBackgroundTransition() {
    bg.style.transition = 'transform .1s linear';
    bg.addEventListener('transitionend', () => bg.style.transition = '', { once: true });
}

const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="65 292 420 96">' +
  '<style>' +
  '@keyframes dash{0%{stroke-dashoffset:500px;}to{stroke-dashoffset:0;};}' +
  '@keyframes stroke-width{0%{stroke-width:3px;}to{stroke-width:12px;};}' +
  '@keyframes fade{0%{opacity:0;}to{opacity:1;};}' +
  'path{' +
  'fill:none;' +
  'stroke:%23fff;' +
  'stroke-linecap:round;' +
  'stroke-linejoin:round;' +
  'stroke-width:3px;' +
  'stroke-dasharray:500px;' +
  'stroke-dashoffset:500px;' +
  'animation:' +
  'dash 1s cubic-bezier(.8,0,.2,1) var(--delay) forwards,' +
  'stroke-width 1s cubic-bezier(.8,0,.2,1) calc(var(--delay) + .5s) forwards,' +
  'fade .2s linear var(--delay) forwards;' +
  '}' +
  '</style>' +
  '<path d="m 96.351207,364.13277 q -8.233336,0 -13.346672,-3.77001 -5.070002,-3.81333 -8.060003,-11.44 0,0 0,0 0,0 0,0 l 5.893336,-2.16667 q 0,0 0,0 0,0 0,0 2.21,5.89334 6.110002,8.62334 3.943335,2.68667 9.490004,2.68667 6.153336,0 9.576666,-2.81667 3.42334,-2.81667 3.42334,-7.84334 v 0 q 0,-4.55 -3.20667,-7.58333 -3.16333,-3.03334 -11.483337,-5.93667 -10.096671,-3.51 -13.953339,-7.32334 -3.856668,-3.85667 -3.856668,-10.09667 v 0 q 0,-6.80334 5.373335,-11.35334 5.373336,-4.59333 13.086673,-4.59333 6.240006,0 10.920006,3.12 4.68,3.12 7.75667,9.88 0,0 0,0 0,0 0,0 l -5.54667,2.21 q 0,0 0,0 0,0 0,0 -2.08,-4.89667 -5.2,-7.10667 -3.07667,-2.25333 -7.97334,-2.25333 -5.373335,0 -8.753337,2.94667 -3.336668,2.94666 -3.336668,6.89 v 0 q 0,3.46667 2.600001,6.11 2.600001,2.6 12.696672,6.11 10.010002,3.55334 13.650002,8.01667 3.64001,4.42001 3.64001,10.79001 v 0 q 0,7.67 -5.54667,12.30667 -5.50334,4.59334 -13.953343,4.59334 z" style="--delay:0.3s"/>' +
  '<path d="m 122.35119,363.35277 q 0,0 0,0 0,0 0,0 v -62.05336 q 0,0 0,0 0,0 0,0 h 6.06667 q 0,0 0,0 0,0 0,0 v 23.66001 0 q 2.16667,-3.38001 6.15333,-5.63334 4.03,-2.25333 8.71001,-2.25333 7.71333,0 11.96,4.85333 4.29,4.85334 4.29,12.52334 v 28.90335 q 0,0 0,0 0,0 0,0 h -6.15333 q 0,0 0,0 0,0 0,0 v -27.82002 q 0,-5.50333 -2.68667,-8.97 -2.68667,-3.51 -8.71,-3.51 -5.50334,0 -9.49001,3.94333 -3.98667,3.90001 -3.98667,10.18334 v 26.17335 q 0,0 0,0 0,0 0,0 z" style="--delay:0.5s"/>' +
  '<path d="m 171.8379,312.26274 q -1.86334,0 -3.20667,-1.34333 -1.34334,-1.34333 -1.34334,-3.29333 0,-1.86334 1.34334,-3.16334 1.34333,-1.34333 3.20667,-1.34333 1.95,0 3.29333,1.34333 1.34333,1.3 1.34333,3.16334 0,1.95 -1.34333,3.29333 -1.34333,1.34333 -3.29333,1.34333 z m -3.07667,51.09003 q 0,0 0,0 0,0 0,0 v -45.50002 q 0,0 0,0 0,0 0,0 h 6.15333 q 0,0 0,0 0,0 0,0 v 45.50003 q 0,0 0,0 0,0 0,0 z" style="--delay:0.7s"/>' +
  '<path d="m 189.69118,312.26274 q -1.86333,0 -3.20667,-1.34333 -1.34333,-1.34333 -1.34333,-3.29333 0,-1.86334 1.34333,-3.16334 1.34334,-1.34333 3.20667,-1.34333 1.95,0 3.29334,1.34333 1.34333,1.3 1.34333,3.16334 0,1.95 -1.34333,3.29333 -1.34334,1.34333 -3.29334,1.34333 z m -3.07667,51.09003 q 0,0 0,0 0,0 0,0 v -45.50002 q 0,0 0,0 0,0 0,0 h 6.15334 q 0,0 0,0 0,0 0,0 v 45.50002 q 0,0 0,0 0,0 0,0 z" style="--delay:0.9s"/>' +
  '<path d="m 202.30111,363.35277 v -45.50002 q 0,0 0,0 0,0 0,0 h 6.06667 q 0,0 0,0 0,0 0,0 v 7.71333 l -0.86667,-0.60666 h 0.86667 q 2.16667,-3.38001 6.15333,-5.63334 4.03001,-2.25333 8.71001,-2.25333 7.71333,0 11.96,4.85333 4.29,4.85334 4.29,12.52334 v 28.90335 q 0,0 0,0 0,0 0,0 h -6.15333 q 0,0 0,0 0,0 0,0 v -27.82002 q 0,-5.50333 -2.68667,-8.97 -2.68667,-3.51 -8.71,-3.51 -5.50334,0 -9.49001,3.94333 -3.98667,3.90001 -3.98667,10.18334 v 26.17335 q 0,0 0,0 0,0 0,0 h -6.15333 z" style="--delay:1.1s"/>' +
  '<path d="m 262.14449,358.02276 q 5.67667,0 9.92333,-3.98667 4.29001,-4.03 4.29001,-9.83667 v 0 q -2.16667,-1.47333 -5.59001,-2.51333 -3.38,-1.04 -7.06333,-1.04 -5.72,0 -8.88334,2.38333 -3.16333,2.34 -3.16333,6.50001 v 0 q 0,4.03 2.77333,6.28333 2.77334,2.21 7.71334,2.21 z m -0.30334,6.11001 q -7.19333,0 -11.91667,-3.94334 -4.68,-3.94333 -4.68,-10.4 v 0 q 0,-6.71667 4.98334,-10.66001 4.98333,-3.98667 13.17333,-3.98667 3.90001,0 7.06334,0.82334 3.20667,0.82333 5.89334,2.08 v -4.16 q 0,-5.11334 -3.20667,-8.06001 -3.20667,-2.94666 -8.79667,-2.94666 -3.9,0 -6.84667,1.60333 -2.94667,1.60333 -5.85,5.33 0,0 0,0 0,0 0,0 l -4.85334,-3.46667 q 0,0 0,0 0,0 0,0 3.51,-4.94 7.84334,-7.10667 4.33333,-2.16666 10.57334,-2.16666 7.49666,0 12.35,4.59333 4.89667,4.59334 4.89667,11.65667 v 30.03002 q 0,0 0,0 0,0 0,0 h -6.02334 q 0,0 0,0 0,0 0,0 v -9.18667 l 1.77667,1.64666 h -1.77667 q -2.16666,4.11667 -5.98,6.24 -3.81333,2.08001 -8.62334,2.08001 z" style="--delay:1.3s"/>' +
  '<path d="m 307.94791,363.35277 q 0,0 0,0 0,0 0,0 v -62.05336 q 0,0 0,0 0,0 0,0 h 7.75667 q 0,0 0,0 0,0 0,0 l 22.01334,52.43335 v 0 l 22.36001,-52.43335 q 0,0 0,0 0,0 0,0 h 7.75667 q 0,0 0,0 0,0 0,0 v 62.05336 q 0,0 0,0 0,0 0,0 h -6.32667 q 0,0 0,0 0,0 0,0 v -50.35336 -0.86667 0 l -21.32001,51.22003 q 0,0 0,0 0,0 0,0 h -5.07 q 0,0 0,0 0,0 0,0 l -20.84334,-50.52669 v 0 0.82333 49.70336 q 0,0 0,0 0,0 0,0 z" style="--delay:1.5s"/>' +
  '<path d="m 381.528,312.26274 q -1.86333,0 -3.20666,-1.34333 -1.34334,-1.34333 -1.34334,-3.29333 0,-1.86334 1.34334,-3.16334 1.34333,-1.34333 3.20666,-1.34333 1.95001,0 3.29334,1.34333 1.34333,1.3 1.34333,3.16334 0,1.95 -1.34333,3.29333 -1.34333,1.34333 -3.29334,1.34333 z m -3.07666,51.09003 q 0,0 0,0 0,0 0,0 v -45.50002 q 0,0 0,0 0,0 0,0 h 6.15333 q 0,0 0,0 0,0 0,0 v 45.50002 q 0,0 0,0 0,0 0,0 z" style="--delay:1.7s"/>' +
  '<path d="m 398.73127,379.81944 q 0,0 0,0 0,0 0,0 l 8.36334,-19.97668 0.34667,3.51001 -18.07001,-45.50002 q 0,0 0,0 0,0 0,0 h 6.54334 q 0,0 0,0 0,0 0,0 l 13.39,34.62334 0.39,1.21334 v 0 l 0.43334,-1.21334 13.91,-34.62334 q 0,0 0,0 0,0 0,0 h 6.41334 q 0,0 0,0 0,0 0,0 l -25.30668,61.96669 q 0,0 0,0 0,0 0,0 z" style="--delay:1.9s"/>' +
  '<path d="m 449.56128,364.13277 q -7.54001,0 -11.74334,-4.59334 -4.20334,-4.63667 -4.20334,-12.22 v -29.46668 q 0,0 0,0 0,0 0,0 h 6.15334 q 0,0 0,0 0,0 0,0 v 27.60334 q 0,6.19667 2.77333,9.49001 2.77334,3.25 8.32001,3.25 5.93667,0 9.57667,-4.07334 3.64,-4.07333 3.64,-10.53 v -25.74001 q 0,0 0,0 0,0 0,0 h 6.15334 q 0,0 0,0 0,0 0,0 v 45.50002 q 0,0 0,0 0,0 0,0 h -6.06667 q 0,0 0,0 0,0 0,0 v -10.09668 l 2.86,2.86001 h -2.86 q -2.16667,3.81333 -5.89334,5.93666 -3.68333,2.08001 -8.71,2.08001 z" style="--delay:2.1s"/>' +
  '</svg>';
const url = `url('data:image/svg+xml,${svg}')`;

function applyNameAnimation() {
    Object.assign(document.querySelector('header svg').style, {
        maskImage: url,
        WebkitMaskImage: url,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
    });
}

if (!document.getElementById('boot-terminal')) applyNameAnimation();

document.querySelector('.arrow svg').addEventListener('click', () => {
    smoothScrollTo(innerWidth > 880 ? .25 * innerHeight + 30 : .25 * innerHeight + 380);
});

function smoothScrollTo(target) {
    const { documentElement } = document;
    const start = documentElement.scrollTop;
    const startTime = performance.now();

    requestAnimationFrame(scroll);

    function scroll() {
        const time = Math.min(1, (performance.now() - startTime) / 200);
        const timeFunction = time * (2 - time);
        documentElement.scrollTop = (timeFunction * (target - start)) + start;
        if (Math.abs(documentElement.scrollTop - target) > 1) requestAnimationFrame(scroll);
    };
}

document.querySelectorAll('.overflow').forEach(e => {
    e.addEventListener('mouseenter', () => {
        if (e.scrollWidth > e.clientWidth) e.title = e.textContent.trim();
    });
});

fetch('/fetchgithub').then(r => r.json()).then(repos => {
    const stats = repos.pop();
    document.querySelectorAll('.stat').forEach((stat, i) => stat.textContent = stats[i]);
    document.querySelectorAll('.star').forEach((star, i) => star.textContent = repos[i][0]);
    document.querySelectorAll('.fork').forEach((fork, i) => fork.textContent = repos[i][1]);
});

const TIME_UNIT = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60]
];

!async function anilist() {
    const query = `query {
        Page(page: 1, perPage: 4) {
            activities(userId: 40847, sort: ID_DESC) {
                ... on ListActivity {
                    createdAt
                    status
                    progress
                    media {
                        coverImage {
                            medium
                        }
                        title {
                            english
                            romaji
                        }
                        siteUrl
                    }
                }
            }
        }
    }`;

    const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query })
    }).then(r => r.json());

    if (!res.data) return;

    const { activities } = res.data.Page;

    document.querySelectorAll('.anilist .activity').forEach((a, i) => a.href = activities[i].media.siteUrl);
    document.querySelectorAll('.anilist .activity .image').forEach((i, j) => i.style = `background-image: url(${imageProxy(activities[j].media.coverImage.medium)})`);
    document.querySelectorAll('.anilist .activity .status').forEach((s, i) => s.textContent = `${activities[i].status}${activities[i].progress ? ` ${activities[i].progress}` : ''}`.charAt(0).toUpperCase() + `${activities[i].status}${activities[i].progress ? ` ${activities[i].progress}` : ''}`.slice(1));
    document.querySelectorAll('.anilist .activity .title').forEach((t, i) => t.textContent = activities[i].media.title.english || activities[i].media.title.romaji);
    document.querySelectorAll('.anilist .activity time').forEach((t, i) => {
        const now = Math.floor(Date.now() / 1000);
        const diff = now - activities[i].createdAt;
        let textContent = 'just now';

        for (const [unit, value] of TIME_UNIT) {
            const amount = Math.floor(diff / value);
            if (amount > 0) {
                textContent = `${amount} ${unit}${amount > 1 ? 's' : ''} ago`;
                break;
            }
        }

        t.textContent = textContent;
        t.setAttribute('datetime', new Date(activities[i].createdAt * 1000).toISOString());
        t.title = new Date(activities[i].createdAt * 1000).toLocaleString();
    });
}();

fetch('/fetchlanyard').then(r => r.json()).then(updateLanyard);

!function lanyard() {
    const ws = new WebSocket('wss://api.lanyard.rest/socket');

    ws.addEventListener('open', () => ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: '871407667501994015' } })));
    ws.addEventListener('error', () => ws.close());
    ws.addEventListener('close', () => setTimeout(lanyard, 1000));
    ws.addEventListener('message', async ({ data }) => {
        const { t, d } = JSON.parse(data);
        if (t !== 'INIT_STATE' && t !== 'PRESENCE_UPDATE') return;
        updateLanyard(d);
    });
}();

const ACTIVITY_TYPE = ['Playing', 'Streaming to', 'Listening to', 'Watching', 'Custom status', 'Competing in'];
const STATUS_COLOR = { online: '#4b8', idle: '#fa1', dnd: '#f44', offline: '#778' };
const cache = new Map();

function updateLanyard({ discord_user, discord_status, activities }) {
    update('.discord .avatar', 'style', `background-image: url(${imageProxy(`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.webp?size=80`)})`);
    update('.discord .display-name', 'textContent', discord_user.display_name);
    update('.discord .color-dot', 'style', `background-color: ${STATUS_COLOR[discord_status]}`);

    activities = activities.filter(a => a.type !== 4);
    if (!activities.length) {
        update('.discord .status', 'textContent', discord_status);
        update('.discord .activity', 'textContent', '');
        update('.discord .details', 'textContent', '');
        update('.discord .state', 'textContent', '');
        update('.discord .large-image', 'style', '');
        update('.discord .large-image', 'title', '');
        update('.discord .small-image', 'style', '');
        update('.discord .small-image', 'title', '');
        setRpcTimestamp('undefined undefined');
        return;
    }

    const a = activities[0];

    ['large', 'small'].forEach(async s => {
        const size = s === 'large' ? 160 : 60;
        let imageUrl = a.assets?.[`${s}_image`];
        if (!imageUrl) {
            if (s === 'large') {
                const { icon } = await fetch(`https://discord.com/api/v10/applications/${a.application_id}/rpc`).then(r => r.json());
                if (icon) return update(`.discord .${s}-image`, 'style', `background-image: url(${imageProxy(`https://cdn.discordapp.com/app-icons/${a.application_id}/${icon}.png?size=${size}`)})`);
            }
            update(`.discord .${s}-image`, 'style', '');
            update(`.discord .${s}-image`, 'title', '');
            if (s === 'small') update(`.discord .image-container foreignObject`, 'mask', '');
            return;
        }
        if (imageUrl.startsWith('mp:')) imageUrl = `https://media.discordapp.net/${imageUrl.slice(3)}?width=${size}&height=${size}`;
        else if (imageUrl.startsWith('spotify:')) imageUrl = `https://i.scdn.co/image/${imageUrl.slice(8)}`;
        else imageUrl = `https://cdn.discordapp.com/app-assets/${a.application_id}/${imageUrl}.png?size=${size}`;
        update(`.discord .${s}-image`, 'style', `background-image: url(${imageProxy(imageUrl)})`);
        update(`.discord .${s}-image`, 'title', a.assets?.[`${s}_text`] || '');
        if (s === 'small') update(`.discord .image-container foreignObject`, 'mask', 'url(#mask-large-image)');
    });

    update('.discord .status', 'textContent', ACTIVITY_TYPE[a.type]);
    update('.discord .activity', 'textContent', a.name);
    update('.discord .details', 'textContent', a.details);
    update('.discord .state', 'textContent', a.state);

    const timestamp = `${a.timestamps?.start} ${a.timestamps?.end}`;
    if (cache.get('timestamp') !== timestamp) setRpcTimestamp(timestamp);
}

function imageProxy(url) {
    return `https://chino.is-a.dev/cdn-cgi/image/format=avif/${url}`;
}

function update(selector, property, value) {
    const key = `${selector} ${property}`;
    if (cache.get(key) === value) return;

    let e = cache.get(selector);
    if (!e) cache.set(selector, e = document.querySelector(selector));
    if (['mask', 'datetime'].includes(property)) e.setAttribute(property, value);
    else e[property] = value;
    cache.set(key, value);
}

function setRpcTimestamp(timestamp = 'undefined undefined') {
    cache.set('timestamp', timestamp);

    if (timestamp === 'undefined undefined') {
        update('.discord .timestamp', 'textContent', '');
        update('.discord .timebar-container', 'style', 'display: none');
        return;
    }

    if (timestamp.includes('undefined')) {
        timestamp = Number(timestamp.split(' ')[0] === 'undefined' ? timestamp.split(' ')[1] : timestamp.split(' ')[0]);
        const diff = Math.abs(timestamp - Date.now());
        const hour = Math.floor(diff / 1000 / 60 / 60);
        const minute = Math.floor(diff / 1000 / 60) % 60;
        const second = Math.floor(diff / 1000) % 60;
        update('.discord .timestamp', 'textContent', `${hour ? `${padZero(hour)}:` : ''}${padZero(minute)}:${padZero(second)} ${timestamp > Date.now() ? 'left' : 'elapsed'}`);
        update('.discord .timebar-container', 'style', 'display: none');
        return;
    }

    const [start, end] = timestamp.split(' ').map(t => Number(t));
    const now = Date.now();
    const total = end - start;
    const current = now < end ? now - start : total;
    const progress = current / total * 100;
    const currentHour = Math.floor(current / 1000 / 60 / 60);
    const currentMinute = Math.floor(current / 1000 / 60) % 60;
    const currentSecond = Math.floor(current / 1000) % 60;
    const totalHour = Math.floor(total / 1000 / 60 / 60);
    const totalMinute = Math.floor(total / 1000 / 60) % 60;
    const totalSecond = Math.floor(total / 1000) % 60;
    update('.discord .current-time', 'textContent', `${currentHour ? `${padZero(currentHour)}:` : ''}${padZero(currentMinute)}:${padZero(currentSecond)}`);
    update('.discord .total-time', 'textContent', `${totalHour ? `${padZero(totalHour)}:` : ''}${padZero(totalMinute)}:${padZero(totalSecond)}`);
    update('.discord .timebar-progress', 'style', `width: ${Math.max(0, Math.min(100, progress))}%`);
    update('.discord .timebar-container', 'style', 'display: flex');
}

function padZero(n) {
    return n.toString().padStart(2, '0');
}

const visitTime = new Date().setSeconds(0, 0);

!function setClock() {
    const now = Date.now();
    const [month, day, year, hour, minute, second] = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false }).match(/\d+/g).map(Number);
    const hourOffset = -new Date().getTimezoneOffset() / 60;
    const utcTime = new Date(now - now % 1000 - hourOffset * 60 * 60 * 1000);
    const timezoneOffset = (new Date(year, month - 1, day, hour, minute, second) - utcTime) / 1000 / 60 / 60;
    const timezoneDiff = timezoneOffset - hourOffset;
    const myTime = new Date(now + timezoneDiff * 60 * 60 * 1000);
    const utcOffset = `${(timezoneOffset >= 0 ? '+' : '')}${Math.floor(timezoneOffset)}:${(timezoneOffset % 1 * 60).toString().padStart(2, '0')}`;

    update('.clock .hour-hand', 'style', `transform: rotate(${hour % 12 / 12 * 360 + minute / 60 * 30 + second / 60 / 60 * 30}deg)`);
    update('.clock .minute-hand', 'style', `transform: rotate(${minute / 60 * 360 + second / 60 * 6}deg)`);
    update('.clock .second-hand', 'style', `transform: rotate(${360 * Math.floor((now - visitTime) / 60 / 1000) + second / 60 * 360}deg)`);
    update('.clock .date', 'textContent', myTime.toLocaleDateString());
    update('.clock .date-container', 'datetime', myTime.toISOString().split('T')[0]);
    update('.clock .hour', 'textContent', padZero(hour));
    update('.clock .minute', 'textContent', padZero(minute));
    update('.clock .second', 'textContent', padZero(second));
    update('.clock .time-container', 'datetime', myTime.toISOString().split('T')[1].split('.')[0]);
    update('.clock .timezone-diff', 'textContent', timezoneDiff === 0 ? 'same time' : (timezoneDiff > 0 ? `${formatTimezone(timezoneDiff)} ahead` : `${formatTimezone(-timezoneDiff)} behind`));
    update('.clock .utc-offset', 'textContent', ` / UTC ${utcOffset}`);
    update('.clock .utc-offset', 'datetime', utcOffset);

    setRpcTimestamp(cache.get('timestamp'));

    setTimeout(setClock, 1000 - now % 1000);
}();

function formatTimezone(timezoneDiff) {
    const hour = Math.floor(Math.abs(timezoneDiff));
    const minute = Math.abs(timezoneDiff % 1 * 60);
    return `${timezoneDiff < 0 ? '-' : ''}${hour}h${minute ? ` ${minute}m` : ''}`;
}


let isRecording = false;
let recoder;
let stream;

document.querySelector('.recorder').addEventListener('click', async () => {
    if (!isRecording) {
        stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: { frameRate: { ideal: 60 } } });
        recoder = new MediaRecorder(stream);
        const [video] = stream.getVideoTracks();

        recoder.start();
        isRecording = true;

        video.addEventListener('ended', () => {
            recoder.stop();
            isRecording = false;
        });

        recoder.addEventListener('dataavailable', e => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(e.data);
            a.download = 'watch if cute.webm';
            a.click();
        });
    } else {
        recoder.stop();
        stream.getTracks().forEach(track => track.stop());
        isRecording = false;
    }
});
