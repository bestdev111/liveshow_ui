import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "react-global-configuration";
import renderHTML from "react-render-html";
import { translate, t, setLanguage } from "react-multi-lang";
import logo from "./../../../logo2.svg"
class Footer extends Component {
  state = {};

  handleChangeLang = ({ currentTarget: input }) => {
    console.log(input.value);
    setLanguage(input.value);
    localStorage.setItem("lang", input.value);
    window.location.reload();
  };
  
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div id="subscription" class="subscription bg-primary">
            {/* <div class="container"> */}
              <p class="statement text-center text-color-white">Sign up to our newsletter to receive news and updates!</p>
              <form>
                <input type="text" placeholder="First name" class="form-control" id="first_name" name="first_name"/>
                <input type="text" placeholder="Last name" class="form-control" id="last_name" name="last_name"/>
                <input type="email" placeholder="Email" class="form-control" id="email" name="email"/>
                <button class="btn btn-outline" id="singup"> SIGNUP </button>
              </form>
            {/* </div> */}
          </div>
          <div className="row">
            <ul className="social-links col-12 col-md-4 list-unstyled">
              <li><a href="/"><img src="/assets/img/social/facebook.svg" class="social-icon" alt="facebook"/></a></li>
              <li><a href="/"><img src="/assets/img/social/twitter.svg" class="social-icon" alt="twitter"/></a></li>
              <li><a href="/"><img src="/assets/img/social/instagram.svg" class="social-icon" alt="instagram"/></a></li>
            </ul>
            <div className="col-12 col-md-4 visible-lg visible-md text-center">
              <img src={logo} className="logo-img" alt="logo"/>
              <p className="white"><b>LYVE SHOW LLC <br />2021 ALL RIGHTS RESERVED</b></p>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 resp-mrg-btm-xs ">
              <ul className="list-unstyled footer-list text-color-white">
                <li><a href="/">Terms &amp; Conditions</a></li>
                <li><a href="/">Privacy Policy</a></li>
                <li><a href="/">Contact</a></li>
                <li><a href="/">Reglas de Soteos</a></li>
              </ul>
            </div>
          </div>

          <div className="row text-color-white container">
              <i className="fa fa-copyright icon"></i>
              <span>
                {t("copy_right")}
              </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default translate(Footer);
