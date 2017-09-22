module.exports = {
  "Shows GoalPage": function(browser) {
    browser
      .url(browser.launch_url + "/#/goal")
      .waitForElementVisible("div")
      .assert.title("kudo-o-matic")
      .assert.containsText("Header", "GOAL")
      .end();
  }
};
