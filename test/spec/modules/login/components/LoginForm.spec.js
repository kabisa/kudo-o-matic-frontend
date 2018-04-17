import { h, render } from "preact";
import LoginForm from "src/modules/login/components/LoginForm";
import I18n from "src/config/i18n";

describe("LoginForm", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  it("Shows LoginForm", function() {
    mount(<LoginForm />);
    expect(scratch.querySelector("button")).to.have.text(
      I18n.t("login.login")
    );
  });
});
