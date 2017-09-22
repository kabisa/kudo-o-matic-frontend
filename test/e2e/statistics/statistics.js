module.exports = {
  "Shows StatisticsPage": function(browser) {
    browser
      .url(browser.launch_url + "/#/statistics")
      .waitForElementVisible("div")
      .assert.title("kudo-o-matic")
      .assert.containsText("Header", "STATISTICS")
      .end();
  }
};
