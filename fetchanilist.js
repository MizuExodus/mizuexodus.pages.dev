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

async function anilistGetActivity(userId) {
    return anilistQuery(`
        query ($userId: Int) {
            Page(perPage: 4) {
                activities(userId: $userId, sort: ID_DESC, type: MEDIA_LIST) {
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
    `, { userId });
}