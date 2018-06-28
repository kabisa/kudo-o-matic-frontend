import { h } from "preact";
import I18n from "src/config/i18n";
import styles from "./Team.scss";

export const Team = ({team}) => {
    return (
        <div>
            <img className={styles.image} src={team.logo} />
            <h1 className={styles.name}>{team.name}</h1>
        </div>
    )
};