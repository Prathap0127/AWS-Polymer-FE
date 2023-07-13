import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";

const Login = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_DEV_MODE}api/users/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        Navigate(location.state || "/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-7">
          <div className="row">
            <h4 className="head-title">Polymer</h4>
          </div>
          <h1 className="text-center">Login</h1>
          <div className="mx-auto col-10 col-md-8 col-lg-6 login">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-dark" type="submit">
                Login
              </button>
              <div id="emailHelp" className="form-text">
                Don't have Account? <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-5">
          <div className="left">
            <h3 className="mt-5">Start crushing your ads with Polymer!</h3>
            <div data-v-7356408d className="polymer-testimonials">
              <div className="slick-slider slick-initialized">
                <div className="slick-list" style={{ height: 176 }}>
                  <div
                    className="slick-track"
                    style={{
                      width: 368,
                      opacity: 1,
                      transform: "translate3d(0px, 0px, 0px)",
                    }}
                  >
                    <div
                      tabIndex={-1}
                      data-index={0}
                      aria-hidden="false"
                      className="slick-slide slick-active slick-current"
                      style={{ outline: "none", width: 368 }}
                    >
                      <div>
                        <div
                          tabIndex={-1}
                          className="carousel-slide"
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="text">
                            Polymer helped to pinpoint ad campaign optimization
                            opportunities that we wouldn't have previously
                            uncovered, and to create unique reporting views that
                            impressed our clients.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
