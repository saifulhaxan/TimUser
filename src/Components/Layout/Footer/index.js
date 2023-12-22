import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logo } from "../../../Assets/images";

import "./style.css";

export const Footer = (props) => {

  const location = useLocation()
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="logo_img">
              <img src={Logo} className="img-fluid" alt="" />
            </div>
          </div>
          <div className="col-md-8 mx-auto">
            <ul className="inner_links">
              <li><a href="javascript:;">Home</a></li>
              <li><a href="javascript:;">About Author</a></li>
              <li><a href="javascript:;">Our Books</a></li>
              <li><a href="javascript:;">Client's Review</a></li>
              <li><a href="javascript:;">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-8 mx-auto">
            <ul className="social_icons">
              <li><a href="javascript:;"><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="javascript:;"><i className="fa-brands fa-twitter"></i></a></li>
              <li><a href="javascript:;"><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="javascript:;"><i className="fa-brands fa-linkedin-in"></i></a></li>
              <li><a href="javascript:;"><i className="fa-brands fa-youtube"></i></a></li>

            </ul>
          </div>


        </div>
        <div className="row pt-4">
          <div className="col-md-6">
            <p className="copy_right">Copy Right &copy 2033 Tim-WDLLC All Rights Reserved</p>
          </div>
          <div className="col-md-6">
            <div className="privacy_links">
              <a href="javascript:;">Privacy Policy</a>
              <a href="javascript:;">Terms $ Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer >

  );
};
