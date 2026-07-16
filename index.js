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
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="95 278 580 95">' +
  '<style>' +
  '@keyframes dash{0%{stroke-dashoffset:400px;}to{stroke-dashoffset:0;};}' +
  '@keyframes stroke-width{0%{stroke-width:3px;}to{stroke-width:12px;};}' +
  '@keyframes fade{0%{opacity:0;}to{opacity:1;};}' +
  'path{' +
  'fill:none;' +
  'stroke:%23fff;' +
  'stroke-linecap:round;' +
  'stroke-linejoin:round;' +
  'stroke-width:3px;' +
  'stroke-dasharray:400px;' +
  'stroke-dashoffset:400px;' +
  'animation:' +
  'dash 1s cubic-bezier(.8,0,.2,1) var(--delay) forwards,' +
  'stroke-width 1s cubic-bezier(.8,0,.2,1) calc(var(--delay) + .5s) forwards,' +
  'fade .2s linear var(--delay) forwards;' +
  '}' +
  '</style>' +
  '<path d="m 137.94923,297.83282 v -1.1849 q 0,-1.26953 0.4655,-1.81966 0.50781,-0.55013 1.31185,-0.55013 0.80404,0 1.26953,0.55013 0.50781,0.55013 0.50781,1.81966 v 9.056 q 0,1.26953 -0.50781,1.81966 -0.46549,0.55013 -1.26953,0.55013 -0.76172,0 -1.26953,-0.50781 -0.4655,-0.50782 -0.50782,-1.6504 -0.21158,-3.55468 -3.68164,-6.38997 -3.42773,-2.83529 -9.01367,-2.83529 -5.88217,0 -9.35222,3.04688 -3.47005,3.00456 -3.47005,7.10937 0,2.11589 0.9733,3.85092 0.97331,1.73502 2.58139,2.83529 1.60807,1.05794 3.63932,1.73502 2.03125,0.63477 6.34766,1.35417 7.23633,1.1849 9.98698,2.41211 3.68164,1.65039 5.54362,4.57031 1.9043,2.91993 1.9043,6.89779 0,6.09376 -4.86654,10.41016 -4.86654,4.27409 -13.11849,4.27409 -9.26758,0 -14.81121,-5.79752 v 2.03125 q 0,1.26953 -0.50781,1.81966 -0.46549,0.55013 -1.26953,0.55013 -0.76172,0 -1.26953,-0.55013 -0.50782,-0.55013 -0.50782,-1.81966 v -9.81772 q 0,-1.31185 0.4655,-1.86198 0.50781,-0.55013 1.31185,-0.55013 0.76172,0 1.22721,0.50782 0.50782,0.50781 0.55013,1.65039 0.21159,3.89323 4.14714,7.10938 3.97787,3.17383 10.66407,3.17383 6.6862,0 10.53711,-3.3431 3.89323,-3.34311 3.89323,-7.91342 0,-2.79297 -1.48112,-4.95117 -1.48112,-2.20053 -4.40104,-3.47006 -2.03125,-0.88867 -8.46355,-1.98893 -8.8444,-1.48112 -12.73763,-4.528 -3.89323,-3.04687 -3.89323,-8.67513 0,-5.58594 4.44336,-9.60612 4.48568,-4.02019 11.80664,-4.02019 7.44792,0 12.82227,4.69727 z" style="--delay:0.3s"/>' +
  '<path d="m 165.54039,290.68112 v 21.87827 q 3.38542,-3.68164 6.47461,-5.16276 3.13151,-1.52344 6.98243,-1.52344 4.14713,0 7.02474,1.48112 2.91992,1.4388 4.86654,4.48568 1.94661,3.00456 1.94661,6.34766 v 22.04753 h 3.97787 q 1.31185,0 1.81966,0.50781 0.55013,0.4655 0.55013,1.26953 0,0.76172 -0.55013,1.26954 -0.50781,0.50781 -1.81966,0.50781 h -11.55274 q -1.31185,0 -1.86198,-0.50781 -0.55013,-0.50782 -0.55013,-1.26954 0,-0.80403 0.55013,-1.26953 0.55013,-0.50781 1.86198,-0.50781 h 3.97787 v -21.79363 q 0,-3.85091 -2.79297,-6.43229 -2.75065,-2.58138 -7.70183,-2.58138 -3.89323,0 -6.64388,1.90429 -1.98893,1.35417 -6.55925,6.38998 v 22.51303 h 4.02018 q 1.26954,0 1.81967,0.50781 0.55013,0.4655 0.55013,1.26953 0,0.76172 -0.55013,1.26954 -0.55013,0.50781 -1.81967,0.50781 h -11.59505 q -1.26953,0 -1.81966,-0.50781 -0.55013,-0.50782 -0.55013,-1.26954 0,-0.80403 0.55013,-1.26953 0.55013,-0.50781 1.81966,-0.50781 h 4.02018 v -45.95705 h -4.7819 q -1.26953,0 -1.81966,-0.50781 -0.55013,-0.50782 -0.55013,-1.31185 0,-0.76172 0.55013,-1.26953 0.55013,-0.50782 1.81966,-0.50782 z" style="--delay:0.5s"/>' +
  '<path d="m 231.00591,288.90378 v 9.18295 h -5.2474 v -9.18295 z m 0.12695,18.23894 v 33.09246 h 13.96485 q 1.31185,0 1.86198,0.50781 0.55013,0.4655 0.55013,1.26953 0,0.76172 -0.55013,1.26954 -0.55013,0.50781 -1.86198,0.50781 h -31.48438 q -1.26954,0 -1.81967,-0.50781 -0.55013,-0.50782 -0.55013,-1.26954 0,-0.80403 0.55013,-1.26953 0.55013,-0.50781 1.81967,-0.50781 h 13.96485 v -29.49545 h -10.36785 q -1.26953,0 -1.86198,-0.50782 -0.55013,-0.50781 -0.55013,-1.26953 0,-0.80404 0.55013,-1.31185 0.55013,-0.50781 1.86198,-0.50781 z" style="--delay:0.7s"/>' +
  '<path d="m 283.0144,288.90378 v 9.18295 h -5.2474 v -9.18295 z m 0.12695,18.23894 v 33.09246 h 13.96485 q 1.31185,0 1.86198,0.50781 0.55013,0.4655 0.55013,1.26953 0,0.76172 -0.55013,1.26954 -0.55013,0.50781 -1.86198,0.50781 h -31.48439 q -1.26953,0 -1.81966,-0.50781 -0.55013,-0.50782 -0.55013,-1.26954 0,-0.80403 0.55013,-1.26953 0.55013,-0.50781 1.81966,-0.50781 h 13.96485 v -29.49545 h -10.36784 q -1.26953,0 -1.86198,-0.50782 -0.55013,-0.50781 -0.55013,-1.26953 0,-0.80404 0.55013,-1.31185 0.55013,-0.50781 1.86198,-0.50781 z" style="--delay:0.9s"/>' +
  '<path d="m 321.77743,307.14272 v 5.37435 q 3.72396,-3.76628 6.72852,-5.20508 3.00456,-1.4388 6.77084,-1.4388 4.0625,0 7.4056,1.73502 2.36979,1.26954 4.27409,4.23178 1.94661,2.91992 1.94661,6.00911 v 22.38608 h 3.00456 q 1.26953,0 1.81966,0.50781 0.55013,0.4655 0.55013,1.26953 0,0.76172 -0.55013,1.26954 -0.55013,0.50781 -1.81966,0.50781 h -9.52149 q -1.31185,0 -1.86198,-0.50781 -0.55013,-0.50782 -0.55013,-1.26954 0,-0.80403 0.55013,-1.26953 0.55013,-0.50781 1.86198,-0.50781 h 2.96224 v -21.79363 q 0,-3.76628 -2.75065,-6.34766 -2.75065,-2.6237 -7.36328,-2.6237 -3.51237,0 -6.09375,1.43881 -2.58139,1.39648 -7.36329,7.02474 v 22.30144 h 4.02019 q 1.26953,0 1.81966,0.50781 0.55013,0.4655 0.55013,1.26953 0,0.76172 -0.55013,1.26954 -0.55013,0.50781 -1.81966,0.50781 h -11.59506 q -1.26953,0 -1.81966,-0.50781 -0.55013,-0.50782 -0.55013,-1.26954 0,-0.80403 0.55013,-1.26953 0.55013,-0.50781 1.81966,-0.50781 h 4.02018 v -29.49545 h -3.00456 q -1.26953,0 -1.81966,-0.50782 -0.55013,-0.50781 -0.55013,-1.31185 0,-0.76172 0.55013,-1.26953 0.55013,-0.50781 1.81966,-0.50781 z" style="--delay:1.1s"/>' +
  '<path d="m 390.93673,325.18678 q -2.45833,-0.70834 -5.20833,-1.04167 -2.75,-0.33333 -5.79166,-0.33333 -7.625,0 -11.91666,3.29166 -3.25,2.45833 -3.25,5.875 0,3.16667 2.45833,5.33333 2.5,2.16667 7.25,2.16667 4.54166,0 8.41666,-1.79167 3.91666,-1.83333 8.04166,-5.79166 z m 0.00000,17.41666 v -5.04167 q -7.62499,6.41667 -16.29166,6.41667 -6.29166,0 -9.83333,-3.16667 -3.54166,-3.20833 -3.54166,-7.83333 0,-5.08333 4.66666,-8.875 4.66667,-3.79166 13.625,-3.79166 2.41666,0 5.24999,0.33333 2.83334,0.29167 6.125,0.95833 v -5.66666 q 0,-2.875 -2.66666,-5 -2.66667,-2.125 -8,-2.125 -4.08333,0 -11.45833,2.375 -1.33333,0.41667 -1.70833,0.41667 -0.66667,0 -1.16667,-0.5 -0.45833,-0.5 -0.45833,-1.25 0,-0.70833 0.41667,-1.125 0.58333,-0.625 4.70833,-1.70833 6.49999,-1.75 9.83333,-1.75 6.62499,0 10.33333,3.29166 3.70833,3.25 3.70833,7.375 v 23.16666 h 4.66666 q 1.29167,0 1.83333,0.5 0.54167,0.45833 0.54167,1.25 0,0.75 -0.54167,1.25 -0.54166,0.5 -1.83333,0.5 z" style="--delay:1.3s"/>' +
  '<path d="m 485.60336,327.97844 h -4 l -13.45832,-30.62499 h -0.66667 v 41.74999 h 6.45833 q 1.25,0 1.79167,0.5 0.54166,0.45833 0.54166,1.25 0,0.75 -0.54166,1.25 -0.54167,0.5 -1.79167,0.5 h -12.91666 q -1.25,0 -1.79167,-0.5 -0.54166,-0.5 -0.54166,-1.25 0,-0.79167 0.54166,-1.25 0.54167,-0.5 1.79167,-0.5 h 2.95833 v -41.74999 h -2.20833 q -1.25,0 -1.79167,-0.45833 -0.54166,-0.5 -0.54166,-1.29166 0,-0.79167 0.54166,-1.25 0.54167,-0.5 1.79167,-0.5 h 8.58333 l 13.24999,30.16665 13.04166,-30.16665 h 8.58333 q 1.29167,0 1.83334,0.5 0.54166,0.45833 0.54166,1.25 0,0.79166 -0.54166,1.29166 -0.54167,0.45833 -1.83334,0.45833 h -2.16666 v 41.74999 h 2.91666 q 1.29167,0 1.83334,0.5 0.54166,0.45833 0.54166,1.25 0,0.75 -0.54166,1.25 -0.54167,0.5 -1.83334,0.5 h -12.87499 q -1.25,0 -1.83333,-0.5 -0.54167,-0.5 -0.54167,-1.25 0,-0.79167 0.54167,-1.25 0.54166,-0.5 1.83333,-0.5 h 6.45833 v -41.74999 h -0.75 z" style="--delay:1.5s"/>' +
  '<path d="m 536.22834,288.56179 v 9.04166 h -5.16666 v -9.04166 z m 0.12500,17.95833 v 32.58332 h 13.75 q 1.29166,0 1.83333,0.5 0.54166,0.45833 0.54166,1.25 0,0.75 -0.54166,1.25 -0.54167,0.5 -1.83333,0.5 h -30.99999 q -1.25,0 -1.79167,-0.5 -0.54166,-0.5 -0.54166,-1.25 0,-0.79167 0.54166,-1.25 0.54167,-0.5 1.79167,-0.5 h 13.74999 v -29.04166 h -10.20833 q -1.25,0 -1.83333,-0.5 -0.54167,-0.5 -0.54167,-1.25 0,-0.79166 0.54167,-1.29166 0.54167,-0.5 1.83333,-0.5 z" style="--delay:1.7s"/>' +
  '<path d="m 585.93666,342.60344 -16.25,-32.54166 H 568.645 q -1.25,0 -1.79167,-0.5 -0.54167,-0.5 -0.54167,-1.25 0,-0.54166 0.25,-0.95833 0.29167,-0.45833 0.70834,-0.625 0.45833,-0.20833 1.375,-0.20833 h 9.58332 q 1.25,0 1.79167,0.5 0.54167,0.5 0.54167,1.29166 0,0.75 -0.54167,1.25 -0.54167,0.5 -1.79167,0.5 h -4.70833 l 14.29166,28.70832 14.08333,-28.70832 h -4.70833 q -1.25,0 -1.79167,-0.5 -0.54166,-0.5 -0.54166,-1.29166 0,-0.75 0.54166,-1.25 0.54167,-0.5 1.79167,-0.5 h 9.54166 q 1.29167,0 1.83334,0.5 0.54166,0.5 0.54166,1.29166 0,0.54167 -0.33333,1 -0.33333,0.45834 -0.75,0.625 -0.41667,0.125 -2.33333,0.125 l -22.16666,45.12498 h 5.45833 q 1.25,0 1.79167,0.45834 0.54166,0.5 0.54166,1.29166 0,0.75 -0.54166,1.25 -0.54167,0.5 -1.79167,0.5 h -20.16666 q -1.25,0 -1.79166,-0.5 -0.54167,-0.45833 -0.54167,-1.25 0,-0.79166 0.54167,-1.29166 0.54166,-0.45834 1.79166,-0.45834 h 10.95833 z" style="--delay:1.9s"/>' +
  '<path d="m 648.89496,342.60344 v -5.125 q -7.16666,6.5 -15.49999,6.5 -5.125,0 -7.79166,-2.79167 -3.45834,-3.66667 -3.45834,-8.54166 v -22.58333 h -4.70833 q -1.25,0 -1.79166,-0.5 -0.54167,-0.5 -0.54167,-1.29166 0,-0.75 0.54167,-1.25 0.54166,-0.5 1.79166,-0.5 h 8.20833 v 26.12499 q 0,3.41666 2.16667,5.62499 2.16666,2.20834 5.41666,2.20834 8.54167,0 15.66666,-7.83333 v -22.58333 h -6.45833 q -1.25,0 -1.79166,-0.5 -0.54167,-0.5 -0.54167,-1.29166 0,-0.75 0.54167,-1.25 0.54166,-0.5 1.79166,-0.5 h 9.95833 v 32.58332 h 2.95833 q 1.25,0 1.79167,0.5 0.54167,0.45833 0.54167,1.25 0,0.75 -0.54167,1.25 -0.54167,0.5 -1.79167,0.5 z" style="--delay:2.1s"/>' +
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
