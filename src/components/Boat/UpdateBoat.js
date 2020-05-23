import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  getBoat,
  addBoat
} from "../../actions/boatActions";

class UpdateBoat extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const { id, summary, acceptanceCriteria, status } = nextProps.boat;

    this.setState({
      id,
      summary,
      acceptanceCriteria,
      status
    });
  }

  componentDidMount() {
    const { pt_id } = this.props.match.params;
    this.props.getBoat(pt_id);
  }

  onSubmit(e) {
    e.preventDefault();
    const updatedBoat = {
      id: this.state.id,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status
    };

    this.props.addBoat(updatedBoat, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="addBoat">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="/" className="btn btn-light">
                Back to Board
              </a>
              <h4 className="display-4 text-center">
                Add /Update Project Task
              </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Priority Level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateBoat.propTypes = {
  boat: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getBoat: PropTypes.func.isRequired,
  addBoat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  boat: state.boat.boat,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBoat: getBoat, addBoat: addBoat }
)(UpdateBoat);
