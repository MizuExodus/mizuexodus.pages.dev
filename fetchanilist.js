const ANILIST_USER_ID = 7883267;

async function anilistGetActivity() {
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
                        }
                    }
                }
            }
        }
    `, { userId: ANILIST_USER_ID });
}