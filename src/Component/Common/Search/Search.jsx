import React from 'react';

const Search = ({searchFilter}) => {
  return <div className="input-group mb-3">
    <input onChange={searchFilter} type="text" className="form-control" placeholder="Product's name" name='pname' aria-label="Product's name" aria-describedby="basic-addon2" />
    <span className="input-group-text btn btn-secondary" id="basic-addon2">search</span>
  </div>
};

export default Search;