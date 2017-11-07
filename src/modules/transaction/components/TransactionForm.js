import { h, Component } from "preact";
import styles from "./TransactionForm.scss";
import I18n from "src/config/i18n";
import Select from "react-select";

import kudoIcon from "src/assets/icons/kudo.svg";

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      amount: 0,
      receiver: "",
      activity: "",
      formSubmittable: false,
      formDisabled: false
    };
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.addPicture = this.addPicture.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ formDisabled: props.formError });
  }

  isFormSubmittable() {
    return (
      this.state.amount !== "" &&
      this.state.receiver !== "" &&
      this.state.activity !== ""
    );
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  onChange(e) {
    this.setState({ receiver: e.value });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.formSubmittable) {
      this.setState({ error: true });
    } else {
      this.setState({ formDisabled: true });
      this.props.addTransaction(
        this.state.amount,
        this.state.receiver,
        this.state.activity
      );
    }
  }

  openCamera() {
    navigator.camera.getPicture(
      this.addPicture,
      this.handleCameraError,
      setCameraOptions()
    );
  }

  addPicture(imageData) {
    let image = document.getElementById("picture");
    image.src = "data:image/jpeg;base64," + imageData;
  }

  handleCameraError(error) {
    console.log(error);
  }

  render(
    { formError, users },
    { error, amount, receiver, activity, formDisabled }
  ) {
    return (
      <div>
        <form class={styles.transactionForm} onSubmit={this.onSubmit}>
          {formError && (
            <div class={styles.formError}>
              {I18n.t("transaction.formError")}
            </div>
          )}
          {error && (
            <div class={styles.formError}>
              {I18n.t("transaction.transactionError")}
            </div>
          )}
          <fieldset disabled={formDisabled}>
            <label>
              {I18n.t("transaction.amount")}
              <input
                name="amount"
                type="number"
                min="1"
                max="999"
                className={styles.userSelection}
                value={amount}
                onInput={this.onInput}
              />
            </label>
            <label>
              {I18n.t("transaction.receiver")}

              <Select
                name="receiver"
                value={receiver}
                options={users.map(user => {
                  return { value: user.id, label: user.name };
                })}
                onChange={this.onChange}
              />
            </label>
            <label>
              {I18n.t("transaction.giving_kudos_for")}
              <textarea
                maxLength="90"
                name="activity"
                type="text"
                value={activity}
                onInput={this.onInput}
              />
            </label>
            <div onClick={this.openCamera}>Add a Picture</div>
            <button
              id="submitTransaction"
              class={styles.kudoButton}
              type="submit"
            >
              <img src={kudoIcon} />
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const setCameraOptions = () => {
  let options = {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true
  };
  return options;
};

export default TransactionForm;
