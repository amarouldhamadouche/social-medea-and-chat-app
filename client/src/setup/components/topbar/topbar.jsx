import "./topbar.css";
import {
  Search,
  Person,
  Notifications,
  Chat,
  ExitToApp,
} from "@material-ui/icons";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexs/AuthContex";
import { useContext, useState, useRef } from "react";

import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const findThisUsername = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const handleClickLogout = () => {
    setOpen(false);

    dispatch({ type: "logout" });
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    console.log(findThisUsername.current.value);
    if (findThisUsername.current.value) {
      window.location.pathname = "/profile/" + findThisUsername.current.value;
    }
  };

  return (
    <>
      <div className="topbar">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">amarSocial</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <form className="topbarSearch" onSubmit={searchSubmit}>
            <Search className="searchIcon" />
            <input
              placeholder="search for friends or videos"
              ref={findThisUsername}
              required
              className="inputBar"
            />
          </form>
        </div>
        <div className="topbarRight">
          <div className="linkbars">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="linkbar">timeLine</span>
            </Link>
          </div>
          <div className="topbarIcon">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Link
                to="/messenger"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Chat />
              </Link>
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <ExitToApp onClick={handleClickOpen} />
          <Dialog open={open} onClose={handleClickClose}>
            <DialogTitle className="dialogue">
              Do You Really Want To Logout?
            </DialogTitle>
            <DialogContent className="dialogue"></DialogContent>
            <DialogActions className="dialogue">
              <Button onClick={handleClickClose} style={{ color: "limegreen" }}>
                No
              </Button>
              <Button
                onClick={handleClickLogout}
                style={{ color: "limegreen" }}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>

          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profileImg ? PF + user.profileImg : PF + "noAvatar.png"}
              alt=""
              className="imagebar"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
