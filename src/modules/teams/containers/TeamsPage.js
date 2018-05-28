import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Page } from "src/components/Page";
import { Team } from "../components/Team";

import styles from "./TeamsPage.scss";

import { fetchAllTeams, replyToInvite } from "../actions";

export class TeamsPage extends Component {

    constructor(props) {
        super(props);
        this.props.fetchAllTeams(this.props.user.apiToken);
    }

    render() {
        return (
            <Page>
                <main class={styles.main}>
                    {this.props.invites ? (
                        this.props.invites.map(invite => {
                            return (
                                <Team user={this.props.user} replyToInvite={this.props.replyToInvite} isInvite={true} team={invite} />
                            )
                        })
                    ) : (
                            <div></div>
                        )
                    }
                    {this.props.teams ? (
                        this.props.teams.map(team => {
                            return (
                                <Team isInvite={false} team={team} />
                            )
                        })
                    ) : (
                            <div></div>
                        )
                    }
                </main>
            </Page>
        );
    }
};

const mapStateToProps = state => ({
    invites: state.teams.invites,
    teams: state.teams.teams,
    user: state.authentication.user
});

const mapDispatchToProps = {
    fetchAllTeams,
    replyToInvite
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);