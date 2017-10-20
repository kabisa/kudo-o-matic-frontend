Feature: Login feature

  Scenario: As a valid user I can log into my app
    When I see the login button "Login Using Google+"
    Then touch("cordovaWebView css:'button'")
    And /^I take a screenshot$/

