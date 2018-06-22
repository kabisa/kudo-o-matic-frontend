import { h, Component } from "preact";
import { connect } from "preact-redux";
import styles from "./TransactionForm.scss";
import I18n from "src/config/i18n";

import LoadingScreen from "../components/loadingScreen";
import { searchUser } from "src/modules/transaction/actions";
import Suggestions from "./UserSuggestions";
import SelectedUser from "./SelectedUser";
import SelectedImage from "./SelectedImage";

import kudoIcon from "src/assets/icons/kudo.svg";
import photoIcon from "src/assets/icons/photo-camera.svg";
import KabisaLizard from "src/assets/icons/transaction/kabisa_lizard.png";

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

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ formDisabled: props.formError });
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById("inputAmount").focus();
    }, 300);
  }

  isFormSubmittable() {
    return (
      this.checkAmount(this.state.amount) !== false &&
      this.state.receiver.id !== "" &&
      this.checkActivity(this.state.activity) !== false
    );
  }

  checkAmount(amount) {
    if (amount > 9999 || amount < 1) {
      return false;
    }
    return true;
  }

  checkActivity(activity) {
    if (activity.length < 4 || activity.length > 140) {
      return false;
    }
    return true;
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

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.formSubmittable) {
      if (!this.checkActivity(this.state.activity)) {
        this.setState({ error: I18n.t("transaction.notEnoughCharacters") });
      }
      if (this.state.receiver.name === "") {
        this.setState({ error: I18n.t("transaction.noReceiver") });
      }
      if (!this.checkAmount(this.state.amount)) {
        this.setState({ error: I18n.t("transaction.amountNotCorrect") });
      }
    } else {
      this.setState({ formDisabled: true });
      this.props.addTransaction(
        this.state.amount,
        this.state.receiver.name,
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

  render({ formError, filteredUsers, loading },
    { error, amount, receiver, activity, imageData, formDisabled }) {
    if (loading) {
      return (
        <LoadingScreen />
      )
    } else {
      filteredUsers.push({ user: { name: receiver.name, id: 1, "avatar-url": KabisaLizard } });

      return (
        <div>
          <form class={styles.transactionForm} onSubmit={this.onSubmit}>
            {formError && (
              <div class={styles.formError} id="error">
                {I18n.t("transaction.formError")}
              </div>
            )}
            {error !== "" && <div class={styles.formError} id="error">{error}</div>}
            <fieldset disabled={formDisabled}>
              <div class={styles.amountInput}>
                <input
                  name="amount"
                  type="number"
                  id="inputAmount"
                  min="1"
                  max="999"
                  className={styles.userSelection}
                  value={amount}
                  onInput={this.onInput}
                  class={styles.amountInput}
                />
                <span class={styles.kudoCurrency}>₭</span>
              </div>

              {receiver.id !== "" ? (
                <SelectedUser
                  user={receiver}
                  clearSelection={this.clearSelection}
                />
              ) : (
                  <div>
                    <input
                      name="receiver"
                      value={receiver.name}
                      onInput={this.searchUsers}
                      placeholder="Search for users"
                      className={styles.selectReceiver}
                    />
                    <Suggestions
                      searchQuery={receiver.name}
                      users={filteredUsers}
                      onSelect={this.onSelect}
                    />
                  </div>
                )}
              <textarea
                maxLength="140"
                name="activity"
                type="text"
                value={activity}
                onInput={this.onInput}
              />
              <p class={styles.characterCount}>{activity.length} / 140</p>
              <div className={styles.buttonContainer}>
                {imageData !== "" ? (
                  <SelectedImage
                    imageData={imageData}
                    clearImage={this.clearImage}
                  />
                ) : (
                    <div class={styles.imageButton} onClick={this.showCameraOptions}>
                      <p>{I18n.t("transaction.add_picture")}</p>
                    </div>
                  )}
                <button
                  id="submitTransaction"
                  class={styles.kudoButton}
                  type="submit"
                >
                  <p>{I18n.t("transaction.give_kudos")}</p>
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  filteredUsers: state.transaction.filteredUsers,
  users: state.transaction.users,
  loading: state.transaction.addingTransaction
});

const mapDispatchToProps = {
  searchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
