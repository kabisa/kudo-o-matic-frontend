import { h, render } from "preact";
import LoginForm from "src/modules/login/components/LoginForm";
import I18n from "src/config/i18n";
import { shallow } from "preact-render-spy";

describe("LoginForm", function() {
  let scratch, mount, fetchAccessToken;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
    fetchAccessToken = () => {};
  });

  it("Shows LoginForm", function() {
    const context = shallow(
      <LoginForm fetchAccessToken={fetchAccessToken}/>
    );
  });
});
