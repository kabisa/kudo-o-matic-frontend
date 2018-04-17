import { h, Component} from "preact";
import styles from "./MessageBox.scss";

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.errorMessage = this.props.errorMessage;        
    }

    render() {
        if(this.errorMessage == "") {
            return "";
        } else {
            return <div className={styles.messageBox}>{this.errorMessage}</div>
        }
    }
}

export default MessageBox;