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

    componentWillMount() {
        if (this.props.team.id != undefined) {
            route("/", true);
        }
    }

    componentDidMount() {
        this.props.fetchAllTeams(this.props.user.apiToken);
    }

    render({ amountOfInvites, amountOfTeams, invites, teams, user, fetchAllTeams, replyToInvite, selectTeam }) {        
        return (
            <Page>
                <main class={styles.main}>
                    {/* When no teams or invites are available to show. */}
                    {amountOfInvites == 0 && amountOfTeams == 0 && <div className={styles.noTeams}>{I18n.t("teams.no_teams")}</div>}

                    {/* Shows the Invites when available */}
                    {amountOfInvites != 0 && <h2>{I18n.t("teams.invites")}</h2>}
                    <div>
                        {amountOfInvites != 0 && invites.map(invite => <Team user={user} selectTeam={selectTeam} replyToInvite={replyToInvite} isInvite={true} team={invite} />)}
                    </div>

                    {/* Shows the Teams when available */}
                    {amountOfTeams != 0 && <h2>{I18n.t("teams.part_of")}</h2>}
                    <div>
                        {amountOfTeams != 0 && teams.map(team => <Team selectTeam={selectTeam} isInvite={false} team={team} />)}
                    </div>
                </main>
            </Page>
        );
    }
};

const mapStateToProps = state => ({
    invites: state.teams.invites,
    teams: state.teams.teams,
    amountOfInvites: state.teams.amountOfInvites,
    amountOfTeams: state.teams.amountOfTeams,
    user: state.authentication.user,
    team: state.teams.team
});

const mapDispatchToProps = {
    fetchAllTeams,
    replyToInvite,
    selectTeam
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);