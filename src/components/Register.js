import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let Navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, phone, address);
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_DEV_MODE}api/users/register`,
        {
          fname,
          lname,
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        Navigate("/");
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
          <h1 className="text-center">Register</h1>
          <div className="mx-auto col-10 col-md-8 col-lg-6 login">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex">
                <div className="w-50">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="w-50 ms-1">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>

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
                Already have Account? <Link to="/">Login</Link>
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
            <div className="trusted-by">
              <div className="text-center">Trusted by teams at</div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
