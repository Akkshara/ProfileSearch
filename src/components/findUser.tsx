import React, { useState, useEffect } from "react";
//import axios from "axios";

export type UserData = {
  name: string;
  blog: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  email: string;
  avatar_url: string;
};

const FindUser: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [data, setData] = useState<UserData | null>(null);
 
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then((value) => {
        if (value) {
          setData(value);
        }
      });
  };

  useEffect(() => {
    
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <>
      {/*******************************navbar **************************************************/}
      <nav
        className={`navbar ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container-fluid">
          <a className="navbar-brand">
            <h2>GITHUB PROFILE FINDER</h2>
          </a>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              {darkMode ? "Dark" : "Light"} Mode
            </label>
          </div>
        </div>
      </nav>

      <div className="row m-10 p-10 my-3">
        <div className="col-md-6 mx-auto text-center mt-20">
          <form onSubmit={onSubmitHandler}>
            <div className="col-mb-11 col-sm-12 my-2 formgroup">
              <input
                className="form-control"
                placeholder="enter username"
                aria-describedby="name"
                type="text"
                id="w"
                value={userName}
                onChange={onChangeHandler}
              />
            </div>

            <div className="col-mb-3 col-mb-12 my-2 formgroup">
              <button type="submit" className="btn btn-success mb-10 my-1">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center my-3">
        <h2>GITHUB PROFILE DETAILS</h2>
      </div>
      {/*******************************image****************************************** */}

      {/************************************************table****************************** */}
      {data && (
        <div>
          <div
            className=" image d-flex justify-content-center align-items-center align-middle my-4"
            style={{ height: "200px" }}
          >
            <img
              src={data.avatar_url}
              alt="image"
              style={{
                maxWidth: "200%",
                maxHeight: "200px",
                border: "2px solid black",
                borderRadius: "5px",
              }}
            />
          </div>

          <div className="table-container">
            <div className="table-responsive">
              <table className="table table-hover my-5 table-bordered">
                <thead className="table-active">
                  <tr>
                    <th>sr.no</th>
                    <th>details</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>name</td>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>blog</td>
                    <td>{data.blog}</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>location</td>
                    <td>{data.location}</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>bio</td>
                    <td>{data.bio}</td>
                  </tr>
                  <tr>
                    <th>5</th>
                    <td>public_repos</td>
                    <td>{data.public_repos}</td>
                  </tr>
                  <tr>
                    <th>6</th>
                    <td>followers</td>
                    <td>{data.followers}</td>
                  </tr>
                  <tr>
                    <th>7</th>
                    <td>following</td>
                    <td>{data.following}</td>
                  </tr>
                  <tr>
                    <th>8</th>
                    <td>email</td>
                    <td>{data.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FindUser;
