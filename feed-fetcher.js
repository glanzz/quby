import RSSParser from 'rss-parser';
import { FEED_PROVIDER, getPayload, getSnippet } from './constants.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FetchDBModel from './fetch-model.js';
import { WebClient } from '@slack/web-api';
import { getAllChannels, sendMessageToChannels } from './slack-utils.js';




/// INITALIZATION /////
dotenv.config();
const SLACK_TOKEN = process.env.SLACK_TOKEN;
mongoose.connect(process.env.MONGO_CONNECTION);
const parser = new RSSParser();
const web = new WebClient(SLACK_TOKEN);




//// CORE FETCHER
async function getFeeds(context) {
  context.info("Fetching feeds....");
  
  context.log("Fetching channels information...")
  const channels = await getAllChannels(web);
  context.log("Fetched channels !");

  // context.log(channels);
  
  context.log("Sending feeds to channels...")
  for(let provider in FEED_PROVIDER) {
    const providerInfo = FEED_PROVIDER[provider];
    try {
      const feed = await parser.parseURL(providerInfo.url);
      const latestPost = feed.items[0];
      let existingFeed = await FetchDBModel.findOne({ provider });
      if(!existingFeed || (existingFeed.postedOn !== latestPost.isoDate)) {
        // Send to bot
        const snippet = latestPost.contentSnippet ? getSnippet(latestPost.contentSnippet) : "Check out the post by visiting the site.";
        const payload = getPayload(providerInfo.displayName, latestPost.title, snippet, latestPost.link);
        context.log(payload);
        // Send to slack
        await sendMessageToChannels(web, channels, payload);

        // Save Content
        if (!existingFeed) {
          existingFeed = new FetchDBModel({
            provider: provider,
            title: latestPost.title,
            postedOn: latestPost.isoDate,
            content: snippet,
            link: latestPost.link,
          });
          context.log(`New Provider Added: ${provider}`);
        } else {
          existingFeed.title = latestPost.title;
          existingFeed.postedOn = latestPost.postedOn;
          existingFeed.content = snippet;
          existingFeed.link = latestPost.link;
          context.log(`Provider exists: ${provider}`);
        }
        await existingFeed.save();
        context.log(`New post found: ${provider}: ${latestPost.title}, API called.`);
      } else {
        context.log(`No New post found for ${provider}`);
      }
    
    } catch (error) {
      context.error(`Error fetching feed for ${provider}:`, error);
      continue;
    }
  }
  return 0;
}


export default getFeeds;


