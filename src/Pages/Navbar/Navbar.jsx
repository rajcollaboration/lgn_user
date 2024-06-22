import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getlocalStorage } from "../../services/services";
import ModalC from "../../Component/Modal/ModalC";
import { Button } from "react-bootstrap";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userId, setUserId] = useState("");
  const [JWTtoken, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const initialize = async () => {
      await getUser();
    };
    initialize();
  }, []);
  const getUser = async () => {
    try {
      const res = await getlocalStorage("user_details");
      const {token} = res;
      setToken(token);
      setUserId(res.user.others._id);
      setUserDetails(res.user.others);
    } catch (err) {
      console.error("Error getting user details:", err);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid p-0">
        <Link className="navbar-brand" to={"/home"}>
          <img
            src="https://dev2024.co.in/web/lgn/assets/site/images/lgn_logo.png"
            alt="Logo"
          />
        </Link>
        <ul className="navbar-nav">
          <li>
            <a href="#" className="nav-link">
              Following
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Browse
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-more-vertical"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </a>
          </li>
        </ul>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="search_form">
            <input type="search" className="search_box" placeholder="Search" />
          </form>
        </div>
        <div className="account_nav d-none d-sm-block">
          <ul>
          {
            userDetails?.accountType === "streamer" && <li>
            <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
              </li>
          }
            <li>
              <Link to={"/noti"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 24 24"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g fill="#000" fill-rule="evenodd" clip-rule="evenodd">
                      <path
                        d="M6.25 9A.75.75 0 0 1 7 8.25h6a.75.75 0 0 1 0 1.5H7A.75.75 0 0 1 6.25 9zM18.92 10.7c-.359 0-.675.14-.902.373l-.014.014c-.266.26-.415.63-.377 1.022v.009c.054.635.664 1.182 1.413 1.182h1.943a.276.276 0 0 0 .267-.27v-2.06a.276.276 0 0 0-.267-.27zm-1.97-.68a2.743 2.743 0 0 1 1.97-.82h2.107a1.777 1.777 0 0 1 1.723 1.77v2.06A1.777 1.777 0 0 1 21 14.8h-1.96c-1.41 0-2.777-1.03-2.907-2.553a2.759 2.759 0 0 1 .816-2.227z"
                        fill="#b7b7b7"
                        opacity="1"
                        data-original="#b7b7b7"
                      ></path>
                      <path
                        d="M7 4.25c-.244 0-.476.017-.696.051l-.02.003c-1.108.14-1.978.613-2.574 1.313-.598.7-.96 1.676-.96 2.883v7c0 1.33.44 2.38 1.155 3.095S5.67 19.75 7 19.75h9c1.33 0 2.38-.44 3.095-1.155S20.25 16.83 20.25 15.5v-.7h-1.21c-1.41 0-2.778-1.03-2.907-2.553a2.758 2.758 0 0 1 .816-2.227 2.743 2.743 0 0 1 1.971-.82h1.33v-.7c0-1.215-.368-2.197-.975-2.9-.606-.702-1.49-1.175-2.612-1.305A3.849 3.849 0 0 0 16 4.25zm-.914-1.433c.297-.045.602-.067.914-.067h9c.27 0 .56.01.855.057 1.45.173 2.685.804 3.555 1.813.873 1.012 1.34 2.355 1.34 3.88v1.45a.75.75 0 0 1-.75.75h-2.08c-.36 0-.675.14-.903.373l-.013.014c-.266.26-.415.63-.377 1.022v.009c.053.635.664 1.182 1.413 1.182H21a.75.75 0 0 1 .75.75v1.45c0 1.67-.56 3.12-1.595 4.155S17.67 21.25 16 21.25H7c-1.67 0-3.12-.56-4.155-1.595S1.25 17.17 1.25 15.5v-7c0-1.513.458-2.848 1.318-3.857.86-1.008 2.08-1.643 3.518-1.826z"
                        fill="#b7b7b7"
                        opacity="1"
                        data-original="#b7b7b7"
                      ></path>
                    </g>
                  </g>
                </svg>
              </Link>
            </li>
            <li>
              <Link to={"/noti"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 682.667 682"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g transform="matrix(1,0,0,1,20,50)">
                    <path
                      d="M552.012-1.332H87.988C39.473-1.332 0 38.133 0 86.656V370.63c0 48.414 39.3 87.816 87.676 87.988V587.48l185.191-128.863h279.145c48.515 0 87.988-39.472 87.988-87.988V86.656c0-48.523-39.473-87.988-87.988-87.988zm50.488 371.96c0 27.837-22.648 50.49-50.488 50.49h-290.91l-135.926 94.585v-94.586H87.988c-27.84 0-50.488-22.652-50.488-50.488V86.656c0-27.843 22.648-50.488 50.488-50.488h464.024c27.84 0 50.488 22.645 50.488 50.488zm0 0"
                      fill="#b7b7b7"
                      opacity="1"
                      data-original="#b7b7b7"
                    ></path>
                    <path
                      d="M171.293 131.172h297.414v37.5H171.293zM171.293 211.172h297.414v37.5H171.293zM171.293 291.172h297.414v37.5H171.293zm0 0"
                      fill="#b7b7b7"
                      opacity="1"
                      data-original="#b7b7b7"
                    ></path>
                  </g>
                </svg>
              </Link>
            </li>
            
            <li>
              <Link to={"/noti"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 512 512"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M213.332 512c-44.094 0-80-35.883-80-80 0-8.832 7.168-16 16-16s16 7.168 16 16c0 26.477 21.547 48 48 48s48-21.523 48-48c0-8.832 7.168-16 16-16s16 7.168 16 16c0 44.117-35.902 80-80 80zm0 0"
                      fill="#b7b7b7"
                      opacity="1"
                      data-original="#b7b7b7"
                    ></path>
                    <path
                      d="M389.332 448h-352C16.746 448 0 431.254 0 410.668a37.314 37.314 0 0 1 13.055-28.375c.535-.469 1.11-.895 1.707-1.281C46.078 353.684 64 314.367 64 272.852v-59.52c0-69.48 47.082-129.129 114.496-145.066 8.617-1.985 17.238 3.285 19.266 11.906 2.023 8.598-3.309 17.215-11.883 19.242C132.949 111.914 96 158.762 96 213.332v59.52c0 51.543-22.594 100.312-61.93 133.78-.32.259-.597.493-.941.727A5.28 5.28 0 0 0 32 410.668c0 2.898 2.434 5.332 5.332 5.332h352c2.902 0 5.336-2.434 5.336-5.332 0-1.496-.555-2.582-1.152-3.309-.32-.234-.621-.468-.918-.726-19.114-16.297-34.2-35.965-44.82-58.473-3.798-7.98-.387-17.515 7.613-21.312a15.962 15.962 0 0 1 21.293 7.636c8.445 17.836 20.285 33.496 35.261 46.594.555.383 1.133.79 1.621 1.215a37.201 37.201 0 0 1 13.102 28.375c0 20.586-16.746 37.332-37.336 37.332zm0 0"
                      fill="#b7b7b7"
                      opacity="1"
                      data-original="#b7b7b7"
                    ></path>
                    <path
                      d="M373.332 277.332c-76.457 0-138.664-62.207-138.664-138.664C234.668 62.207 296.875 0 373.332 0 449.793 0 512 62.207 512 138.668c0 76.457-62.207 138.664-138.668 138.664zm0-245.332c-58.816 0-106.664 47.852-106.664 106.668 0 58.816 47.848 106.664 106.664 106.664S480 197.484 480 138.668 432.148 32 373.332 32zm0 0"
                      fill="#b7b7b7"
                      opacity="1"
                      data-original="#b7b7b7"
                    ></path>
                    <path
                      d="M378.668 202.668c-8.832 0-16-7.168-16-16v-69.336H352c-8.832 0-16-7.168-16-16s7.168-16 16-16h26.668c8.832 0 16 7.168 16 16v85.336c0 8.832-7.168 16-16 16zm0 0"
                      fill="#b7b7b7"
                      opacity="1"
                      data-original="#b7b7b7"
                    ></path>
                  </g>
                </svg>
              </Link>
            </li>
            <li>
              <Link to={"/noti"}>
                <img src="<?=$basepath?>images/user_avatar.png" />
              </Link>
            </li>
            <li>
              <div id="google_translate_element"></div>
            </li>
            <ModalC show={show} handleClose={handleClose}/>
          </ul>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
