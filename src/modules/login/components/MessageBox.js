import { h, Component } from "preact";
import styles from "./MessageBox.scss";

class MessageBox extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.checkError = this.checkError.bind(this);
    }

    checkError = () => {
        if (this.props.errorMessage != undefined) {
            switch (this.props.errorMessage) {
                case "invalid_grant":
                    return "No access";
                case "missing_parameters":
                    return "Username/password missing";
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