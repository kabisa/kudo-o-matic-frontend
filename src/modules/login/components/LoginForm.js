import { h, Component } from "preact";
import styles from "./LoginForm.scss";
import I18n from "src/config/i18n";
import { fetchAccessToken } from "../actions";
import MessageBox from "./MessageBox";

import { connect } from "preact-redux";

export class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            formSubmittable: false,
            formDisabled: false
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    onInput = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ formSubmittable: this.isFormSubmittable() });
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.formSubmittable) {
            this.props.fetchAccessToken(this.state.username, this.state.password);
        }
    }

    isFormSubmittable = () => {
        return (
            this.state.username !== "" &&
            this.state.password !== ""
        );
    };

    render({ username, password }) {
        return (
            <div>
                <MessageBox errorMessage={this.props.error} />
                <form onSubmit={this.onSubmit}>
                    <input
                        name="username"
                        id="inputUsername"
                        onInput={this.onInput}
                        type='text'
                        placeholder={I18n.t("login.username")}
                        className={styles.loginInput}
                    />
                    <br />
                    <input
                        name="password"
                        id="inputPassword"
                        onInput={this.onInput}
                        type='password'
                        placeholder={I18n.t("login.password")}
                        className={styles.loginInput}
                    />
                    <br />
                    <button type="submit" className={styles.loginButton}>
                        {I18n.t("login.login")}
                    </button>
                </form>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    user: state.authentication.user,
    error: state.authentication.error
});

const mapDispatchToProps = {
    fetchAccessToken
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);