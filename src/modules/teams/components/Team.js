import { h, Component } from "preact";
import styles from "./Team.scss";
import { route } from "preact-router";
import I18n from "src/config/i18n";

export class Team extends Component {
    constructor(props) {
        super(props);
    }

    acceptInvite = () => {
        this.props.replyToInvite(this.props.user.apiToken, this.props.team.id, true)
    }

    declineInvite = () => {
        this.props.replyToInvite(this.props.user.apiToken, this.props.team.id, false)
    }

    selectTeam = () => {
        if (!this.props.isInvite) {
            this.props.selectTeam(this.props.team)
            route("/", true);
        }
    }

    render() {
        return (
            <div>
                <div className={styles.teamContainer} onClick={this.selectTeam}>
                    {this.props.team.logo ? (
                        <div className={styles.imageContainer}>
                            <img src={this.props.team.logo} className={styles.image} />
                        </div>
                    ) : (
                            <div></div>
                        )
                    }
                    <h1>{this.props.team.name}</h1>
                    {this.props.isInvite ? (
                        <div className={styles.inviteContainer}>
                        <div className={styles.inviteAccept} onClick={this.declineInvite}>
                                {I18n.t("teams.accept")}
                            </div>
                            <div className={styles.inviteDecline} onClick={this.acceptInvite}>
                                {I18n.t("teams.decline")}
                            </div>                            
                        </div>
                    ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
        );
    }
};

export default Team;