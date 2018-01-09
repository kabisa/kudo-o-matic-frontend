module.exports = {
  "Shows FeedPage": function(browser) {
    browser
      .url(browser.launch_url + "/#/feed")
      .waitForElementVisible("div")
      .assert.title("kudo-o-matic")
      .assert.containsText("header", "FEED");
  },
  "Shows list of transactions": function(browser) {
    browser.waitForElementVisible("#feedContainer");
  },
  "List of transactions contains transactions": function(browser) {
    browser
      .useXpath()
      .waitForElementVisible(
        "//div[contains(@class, 'Transaction__transaction')]"
      );
  },
  "Like of transaction results in like/total Amount increase": function(
    browser
  ) {
    let currentValue;
    let currentLikes;

    browser
      .getText("//p[@id = 'kudoAmount']", result => {
        currentValue = parseInt(result.value);
      })
      .getText("//span[@id = 'likeAmount'] ", result => {
        currentLikes = parseInt(result.value);
      })
      .click("//a[@id = 'likeTransaction'] ")
      .pause(500)
      .getText("//p[@id = 'kudoAmount']", result => {
        browser.assert.equal(result.value, currentValue + 1);
      })
      .getText("//span[@id = 'likeAmount'] ", result => {
        browser.assert.equal(result.value, currentLikes + 1);
      });
  },
  "UnLike of transaction results in like/total Amount decrease": function(
    browser
  ) {
    let currentValue;
    let currentLikes;

    browser
      .getText("//p[@id = 'kudoAmount']", result => {
        currentValue = parseInt(result.value);
      })
      .getText("//span[@id = 'likeAmount'] ", result => {
        currentLikes = parseInt(result.value);
      })
      .click("//a[@id = 'likeTransaction'] ")
      .pause(500)
      .getText("//p[@id = 'kudoAmount']", result => {
        browser.assert.equal(result.value, currentValue - 1);
      })
      .getText("//span[@id = 'likeAmount'] ", result => {
        browser.assert.equal(result.value, currentLikes - 1);
      })
      .end();
  }
};
