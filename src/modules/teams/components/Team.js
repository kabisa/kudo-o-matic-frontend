import { h, Component } from "preact";
import styles from "./Team.scss";

export class Team extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    acceptInvite = () => {
        this.props.replyToInvite(this.props.user.apiToken, this.props.team.id, true)
    }

    declineInvite = () => {
        this.props.replyToInvite(this.props.user.apiToken, this.props.team.id, false)
    }

    render() {
        return (
            <div>
                <div className={styles.teamContainer}>
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
                    )}
                </div>
            </div>
        );
    }
};

export default Team;