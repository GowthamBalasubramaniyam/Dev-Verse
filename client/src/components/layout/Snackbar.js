import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dismissAlert } from "../../actions/alert";

const Snackbar = ({ alerts, dismissAlert }) => {
  const getIcon = (alertType) => {
    switch (alertType) {
      case "success":
        return "fas fa-check-circle";
      case "danger":
        return "fas fa-exclamation-triangle";
      case "warning":
        return "fas fa-exclamation-circle";
      case "info":
        return "fas fa-info-circle";
      default:
        return "fas fa-bell";
    }
  };

  return (
    <div className="snackbar-container">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`snackbar snackbar-${alert.alertType} snackbar-enter`}
        >
          <div className="snackbar-content">
            <div className="snackbar-icon">
              <i className={getIcon(alert.alertType)}></i>
            </div>
            <div className="snackbar-message">
              <span>{alert.msg}</span>
            </div>
            <button
              className="snackbar-close"
              onClick={() => dismissAlert(alert.id)}
              aria-label="Close notification"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="snackbar-progress">
            <div className="snackbar-progress-bar"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

Snackbar.propTypes = {
  alerts: PropTypes.array.isRequired,
  dismissAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { dismissAlert })(Snackbar);
