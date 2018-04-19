import { h, Component } from "preact";
import styles from "./MessageBox.scss";

class MessageBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.errorMessage && 
                    <div className={styles.messageBox}> 
                        {this.props.errorMessage.response.data.error}
                    </div>
                }
            </div>
        )
    }
}

export default MessageBox;