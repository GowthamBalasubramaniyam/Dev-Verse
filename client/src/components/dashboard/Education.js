import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";

import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {format(parseISO(edu.from), "yyyy/MM/dd")} -{" "}
        {edu.to === null
          ? "Now"
          : // Replaced <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            format(parseISO(edu.to), "yyyy/MM/dd")}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th> {/* Changed from Company to School to match data */}
            <th className="hide-sm">Degree</th>{" "}
            {/* Changed from Title to Degree to match data */}
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
