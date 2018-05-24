import { h, Component } from "preact";
import styles from "./Team.scss";

var imgSource = "https://i.vimeocdn.com/portrait/7982488_300x300";
export class Team extends Component {

    render() {
        return (
            <div>
                <div className={styles.teamContainer}>
                    <div className={styles.imageContainer}>
                        <img src={imgSource} className={styles.image} />
                    </div>
                    <h1>Kabisa</h1>
                </div>
            </div>
        );
    }
};

export default Team;