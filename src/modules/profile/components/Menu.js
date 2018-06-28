import { h, Component } from "preact";
import I18n from "src/config/i18n";
import styles from "./Menu.scss";
import { route } from "preact-router";
import gearIcon from "src/assets/icons/gear.svg";

export class Menu extends Component {

    logout = () => {
        this.props.handleLogoutUser();
        this.toggleMenu();
        route("/login", true);
    }

    changeTeam = () => {
        this.props.handleChangeTeam();
        this.toggleMenu();
        route("/teams", true);
    }

    toggleMenu = () => {
        this.props.handleToggleMenu(this.props.showMenu);
    }

    render() {
        return (
            <div>
                <img className={this.props.showMenu ? styles.gearIconTurned : styles.gearIcon} src={gearIcon} onClick={this.toggleMenu} />
                <div className={this.props.showMenu ? styles.menuContainerShow : styles.menuContainer}>
                    <div className={styles.menuItem} onClick={this.changeTeam}>
                        {I18n.t("profile.change_team")}
                    </div>
                    <div className={styles.menuItem} onClick={this.logout}>
                        {I18n.t("profile.logout")}
                    </div>
                </div>
            </div>
        );
    };
};