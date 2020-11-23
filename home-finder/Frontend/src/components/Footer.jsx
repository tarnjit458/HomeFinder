import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="container navbar-fixed-bottom">
        <p className="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>Home Finder</p>
        <p>
          Ready?
          <a href="/"> Visit the homepage</a>
        </p>
      </div>
    );
  }
}

export default Footer;
