import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useAuth } from "../context/auth";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";

const Home = () => {
  const [respo, setRespo] = useState([]);
  const [text, setText] = useState();
  const [auth] = useAuth();

  let handleRespo = async () => {
    try {
      let res = await axios.get("http://localhost:8080/api/users/respo");
      setRespo(res?.data);
      // console.log(respo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleRespo();
  }, [auth?.token]);

  //copy to clipboard

  const copyToClip = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Linked Copied!!");
  };
  // const inputHandler = (event) => {
  //   setText(event.target.value);
  // };

  return (
    <div>
      <Header></Header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="text-center mt-2">
              <div className="list-group">
                <NavLink
                  to="/dashboard/admin/create-category"
                  className="list-group-item list-group-item-action"
                >
                  Search keywords
                </NavLink>
                <NavLink
                  to="/dashboard/admin/create-product"
                  className="list-group-item list-group-item-action"
                >
                  Licence Name
                </NavLink>
                <NavLink
                  to="/dashboard/admin/products"
                  className="list-group-item list-group-item-action"
                >
                  language
                </NavLink>
                <NavLink
                  to="/dashboard/admin/users"
                  className="list-group-item list-group-item-action"
                >
                  Owner
                </NavLink>
                <NavLink
                  to="/dashboard/admin/orders"
                  className="list-group-item list-group-item-action"
                >
                  Topics
                </NavLink>
                <NavLink
                  to="/dashboard/admin/orders"
                  className="list-group-item list-group-item-action"
                >
                  ID
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <pre>{JSON.stringify(auth, null, 4)}</pre>
            <h1>{respo?.data?.length}</h1>

            <div className="d-flex flex-wrap">
              {respo.data?.map((e) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {e.description}
                    </h6>
                    <a href={e.html_url} target="_blank" className="card-link">
                      GitHub Repo
                    </a>
                    <button
                      className="card-link"
                      value={text}
                      onClick={copyToClip}
                    >
                      Share
                    </button>
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <td>Forks :</td>
                          <td>{e.forks_count}</td>
                        </tr>
                        <tr>
                          <td>Licence Name</td>
                          <td>{e.license.name}</td>
                        </tr>
                        <tr>
                          <td>Stars</td>
                          <td>{e.stargazers_count}</td>
                        </tr>
                        <tr>
                          <td>Contributors Url</td>
                          <td>
                            <a
                              href={e.contributors_url}
                              title={e.contributors_url}
                            >
                              {e.contributors_url.substring(8, 17)}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Owner Avatar Url :</td>
                          <td>
                            <a
                              href={e.owner.avatar_url}
                              title={e.owner.avatar_url}
                            >
                              {e.owner.avatar_url.substring(8, 17)}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
