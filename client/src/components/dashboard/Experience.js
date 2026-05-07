import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  // Add safety check - if experience is undefined or not an array, use empty array
  const experiences = (experience || []).map((exp) => (
  <tr key={exp.id}>
    <td>{exp.company}</td>
    <td className="hide-sm">{exp.title}</td>
    <td>
      {/* Check if fromDate is truthy (not null, not undefined) */}
      {exp.from ? format(parseISO(exp.from), "yyyy/MM/dd") : "N/A"} -{" "}
      
      {/* Check for 'current' checkbox or if toDate exists */}
      {exp.current ? (
        "Now"
      ) : exp.to ? (
        format(parseISO(exp.to), "yyyy/MM/dd")
      ) : (
        "N/A"
      )}
    </td>
    <td>
      <button
        onClick={() => deleteExperience(exp.id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </td>
  </tr>
));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      {experience && experience.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      ) : (
        <p>No experience credentials added yet</p>
      )}
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
