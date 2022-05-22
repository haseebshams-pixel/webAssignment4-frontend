import React from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../redux/reducers/userSlice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router-dom";
import "./style.css";

export default function Header() {
  const history = useHistory();
  const signOutPressHandler = () => {
    confirmAlert({
      message: "Are you sure you want to Sign Out?",
      className: "d-flex justify-content-center",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            history.push("/");
            dispatch(resetUser());
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const navigate = () => {
    history.push("/");
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);
  return (
    <div>
      <header className="header py-1">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <Link to="/feed">
              <img
                src={require("../../../../assets/svg/logo.svg").default}
                width="200"
                alt="logo"
              />
            </Link>
          </div>
          <div>
            <nav className="d-flex">
              <ul className="p-0 m-0 header-list-style d-flex ">
                <li>
                  <Link
                    className="d-flex flex-column align-items-center justify-content-center header-list-item"
                    to="/feed"
                  >
                    <FeatherIcon icon="home" size="20" />
                    <small className="font-weight-light">Home</small>
                  </Link>
                </li>
              </ul>
              {user?.isLoggedIn && (
                <button
                  onClick={signOutPressHandler}
                  className="header-signout-btn"
                >
                  Sign Out
                </button>
              )}
              {!user?.isLoggedIn && (
                <>
                  <button onClick={navigate} className="header-signout-btn">
                    Sign up
                  </button>
                  <button onClick={navigate} className="header-signout-btn">
                    Log in
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      <div className="empty-header" />
    </div>
  );
}
