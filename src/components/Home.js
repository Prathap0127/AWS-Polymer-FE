import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useAuth } from "../context/auth";
import axios from "axios";
import Pagination from "./Pagination";
import Sort from "./Sort";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Home = () => {
  const [respo, setRespo] = useState([]);
  // const [text, setText] = useState();
  const [auth] = useAuth();
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "created_at", order: "asc" });
  const [filterLanguage] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const repos = async () => {
      try {
        console.log(search);
        const { data } = await axios.get(
          `${
            process.env.REACT_APP_DEV_MODE
          }api/users/resposearch?page=${page}&${sort.sort},${
            sort.order
          }&language=${filterLanguage.toString()}&search=${search}`
        );
        setObj(data);
        setRespo(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    repos();
  }, [sort, filterLanguage, page, search]);

  // let handleRespo = async () => {
  //   try {
  //     let res = await axios.get("http://localhost:8080/api/users/respo");
  //     setRespo(res?.data);
  //     // console.log(respo);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   handleRespo();
  // }, []);

  return (
    <div>
      <Header></Header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="text-center mt-2">
              {/* <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              /> */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={obj.data}
                getOptionLabel={(r) => r.language || ""}
                onChange={(e, v) => setSearch(v)}
                onInputChange={(e, v) => setSearch(v)}
                sx={{ width: 290 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search" />
                )}
              />
            </div>
          </div>
          <div className="col-md-9">
            {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
            {/* <h1>{obj?.data?.length}</h1> */}

            <div className="d-flex flex-wrap">
              {respo?.data?.map((e) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={e._id}
                >
                  <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {e.description}
                    </h6>
                    <a href={e.html_url} target="" className="card-link">
                      GitHub Repo
                    </a>
                    <button className="card-link">Share</button>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <td>language:</td>
                          <td>{e.language}</td>
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
            <Pagination
              page={page}
              limit={obj.limit ? obj.limit : 0}
              total={obj.total ? obj.total : 0}
              setpage={(page) => setPage(page)}
            />
            <Sort sort={sort} setSort={(sort) => setSort(sort)} />
            {/* <Language
              filterLanguage={filterLanguage}
              languages={obj.language ? obj.language : []}
              setfilterLanguage={(language) => setfilterLanguage(language)}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
