export const fields = {
    homeBase:
        'div[data-testid="primaryColumn"] div[aria-label="Home timeline"]',
    email: 'input[autocomplete="username"]',
    text: 'input[name="text"]',
    password: 'input[autocomplete="current-password"]',
    tweet: {
        base: 'div[data-testid="cellInnerDiv"] div div article[role="article"]',
        root: 'div[data-testid="cellInnerDiv"]',
        rootTweets: 'section[role="region"] > div > div > div',
    },
    loader: 'div[role="progressbar"] svg circle',
};
