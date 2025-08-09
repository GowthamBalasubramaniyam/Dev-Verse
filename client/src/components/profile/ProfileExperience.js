import React from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";

const ProfileExperience = ({
  experience: { company, title, location, from, to, current, description },
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>{" "}
    <p>
      {format(parseISO(from), "yyyy/MM/dd")} -{" "}
      {to ? format(parseISO(to), "yyyy/MM/dd") : "Now"}
    </p>
    <p>
      <strong>Position: </strong>
      {title}
    </p>
    <p>
      <strong>Description: </strong>
      {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
