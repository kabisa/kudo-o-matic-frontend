import { h } from "preact";
import { Page } from "src/components/Page";
import { Header } from "src/components/Header";
import I18n from "src/config/i18n";

const ProfilePage = ({ user }) => {
  return (
    <Page>
      <Header>
        <h1>{I18n.t("profile.title")}</h1>
      </Header>
      <main>
        <span>{user.name}</span>
      </main>
    </Page>
  );
};

export default ProfilePage;
