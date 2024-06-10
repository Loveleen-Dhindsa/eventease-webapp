import React from "react";
import footerlogo from "../assets/logo-footer.jpeg";
import instalogo from "../assets/insta.jpeg";
import fablogo from "../assets/fablogo.jpeg";
import locationImg from "../assets/location_img.png";
import emaillogo from "../assets/emaillogo.jpg";
import phoneLogo from "../assets/phoneLogo.png";

import "./footer.css";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer class="footer-section">
        <div class="container">
          <div class="footer-content footer-cta pt-5 pb-5">
            <div class="row">
              <div class="col-xl-6 col-lg-6 mb-50">
                <div class="footer-widget">
                  <div class="footer-logo">
                    <a href="index.html">
                      <img src={footerlogo} class="img-fluid" alt="logo" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 mb-50">
                <div class="footer-social-icon">
                  <span>Follow us</span>
                  <a href="1">
                    <img
                      src={instalogo}
                      alt="ghj"
                      style={{ height: "50px", width: "50px" }}
                    ></img>
                  </a>
                  {/* <a href="1"><i class="fab fa-facebook-f facebook-bg"></i></a> */}
                  <a href="1">
                    <img
                      src={fablogo}
                      alt="ghj"
                      style={{ height: "50px", width: "50px" }}
                    ></img>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-5 pb-5">
            <div class="row">
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <img
                    src={locationImg}
                    alt="ghj"
                    style={{ height: "50px", width: "50px" }}
                  ></img>
                  <i class="fas fa-map-marker-alt"></i>
                  <div class="cta-text">
                    <h4>Find us</h4>
                    <span>105 Onward Avenue, Kitchiner, Canada</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <img
                    src={phoneLogo}
                    class="img-fluid"
                    alt="logo"
                    style={{ height: "50px", width: "50px" }}
                  />
                  <div class="cta-text">
                    <h4>Call us</h4>
                    <span>5483332572</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <img
                    src={emaillogo}
                    class="img-fluid"
                    alt="logo"
                    style={{ height: "50px", width: "50px" }}
                  />
                  <div class="cta-text">
                    <h4>Mail us</h4>
                    <span>EventEase@Events.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="copyright-area">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                <div class="copyright-text">
                  <p>
                    Copyright &copy; {year}, All Right Reserved{" "}
                    <a href="mailto: mkmywebsite101@gmail.com"></a>
                  </p>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div class="footer-menu">
                  <ul>
                    {/* <li><a href="1">Terms</a></li>
                                <li><a href="1">Privacy</a></li>
                                <li><a href="1">Policy</a></li>
                                <li><a href="1">Contact</a></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
