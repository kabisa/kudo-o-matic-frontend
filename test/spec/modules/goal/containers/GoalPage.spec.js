import { h, render } from "preact";
import { GoalPage } from "src/modules/goal/containers/GoalPage";
import KudoCounter from "src/modules/goal/components/KudoCounter";

describe("GoalPage", function() {
  let scratch, mount, fetchData, user;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
    fetchData = () => {};
    user = { apiToken: "API_TOKEN" };
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("shows KudoCounter", function() {
    const page = mount(<GoalPage fetchData={fetchData} user={user} />);
    expect(page.outerHTML).to.contain(mount(<KudoCounter />).outerHTML);
  });
});
