module.exports = {
  "Shows FeedPage": function(browser) {
    browser
      .url(browser.launch_url + "/#/feed")
      .waitForElementVisible("div")
      .assert.title("kudo-o-matic")
      .assert.containsText("header", "FEED");
  },
  "Shows list of transactions": function(browser) {
    browser.waitForElementVisible("#transactionList");
  },
  "List of transactions contains transactions": function(browser) {
    browser.waitForElementVisible("#transaction");
  },
  "Like of transaction results in like/total Amount increase": function(
    browser
  ) {
    let currentValue;
    let currentLikes;

    browser
      .getText("#transactionList li:nth-child(1) #kudoAmount ", result => {
        currentValue = parseInt(result.value);
      })
      .getText("#transactionList li:nth-child(1) #likeAmount ", result => {
        currentLikes = parseInt(result.value);
      })
      .click("#transactionList li:nth-child(1) #likeTransaction")
      .pause(500)
      .getText("#transactionList li:nth-child(1) #kudoAmount ", result => {
        browser.assert.equal(result.value, currentValue + 1);
      })
      .getText("#transactionList li:nth-child(1) #likeAmount ", result => {
        browser.assert.equal(result.value, currentLikes + 1);
      });
  },
  "UnLike of transaction results in like/total Amount decrease": function(
    browser
  ) {
    let currentValue;
    let currentLikes;

    browser
      .getText("#transactionList li:nth-child(1) #kudoAmount ", result => {
        currentValue = parseInt(result.value);
      })
      .getText("#transactionList li:nth-child(1) #likeAmount ", result => {
        currentLikes = parseInt(result.value);
      })
      .click("#transactionList li:nth-child(1) #likeTransaction")
      .pause(500)
      .getText("#transactionList li:nth-child(1) #kudoAmount ", result => {
        browser.assert.equal(result.value, currentValue - 1);
      })
      .getText("#transactionList li:nth-child(1) #likeAmount ", result => {
        browser.assert.equal(result.value, currentLikes - 1);
      })
      .end();
  }
};
