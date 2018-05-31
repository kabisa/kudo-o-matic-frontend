import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Page } from "src/components/Page";
import { Team } from "../components/Team";

import styles from "./TeamsPage.scss";

import { fetchAllTeams, replyToInvite, selectTeam } from "../actions";
import { loadTeams } from "../../../localStorage";

import { route } from "preact-router";

export class TeamsPage extends Component {

    constructor(props) {
        super(props);
        this.props.fetchAllTeams(this.props.user.apiToken);
    }

    componentWillMount() {        
        if (this.props.teamId != undefined) {
            route("/", true);
        }
    }

    render() {
        return (
            <Page>
                <main class={styles.main}>
                    {this.props.invites ? (
                        this.props.invites.map(invite => {
                            return (
                                <Team user={this.props.user} selectTeam={this.props.selectTeam} replyToInvite={this.props.replyToInvite} isInvite={true} team={invite} />
                            )
                        })
                    ) : (
                            <div></div>
                        )
                    }
                    {this.props.teams ? (
                        this.props.teams.map(team => {
                            return (
                                <Team selectTeam={this.props.selectTeam} isInvite={false} team={team} />
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
    user: state.authentication.user,
    teamId: state.teams.teamId
});

const mapDispatchToProps = {
    fetchAllTeams,
    replyToInvite,
    selectTeam
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);