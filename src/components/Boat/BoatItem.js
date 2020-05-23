import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteBoat } from "../../actions/boatActions";

class BoatItem extends Component {
  onDeleteClick(id) {
    this.props.deleteBoat(id);
  }

  render() {
    const { boat } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">ID: {boat.id}</div>
        <div className="card-body bg-light">
          <h5 className="card-title">{boat.summary}</h5>
          <p className="card-text text-truncate ">
            {boat.acceptanceCriteria}
          </p>
          <Link
            to={`updateBoat/${boat.id}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(this, boat.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

BoatItem.propTypes = {
  deleteBoat: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBoat: deleteBoat }
)(BoatItem);
