import { h, Component } from "preact";
import styles from "./MessageBox.scss";
import I18n from "src/config/i18n";

class MessageBox extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.checkError = this.checkError.bind(this);
    }

    checkError = () => {
        if (this.props.errorMessage != null || this.props.errorMessage != undefined) {
            switch (this.props.errorMessage) {
                case "invalid_grant":
                return I18n.t("messagebox.no_access");
                case "missing_parameters":
                I18n.t("messagebox.missing_parameters");
                default:
                    return this.props.errorMessage;
            }
        } else {
            return "";
        }

    }

    render() {
        return (
            <div>
                {this.checkError() != "" &&
                    <div className={styles.messageBox}>
                        {this.checkError()}
                    </div>}
            </div>
        );
    }
}

export default MessageBox;