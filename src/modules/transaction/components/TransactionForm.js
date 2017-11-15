import { h, Component } from "preact";
import { connect } from "preact-redux";
import styles from "./TransactionForm.scss";
import I18n from "src/config/i18n";

import { searchUser } from "src/modules/transaction/actions";
import Suggestions from "./UserSuggestions";
import SelectedUser from "./SelectedUser";
import SelectedImage from "./SelectedImage";

import kudoIcon from "src/assets/icons/kudo.svg";
import photoIcon from "src/assets/icons/photo-camera.svg";

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      amount: "",
      receiver: { name: "", id: "" },
      activity: "",
      imageData: "",
      formSubmittable: false,
      formDisabled: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ formDisabled: props.formError });
  }

  isFormSubmittable() {
    return (
      this.state.amount !== "" &&
      this.state.receiver.id !== "" &&
      this.state.activity !== ""
    );
  }

  searchUsers = e => {
    let searchQuery = e.target.value;
    this.setState({ receiver: { name: searchQuery, id: "" } });
    this.props.searchUser(searchQuery, this.props.users);
    return false;
  };

  onInput = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  };

  onSelect = user => {
    this.setState({ receiver: user.user });
    this.props.searchUser("", []);
    this.setState({ formSubmittable: this.isFormSubmittable() });
  };

  clearSelection = () => {
    this.setState({ receiver: { name: "", id: "" } });
    this.setState({ formSubmittable: this.isFormSubmittable() });
  };

  clearImage = () => {
    this.setState({ imageData: "" });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.formSubmittable) {
      this.setState({ error: I18n.t("transaction.transactionError") });
    } else {
      this.setState({ formDisabled: true });
      this.props.addTransaction(
        this.state.amount,
        this.state.receiver.id,
        this.state.activity,
        this.state.imageData,
        "jpg"
      );
    }
  };

  openCamera = index => {
    let options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    };
    if (index == 1) {
      options = { ...options, sourceType: Camera.PictureSourceType.CAMERA };
    }
    navigator.camera.getPicture(
      this.addPicture,
      this.handleCameraError,
      options
    );
  };

  showCameraOptions = () => {
    const options = {
      title: I18n.t("transaction.photoLocation"),
      buttonLabels: [
        I18n.t("transaction.camera"),
        I18n.t("transaction.photoLibrary")
      ],
      androidEnableCancelButton: true,
      androidTheme:
        window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      addCancelButtonWithLabel: I18n.t("transaction.cancel")
    };

    window.plugins.actionsheet.show(options, this.openCamera);
  };

  addPicture = imageData => {
    this.setState({ imageData: imageData });
  };

  handleCameraError = () => {
    this.setState({ error: I18n.t("transaction.cameraError") });
  };

  render(
    { formError, filteredUsers },
    { error, amount, receiver, activity, imageData, formDisabled }
  ) {
    return (
      <div>
        <form class={styles.transactionForm} onSubmit={this.onSubmit}>
          {formError && (
            <div class={styles.formError}>
              {I18n.t("transaction.formError")}
            </div>
          )}
          {error !== "" && <div class={styles.formError}>{error}</div>}
          <fieldset disabled={formDisabled}>
            <label>
              {I18n.t("transaction.amount")}
              <div class={styles.amountInput}>
                <input
                  name="amount"
                  type="number"
                  min="1"
                  max="999"
                  className={styles.userSelection}
                  value={amount}
                  onInput={this.onInput}
                  autoFocus={true}
                  class={styles.amountInput}
                />
                <span class={styles.kudoCurrency}>₭</span>
              </div>
            </label>
            <label>
              {I18n.t("transaction.receiver")}

              {receiver.id !== "" ? (
                <SelectedUser
                  user={receiver}
                  clearSelection={this.clearSelection}
                />
              ) : (
                <div>
                  <input
                    value={receiver.name}
                    onInput={this.searchUsers}
                    placeholder="Search for users"
                  />
                  <Suggestions
                    searchQuery={receiver.name}
                    users={filteredUsers}
                    onSelect={this.onSelect}
                  />
                </div>
              )}
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

            {imageData !== "" ? (
              <SelectedImage
                imageData={imageData}
                clearImage={this.clearImage}
              />
            ) : (
              <div class={styles.imageButton} onClick={this.showCameraOptions}>
                <img id="picture" src={photoIcon} />
                <p>Add a picture</p>
              </div>
            )}
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

const mapStateToProps = state => ({
  filteredUsers: state.transaction.filteredUsers,
  users: state.transaction.users
});

const mapDispatchToProps = {
  searchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
