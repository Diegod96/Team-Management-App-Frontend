import React, { Component } from "react";
import { Link } from "react-router-dom";
import BoatItem from "./Boat/BoatItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../actions/boatActions";

class BoatBoard extends Component {
  componentDidMount() {
    this.props.getBacklog();
  }
  render() {
    const { boats } = this.props.boats;

    let BoardContent;
    let lowPriority = [];
    let mediumPriority = [];
    let highestPriority = [];

    const BoardAlgorithm = boats => {
      if (boats.length < 1) {
        return (
            <div className="alert alert-info text-center" role="alert">
              No Boats on the Board
            </div>
        );
      } else {
        const tasks = boats.map(boat => (
            <BoatItem key={boat.id} boat={boat} />
        ));

        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].props.boat.status === "Low") {
            lowPriority.push(tasks[i]);
          }

          if (tasks[i].props.boat.status === "Medium") {
            mediumPriority.push(tasks[i]);
          }

          if (tasks[i].props.boat.status === "High") {
            highestPriority.push(tasks[i]);
          }
        }

        return (
            <React.Fragment>
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card text-center mb-2">
                      <div className="card-header bg-secondary text-white">
                        <h3>Low Priority</h3>
                      </div>
                    </div>

                    {lowPriority}
                  </div>
                  <div className="col-md-4">
                    <div className="card text-center mb-2">
                      <div className="card-header bg-primary text-white">
                        <h3>Medium Priority</h3>
                      </div>
                    </div>

                    {mediumPriority}
                  </div>
                  <div className="col-md-4">
                    <div className="card text-center mb-2">
                      <div className="card-header bg-success text-white">
                        <h3>Highest Priority</h3>
                      </div>
                    </div>

                    {highestPriority}
                  </div>
                </div>
              </div>
            </React.Fragment>
        );
      }
    };

    BoardContent = BoardAlgorithm(boats);

    return (
        <div className="container">
          <Link to="/addBoat" className="btn btn-primary mb-3">
            <i className="fas fa-plus-circle"> Create Boat</i>
          </Link>
          <br />
          <hr />
          {BoardContent}
        </div>
    );
  }
}

BoatBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  boats: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  boats: state.boat
});

export default connect(
    mapStateToProps,
    { getBacklog }
)(BoatBoard);
