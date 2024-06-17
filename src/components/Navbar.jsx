import React from "react";
import { useState, useEffect } from "react";
import logo from "../assets/logo-footer.jpeg";
import "../style.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // <>
    //   <nav
    //     className={`navbar navbar-expand-lg mt-0 ${offset < 90 ? "fixed-top" : "bg-dark fixed-top"
    //       }`}
    //   >
    //     <div className="container">
    //       <a className="navbar-brand text-white " href="index.html">
    //         {/* Lord Butwal */}
    //         <img src={logo} alt="" style={{ height: "6rem", width: "10rem" }} />
    //       </a>

    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarNav"
    //         aria-controls="navbarNav"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarNav">
    //         <ul className="navbar-nav align-items-lg-center ms-auto me-lg-5">
    //           <li className="nav-item">
    //             <a className="nav-link click-scroll" href="#section_1">
    //               Home
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </>

    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="" className="App-logo" style={{ height: "4rem", width: "10rem" }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about-us">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/events">Events</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact-us">Contact Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/settings">Settings</a>
              </li>
            </ul>
            <div className="d-flex">
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button> */}
              <Link className="text-decoration-none" to="/auth/login">
                <a className="nav-link mr-5 fs-5 text-decoration-none" href="/">
                  Sign In
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
