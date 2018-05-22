import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Page } from "src/components/Page";

import styles from "./TeamsPage.scss";

export class TeamsPage extends Component {
    render() {
        return (
            <Page>
                <main class={styles.main}>
                </main>
            </Page>
        );
    }
};

const mapStateToProps = state => ({
  });
  
  const mapDispatchToProps = {
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);