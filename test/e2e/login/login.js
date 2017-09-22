module.exports = {
  "Shows LoginPage": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("div")
      .assert.title("kudo-o-matic")
      .assert.containsText("button", "Login using Google+")
      .end();
  }
};
