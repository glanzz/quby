import { app } from '@azure/functions';
import getFeeds from './feed-fetcher.js';

console.log("Start App....");
app.timer('qubyreporter', {
    schedule: '0/1 * * * * *',
    runOnStartup: true,
    handler: async (myTimer, context) => {
      context.log("Running service...");
      try {

        await getFeeds(context);
      } catch(error) {
        context.log("Error....")
      }
     return {"message": "Job Run Successful !"}
    }
});
