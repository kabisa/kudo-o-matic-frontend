module.exports = {
  "Shows TransactionForm": function(browser) {
    browser
      .url(browser.launch_url + "/#/goal")
      .waitForElementVisible("div")
      .click("#openTransaction")
      .expect.element("input").to.be.present;
  },
  "Performs input validation amount": function(browser) {
    browser
      .url(browser.launch_url + "#/goal")
      .waitForElementVisible("div")
      .click("#openTransaction")
      .waitForElementVisible("form")
      .setValue("input[name=amount]", 3)
      .click("#submitTransaction");

    browser.expect
      .element("form")
      .text.to.contain("There's no receiver selected");

    browser.end();
  },
  "Performs input validation receiver": function(browser) {
    browser
      .url(browser.launch_url + "#/goal")
      .waitForElementVisible("div")
      .click("#openTransaction")
      .waitForElementVisible("form")
      .click("#submitTransaction");

    browser.expect
      .element("form")
      .text.to.contain("There's no receiver selected");

    browser.end();
  },
  "Performs input validation activity": function(browser) {
    browser
      .url(browser.launch_url + "#/goal")
      .waitForElementVisible("div")
      .click("#openTransaction")
      .waitForElementVisible("form")
      .setValue("input[name=amount]", 3)
      .click("#submitTransaction");

    browser.expect
      .element("form")
      .text.to.contain("There's no receiver selected");

    browser.end();
  },

  "Adds transaction and closes form": function(browser) {
    const random = Math.floor(Math.random() * 100 + 1);
    browser
      .url(browser.launch_url + "#/goal")
      .waitForElementVisible("div")
      .click("#openTransaction")
      .waitForElementVisible("form")
      .setValue("input[name=amount]", 3)
      .setValue("textarea[name=activity]", "Test " + random)
      .click("#submitTransaction")
      .waitForElementVisible("nav")
      .click("#feed")
      .getText("#transactionList li:nth-child(1) #activity", result => {
        browser.assert.equal(result.value, "Test " + random);
      })
      .getText("#transactionList li:nth-child(1) #receiver", result => {
        browser.assert.equal(result.value, "Test User 2");
      })
      .getText("#transactionList li:nth-child(1) #kudoAmount", result => {
        browser.assert.equal(result.value, 3);
      })
      .end();
  }
};
