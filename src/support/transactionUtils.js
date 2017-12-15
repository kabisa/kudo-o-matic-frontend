import KabisaLizard from "src/assets/icons/transaction/kabisa_lizard.png";

export const checkForGroup = transaction => {
  if (transaction.receiver == undefined) {
    let group = transaction.activity.substr(
      0,
      transaction.activity.indexOf("for:")
    );

    if (group.length > 1) {
      transaction.receiver = {
        name: group,
        "avatar-url": KabisaLizard
      };
      transaction.activity = transaction.activity.substr(
        transaction.activity.indexOf("for:") + 4
      );
    } else transaction.receiver = transaction.sender;
  }

  return transaction;
};
