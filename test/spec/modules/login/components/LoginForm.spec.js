import { h, render } from "preact";
import LoginForm from "src/modules/login/components/LoginForm";
import MessageBox from "src/modules/login/components/MessageBox";
import I18n from "src/config/i18n";
import styles from "src/modules/login/components/LoginForm.scss";
import { shallow } from "preact-render-spy";

describe("LoginForm", function () {
  let scratch, mount, fetchAccessToken, saveErrorMessage, error;

  beforeEach(function () {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
    fetchAccessToken = () => { };
    saveErrorMessage = () => { };
    error = {};
  });

  it("shows MessageBox", function () {
    const context = mount(
      <LoginForm />
    );
    expect(context.outerHTML).to.contain(
      mount(<MessageBox />).outerHTML)
  });
});
