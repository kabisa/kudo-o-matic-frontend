import { h, render } from "preact";
import { GoalPage } from "src/modules/goal/containers/GoalPage";
import KudoCounter from "src/modules/goal/components/KudoCounter";

describe("GoalPage", function() {
  let scratch, mount, fetchData, user, team;

  beforeEach(function() {
    scratch = document.createElement("div");
    mount = jsx => render(jsx, scratch);
    fetchData = () => {};
    user = { apiToken: "API_TOKEN" };
    team = { id: 1, name: "NAME"};
  });

  afterEach(function() {
    scratch.innerHtml = "";
  });

  it("shows KudoCounter", function() {
    const page = mount(<GoalPage fetchData={fetchData} user={user} team={team} />);
    expect(page.outerHTML).to.contain(mount(<KudoCounter />).outerHTML);
  });
});
