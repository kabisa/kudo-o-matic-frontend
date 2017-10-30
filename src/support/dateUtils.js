import I18n from "src/config/i18n";

export const timeSince = date => {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + I18n.t("feed.years_ago");
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + I18n.t("feed.months_ago");
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + I18n.t("feed.days_ago");
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + I18n.t("feed.hours_ago");
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + I18n.t("feed.minutes_ago");
  }
  return Math.floor(seconds) + I18n.t("feed.seconds_ago");
};
