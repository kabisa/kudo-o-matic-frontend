module.exports = {
  "Shows GoalPage": function(browser) {
    browser
      .url(browser.launch_url + "/#/goal")
      .waitForElementVisible("div")
      .assert.title("kudo-o-matic")
      .assert.containsText("header", "GOAL");
  },

  "Like of transaction results in currentAmount increase": function(browser) {
    let currentAmount;
    browser
      .useXpath()
      .pause(1600)
      .getText("//span[@id = 'currentAmount'] ", result => {
        currentAmount = parseInt(result.value);
      })
      .click("//div[@id = 'feed']")

      .waitForElementVisible(
        "//div[contains(@class, 'Transaction__transaction')]"
      )
      .click("//a[@id = 'likeTransaction'] ")
      .click("//div[@id = 'goal'] ")
      .pause(1600)
      .getText("//span[@id = 'currentAmount'] ", result => {
        browser.assert.equal(result.value, currentAmount + 1);
      });
  },
  "UnLike of transaction results in currentAmount decrease": function(browser) {
    let currentAmount;
    browser
      .pause(1600)
      .getText("//span[@id = 'currentAmount'] ", result => {
        currentAmount = parseInt(result.value);
      })
      .click("//div[@id = 'feed']")

      .waitForElementVisible(
        "//div[contains(@class, 'Transaction__transaction')]"
      )
      .click("//a[@id = 'likeTransaction'] ")
      .click("//div[@id = 'goal'] ")
      .pause(1600)
      .getText("//span[@id = 'currentAmount'] ", result => {
        browser.assert.equal(result.value, currentAmount - 1);
      })
      .end();
  }
};
