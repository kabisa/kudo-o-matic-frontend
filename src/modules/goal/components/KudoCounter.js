import { h } from "preact";

const KudoCounter = ({ currentAmount, nextGoal }) => {
  return (
    <div>
      <span>{currentAmount}</span>
      <span>of</span>
      <span>{nextGoal.nextAmount}</span>
      <span>{nextGoal.nextName}</span>
    </div>
  );
};

export default KudoCounter;
