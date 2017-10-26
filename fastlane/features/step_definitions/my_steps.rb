When(/I am on the login screen/) do
  wait_for(:timeout => 5) { query("SystemWebView css:'button'") }
end

