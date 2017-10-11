import { h, render } from "preact";
import GoogleButton from "src/modules/login/components/GoogleButton";
import I18n from "src/config/i18n";

describe("GoogleButton", function() {
  let scratch, mount;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
  });

  it("shows GoogleLogin Button", function() {
    mount(<GoogleButton />);
    expect(scratch.querySelector("button")).to.have.text(
      I18n.t("login.login_using_google")
    );
  });
});
