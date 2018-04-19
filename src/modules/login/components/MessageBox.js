import { h, Component } from "preact";
import styles from "./MessageBox.scss";

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.checkError = this.checkError.bind(this);
    }

    checkError = () => {
        if (this.props.errorMessage != undefined) {
            switch (this.props.errorMessage.response.data.error) {
                case "invalid_grant":
                    return "No access";
                default:
                    return this.props.errorMessage.response.data.error;
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