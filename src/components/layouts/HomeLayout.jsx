import React, { Component } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

class HomeLayout extends Component {
  render() {
    return (
      <div className="wrapper bg-grey">
        <Header {...this.props} />
        <div class="top-spacing"></div>
        <div className="main-wrap-sec">{React.cloneElement(this.props.children)}</div>
        <div class="bottomheight"></div>
        <Footer />
      </div>
    );
  }
}

export default HomeLayout;
