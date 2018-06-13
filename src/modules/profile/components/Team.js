import { h, Component } from "preact";
import I18n from "src/config/i18n";
import styles from "./Team.scss";

export class Team extends Component {

    render() {
        return (
            <div>
                <img className={styles.image} src={this.props.team.logo} />
                <h1 className={styles.name}>{this.props.team.name}</h1>
            </div>
        );
    };
};