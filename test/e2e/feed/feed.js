module.exports = {
  "Shows FeedPage": function(browser) {
    browser
      .url(browser.launch_url + "/#/feed")
      .waitForElementVisible("div")
      .assert.title("kudo-o-matic")
      .assert.containsText("header", "FEED")
      .end();
  }
};
