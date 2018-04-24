import { h, render } from "preact";
import { LoginPage } from "src/modules/login/containers/LoginPage";
import styles from "src/modules/login/containers/LoginPage.scss";
import {
  requestApiToken,
  handleGoogleLoginFailure
} from "src/modules/login/actions";

describe("LoginPage", function() {
  let scratch, mount, user;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
    user = { apiToken: "VALID_TOKEN" };
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("shows disclaimer", function() {
    mount(<LoginPage user={user} />);
    expect(scratch.querySelector("span")).to.have.text(
      "You can only login using a Google account from Kabisa"
    );
  });

  it("shows logo", function() {
    const page = mount(<LoginPage user={user} />);
    expect(page.outerHTML).to.contain(
      mount(<div class={styles.logo} />).outerHTML
    );
  });
});
