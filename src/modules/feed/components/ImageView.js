import { h, Component } from "preact";
import { imageExists } from "src/support/imageUtils";

import styles from "./ImageView.scss";
import closeIcon from "src/assets/icons/close.svg";
import LoadingAnimation from "src/components/LoadingAnimation";

class imageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: true
    };
  }

  showLoadingImage = () => {
    setTimeout(this.loadImage(), 1000);
  };

  loadImage = () => {
    imageExists(this.props.imageURL, existsImage => {
      if (existsImage == true) {
        this.setState({ imageLoading: false });
      }
    });
  };

  render({ imageURL, closeImage }, { imageLoading }) {
    let image;
    if (imageLoading) {
      this.showLoadingImage();
      image = <LoadingAnimation />;
    } else {
      image = (
        <img
          class={styles.fullImage}
          src={imageURL}
          onError={() => this.showLoadingImage(this)}
        />
      );
    }

    return (
      <div class={styles.imageContainer}>
        <a class={styles.closeButton} onClick={() => closeImage()}>
          <img src={closeIcon} />
        </a>
        {image}
      </div>
    );
  }
}

export default imageView;
