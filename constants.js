
export const FEED_PROVIDER = {
  "QISKIT_BLOG": {
    name: "QISKIT_BLOG",
    url: "https://medium.com/feed/qiskit",
    displayName: "Qiskit Blog"
  },
  "MIT_NEWS": {
    name: "MIT_NEWS",
    url: "https://news.mit.edu/topic/mitquantum-computing-rss.xml",
    displayName: "MIT News"
  },
  "UNTANGLED": {
    name: "UNTANGLED",
    url: "https://techmonitor.substack.com/feed",
    displayName: "Quantum Untangled"
  },
  "QUTECH": {
    name: "QUTECH",
    url: "https://blog.qutech.nl/feed",
    displayName: "QuTech"
  },
  "Quandella": {
    name: "Quandella",
    url: "https://medium.com/feed/quandela",
    displayName: "Quandela"
  },
  "AMAZON": {
    name: "AMAZON",
    url: "https://aws.amazon.com/blogs/quantum-computing/feed",
    displayName: "Amazon Quantum Blog"
  },
  "WATERLOO": {
    name: "WATERLOO",
    url: "https://uwaterloo.ca/institute-for-quantum-computing/news/news.xml",
    displayName: "UWaterloo"
  },
};


export const getSnippet = (text) => `${text.slice(0,200)}...`



export const getPayload = (provider, title, snippet, link) => {
  return {
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": `${provider}: ${title}`,
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "```" + `${snippet}` + "```",
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "View",
            "emoji": true
          },
          "url": link
        }
      }
    ]
  }
}

