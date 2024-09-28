
export async function getAllChannels(web) {
  /**
   * Fetch all channels with access and return list of channels
   */
  try {
    const result = await web.conversations.list({
      types: 'public_channel,private_channel'
    });

    // Extract channels from the response
    return result.channels.filter(channel => channel.is_member);
  } catch (error) {
    console.error('Failed to fetch channels:', error);
  }
}


export async function sendMessageToChannels(web, channels, message) {
  /**
   * Send payload as blocks to all channels given in the channels list
   */
  
    for (const channel of channels) {
      try{ 
        await web.chat.postMessage({
          channel: channel.id,
          ...message
        });
      } catch (error) {
        console.error(`Error sending message to channel ${channel.id}:`, error);
        continue;
      }
    }
    console.log('Message sent to all channels.');
}
