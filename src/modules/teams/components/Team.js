import { h, Component } from "preact";
import styles from "./Team.scss";
import { route } from "preact-router";

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
            this.props.selectTeam(this.props.team.id)
            route("/", true);
        }
    }

    render() {
        return (
            <div>
                <div className={styles.teamContainer} onClick={this.selectTeam}>
                    <div className={styles.imageContainer}>
                        <img src={this.props.team.logo} className={styles.image} />
                    </div>
                    <h1>{this.props.team.name}</h1>
                    {this.props.isInvite ? (
                        <div className={styles.inviteContainer}>
                            <div className={styles.inviteDecline} onClick={this.acceptInvite}>
                                Decline
                            </div>
                            <div className={styles.inviteAccept} onClick={this.declineInvite}>
                                Accept
                            </div>
                        </div>
                    ) : (
                            <div className={styles.inviteContainer}>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
};

export default Team;