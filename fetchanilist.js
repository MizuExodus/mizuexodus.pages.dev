async function anilistGetViewer() {
    return anilistQuery(`
        query {
            Viewer {
                id
                name
                siteUrl
                avatar { large }
            }
        }
    `);
}

async function anilistGetActivity(username) {
    return anilistQuery(`
        query ($username: String) {
            Page(perPage: 4) {
                activities(userName: $username, sort: ID_DESC, type: MEDIA_LIST) {
                    ... on ListActivity {
                        status
                        progress
                        createdAt
                        siteUrl
                        media {
                            title { userPreferred }
                            coverImage { medium }
                            siteUrl
                        }
                    }
                }
            }
        }
    `, { username });
}