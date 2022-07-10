
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const loginUser = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/auth/jwt/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    let x;
    for (const key in data) {
        x = data[key];
    }
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
    } 
    else if (response.status === 401) {
      alert(x);
    }
    else {
      alert("Something went wrong!");
    }
  };
  const registerUser = async (email, firstname, lastname, content_category, password, re_password) => {
    const response = await fetch("http://127.0.0.1:8000/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        email,
        firstname,
        lastname,
        content_category,
        password,
        re_password
      })
    })
    const result = await response.json();
    let x;
    for (const key in result) {
        x = result[key];
      }

    if (response.status === 201) {
      history.push("/email-verification");
    }
    else if (response.status === 400) {
      alert(x);
    }
    else {
      alert("Something went wrong!");
    }

  };
  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:8000/auth/users/me/",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${authTokens.access}`
      },
    });
    const data = await response.json()
 
    return data
  };
  const editUser = async (firstname, lastname, content_category) => {
    const response = await fetch("http://127.0.0.1:8000/auth/users/me/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${authTokens.access}`
      },
      body: JSON.stringify({
        firstname, 
        lastname, 
        content_category
      })
    });
    const data = await response.json();
    let x;
    for (const key in data) {
        x = data[key];
    }
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/profile");
    } 
    else if (response.status === 401) {
      alert(x);
    }
    
  };

  const verifyUserEmail = async (uid, token) => {
    console.log(uid, token);
    const response = await fetch("http://127.0.0.1:8000/auth/users/activation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uid,
        token
      })
    });
    const data = await response.json();
    console.log(data);

  };
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    verifyUserEmail,
    fetchData,
    editUser
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};