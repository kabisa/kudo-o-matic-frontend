import { h } from "preact";

const KudoCounter = ({ currentAmount, nextAmount, nextText }) => {
  return (
    <div>
      <p>
        {currentAmount} ₭ of {nextAmount} ₭ for {nextText}
      </p>
    </div>
  );
};

export default KudoCounter;
