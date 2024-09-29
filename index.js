import { app } from '@azure/functions';
import getFeeds from './feed-fetcher.js';


app.timer('qubyreporter', {
    schedule: '0 7 * * * *',
    handler: (myTimer, context) => {
      getFeeds();
    }
});
