import React from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, current, description },
}) => (
  <div>
    <h3 className="text-dark">{school}</h3> {/* Changed class to className */}
    <p>
      {format(parseISO(from), "yyyy/MM/dd")} -{" "}
      {to ? format(parseISO(to), "yyyy/MM/dd") : "Now"}
    </p>
    <p>
      <strong>Degree: </strong>
      {degree}
    </p>
    <p>
      <strong>Field of Study: </strong>
      {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong>
      {description}
    </p>
  </div>
);


ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};


export default ProfileEducation;
