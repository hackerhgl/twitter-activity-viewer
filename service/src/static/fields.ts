export const fields = {
    homeBase:
        'div[data-testid="primaryColumn"] div[aria-label="Home timeline"]',
    username: 'input[autocomplete="username"]',
    // email: 'input[autocomplete="email"]',
    text: 'input[name="text"]',
    value: (val: string) => `input[value="${val}"]`,
    password: 'input[autocomplete="current-password"]',
    modal: {
        alreadyLoggedIn:
            'div[data-testid="confirmationSheetDialog"] span[id="modal-header"]',
    },
    tweet: {
        base: 'div[data-testid="cellInnerDiv"] div div article[role="article"]',
        root: 'div[data-testid="cellInnerDiv"]',
        rootTweets: 'section[role="region"] > div > div > div',
    },
    loader: 'div[role="progressbar"] svg circle',
};
