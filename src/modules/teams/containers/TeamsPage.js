import { h, Component } from "preact";
import { connect } from "preact-redux";
import { Page } from "src/components/Page";
import { Team } from "../components/Team";

import styles from "./TeamsPage.scss";

import { fetchAllTeams, replyToInvite, selectTeam } from "../actions";
import { loadTeams } from "../../../localStorage";

import { route } from "preact-router";
import I18n from "src/config/i18n";

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
        // this.props.invites = undefined;
        // this.props.teams = undefined;
        // this.props.invites = this.props.teams;
        return (
            <Page>
                <main class={styles.main}>
                    {!this.props.invites && !this.props.teams ? (
                        <div className={styles.noTeams}>{I18n.t("teams.no_teams")}</div>
                    ) : (
                        <div></div>
                    )
                        
                    }
                    {this.props.invites ? (
                        <h2>{I18n.t("teams.invites")}</h2>
                    ) : (
                            <div></div>
                        )
                    }
                    <div>
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
                    </div>
                    {this.props.teams ? (
                        <h2>{I18n.t("teams.part_of")}</h2>
                    ) : (
                            <div></div>
                        )
                    }
                    <div>
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
                    </div>
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