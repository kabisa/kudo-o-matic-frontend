module.exports = {
  "Shows TransactionForm": function(browser) {
    browser.url(browser.launch_url + "/#/transaction").expect.element("input")
      .to.be.present;
  },
  "Performs input validation amount": function(browser) {
    browser
      .url(browser.launch_url + "/#/transaction")
      .waitForElementVisible("form")
      .sendKeys("input[name=amount]", browser.Keys.ENTER);

    browser
      .waitForElementVisible("#error")
      .expect.element("#error")
      .text.to.contain(
        "Amount is not correct. You can't give negative ₭udo's or exceed over 1000."
      );

    browser.end();
  },
  "Performs input validation receiver": function(browser) {
    browser
      .url(browser.launch_url + "/#/transaction")
      .waitForElementVisible("form")
      .setValue("input[name=amount]", 3)
      .sendKeys("input[name=amount]", browser.Keys.ENTER);

    browser
      .waitForElementVisible("#error")
      .expect.element("#error")
      .text.to.contain("There's no receiver selected");

    browser.end();
  },
  "Performs input validation activity": function(browser) {
    browser
      .url(browser.launch_url + "/#/transaction")
      .waitForElementVisible("form")
      .setValue("input[name=amount]", 3)
      .setValue("input[name=receiver]", "Test User 2")
      .waitForElementVisible("#userSuggestions")
      .pause(500)
      .click("#userSuggestions div:nth-child(1)")
      .sendKeys("input[name=amount]", browser.Keys.ENTER);

    browser
      .waitForElementVisible("#error")
      .expect.element("#error")
      .text.to.contain("Activity is too short (minimum is 4 characters)");

    browser.end();
  },
  "Performs input validation activity short": function(browser) {
    browser
      .url(browser.launch_url + "/#/transaction")
      .waitForElementVisible("form")
      .setValue("input[name=amount]", 3)
      .setValue("input[name=receiver]", "Test User 2")
      .waitForElementVisible("#userSuggestions")
      .pause(500)
      .click("#userSuggestions div:nth-child(1)")
      .setValue("textarea[name=activity]", "hi")
      .sendKeys("input[name=amount]", browser.Keys.ENTER);

    browser
      .waitForElementVisible("#error")
      .expect.element("#error")
      .text.to.contain("Activity is too short (minimum is 4 characters)");

    browser.end();
  }
};
