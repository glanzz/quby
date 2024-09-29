import { app } from '@azure/functions';
import getFeeds from './feed-fetcher.js';


app.timer('qubyreporter', {
    schedule: '0 7 * * * *',
    handler: async (myTimer, context) => {
     await getFeeds();
     return {"message": "Job Run Successful !"}
    }
});
