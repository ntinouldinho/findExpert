import React, { Component } from "react";
import "../CSS/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export class Footer extends Component {

    render() {
        return (
          <footer>
            <div className="container t-center">
              <div className="row">
                <div className="col-md-4">
                  <h1>Useful Info</h1>
                  <p>Upcoming Discounts</p>
                  <p>Return Policy</p>
                  <p>
                    Privacy Policy
                  </p>
                  <p>Terms of Use</p>
                </div>
                <div className="col-md-4">
                  <h1>About Us</h1>
                  <p>
                      Find the most professional experts through our site.
                  </p>
                </div>
                <div className="col-md-4">
                  <h1>Find Us on:</h1>
                  <div className="media">
                    <ul>
                      <li>
                        <a href="https://www.aueb.gr/" target="_blank" rel="noreferrer">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/el/9/94/Athens_University_of_Economics_and_Business_%28logo%29.png"
                            alt="AUEB Logo"
                            className="aueb"
                          ></img>
                        </a>
                      </li>
                      {/* <li>
                        <a href="https://eclass.aueb.gr/" target="_blank">
                          <img
                            src="assets/logos/eclass.png"
                            alt="Eclass Logo"
                            className="eclass"
                          ></img>
                        </a>
                      </li> */}
                      <li>
                        <a
                          href="https://www.facebook.com/auebgreece"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/120px-Facebook_f_logo_%282019%29.svg.png"
                            alt="Facebook Logo"
                            className="fb"
                          ></img>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/aueb.gr/?hl=el"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="https://lh3.googleusercontent.com/2sREY-8UpjmaLDCTztldQf6u2RGUtuyf6VT5iyX3z53JS4TdvfQlX-rNChXKgpBYMw"
                            alt="Instagram Logo"
                            className="insta"
                          ></img>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <h1>Subscribe to our Newsletter:</h1>
                  <form action="">
                    <input
                      type="email"
                      placeholder="Email address"
                      name="mail"
                      size="30px"
                    ></input>
                    <button type="reset">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                    {/* <!--just to erase the email--> */}
                  </form>
                </div>
              </div>
              <hr></hr>
              <p className="copyright">©2021 FindXPRT®</p>
            </div>
          </footer>
        );
    }
}

export default Footer;