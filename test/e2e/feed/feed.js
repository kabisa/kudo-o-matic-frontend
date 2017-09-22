module.exports = {
  "Shows FeedPage": function(browser) {
    browser
      .url(browser.launch_url + "/#/feed")
      .waitForElementVisible("div")
      .assert.title("kudo-o-matic")
      .assert.containsText("Header", "FEED")
      .end();
  }
};
