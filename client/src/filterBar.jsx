import React from 'react';

var FilterBar = (props) => (
      <form data-name="Email Form" id="email-form" name="email-form">
        <select className="w-select" id="field" name="field" onChange={props.handleChange}>
          <option value="">Select a location to view trainers</option>
          <option value="San Francisco">San Francisco</option>
          <option value="San Mateo">San Mateo</option>
          <option value="Pleasanton">Pleasanton</option>
        </select>
      </form>
);

export default FilterBar;