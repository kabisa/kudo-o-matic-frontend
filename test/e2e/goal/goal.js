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
      .pause(1600)
      .getText("#kudoCounter #currentAmount ", result => {
        currentAmount = parseInt(result.value);
      })
      .click("#feed")
      .waitForElementVisible("#transaction")
      .click("#transactionList li:nth-child(1) #likeTransaction")
      .click("#goal")
      .pause(1600)
      .getText("#kudoCounter #currentAmount ", result => {
        browser.assert.equal(result.value, currentAmount + 1);
      });
  },
  "UnLike of transaction results in currentAmount decrease": function(browser) {
    let currentAmount;
    browser
      .pause(1600)
      .getText("#kudoCounter #currentAmount ", result => {
        currentAmount = parseInt(result.value);
      })
      .click("#feed")
      .waitForElementVisible("#transaction")
      .click("#transactionList li:nth-child(1) #likeTransaction")
      .click("#goal")
      .pause(1600)
      .getText("#kudoCounter #currentAmount ", result => {
        browser.assert.equal(result.value, currentAmount - 1);
      })
      .end();
  }
};
