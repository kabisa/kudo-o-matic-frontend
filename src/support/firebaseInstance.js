import { route } from "preact-router";

export const getToken = () => {
  window.FirebasePlugin.getToken(function(token) {
    return token;
  });
};

export const checkPermission = () => {
  window.FirebasePlugin.hasPermission(function(data) {
    if (!data.isEnabled) {
      window.FirebasePlugin.grantPermission();
    }
  });
};

export const subscribeToNotifications = (fetchAllTransactions, user) => {
  checkPermission();

  window.FirebasePlugin.onNotificationOpen(notification => {
    window.FirebasePlugin.setBadgeNumber(0);

    switch (notification.event) {
      case "transaction":
        fetchAllTransactions(user.apiToken, 0);
        route("/feed", true);
        break;
      case "goal":
        route("/goal", true);
        break;
      case "reminder":
        route("/transaction", true);
        break;
      case "new_transaction":
        fetchAllTransactions(user.apiToken, 0);
        break;
    }
  });
};
