import { h, render } from "preact";
import { LoginPage } from "src/modules/login/containers/LoginPage";
import { LoginForm } from "src/modules/login/components/LoginForm";
import styles from "src/modules/login/containers/LoginPage.scss";

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

  it("shows Loginform", function() {
    const page = mount(<LoginPage user={user} />);
    expect(page.outerHTML).to.contain(mount(<LoginForm />).outerHTML);
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
