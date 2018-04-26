module.exports = {
  "Show Navigation bar": function (browser) {
    browser
      .url(browser.launch_url + "/#/feed")
      .waitForElementVisible("Header")
      .assert.elementPresent("nav")
  },
  "Navigates to GoalPage": function (browser) {
    browser.click("#goal").assert.containsText("header", "GOAL");
  },
  "Navigates to ProfilePage": function (browser) {
    browser.click("#profile").assert.containsText("header", "PROFILE");
  },
  "Navigates to StatisticsPage": function (browser) {
    browser
      .click("#statistics")
      .assert.containsText("header", "STATISTICS")
      .end();
  }
};
