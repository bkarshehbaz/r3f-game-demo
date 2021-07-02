import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
              }}
              className="col s5 brand-logo center black-text"
            >
              {/* <i className="material-icons">code</i> */}
              Welcome {auth && auth.user.name
                ? auth.user.name
                : "To Bitarcade"}{" "}
              🥳
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
