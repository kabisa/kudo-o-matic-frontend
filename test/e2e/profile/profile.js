module.exports = {
  "Shows ProfilePage": function(browser) {
    browser
      .url(browser.launch_url + "/#/profile")
      .waitForElementVisible("div")
      .assert.title("kudo-o-matic")
      .assert.containsText("Header", "PROFILE")
      .end();
  }
};
