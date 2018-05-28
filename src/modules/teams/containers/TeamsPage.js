import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Page } from "src/components/Page";
import { Team } from "../components/Team";

import styles from "./TeamsPage.scss";

export class TeamsPage extends Component {

    constructor(props) {
        super(props);
        props.teams = [{
            name: "Kabisa",
            imgSource: "https://i.vimeocdn.com/portrait/7982488_300x300"
        }, {
            name: "Philips",
            imgSource: "https://i.vimeocdn.com/portrait/7982488_300x300"
        }]
    }
    

    render() {
        return (
            <Page>
                <main class={styles.main}>
                    {this.props.teams.map(team => {
                        return (
                            <Team team={team} />
                        )
                    })}
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