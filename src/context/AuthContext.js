// ** React Imports
import { createContext, useEffect, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "src/configs/AxiosSetting";

// ** Config
import jwt from "jsonwebtoken";
import { destroyCookie, setCookie } from "nookies";
import authConfig from "src/configs/auth";

// ** Defaults
const defaultProvider = {
  user: null,
  userAccess: null,
  groups: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
  token: null,
  setToken: () => null,
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [userAccess, setUserAccess] = useState(defaultProvider.userAccess);
  const [groups, setGroups] = useState(defaultProvider.groups);

  const [token, setToken] = useState(defaultProvider.token);

  const [loading, setLoading] = useState(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState(
    defaultProvider.isInitialized
  );

  // ** Hooks
  const router = useRouter();
  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true);
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      );
      const storedTokenAccess = window.localStorage.getItem(
        authConfig.storageTokenKeyNameAccess
      );
      const storedGroups = window.localStorage.getItem(
        authConfig.storageTokenKeyNameGroup
      );

      if (storedToken && storedTokenAccess) {
        setLoading(true);
        await axios
          .get("me", {
            headers: {
              token: storedToken,
              access: storedTokenAccess,
              groups: storedGroups,
            },
          })
          .then(async (response) => {
            const { code, data, user_access, groups } = response.data;
            if (code === 200) {
              setUser(data);
              setUserAccess(user_access);
              setGroups(groups);
              setLoading(false);
              setCookie({}, "token", storedToken, {
                path: "/",
              });
              setCookie({}, "access", storedTokenAccess, {
                path: "/",
              });

              setToken(storedToken);
            } else {
              setLoading(false);
              destroyCookie({}, "token", {
                path: "/",
              });
              destroyCookie({}, "access", {
                path: "/",
              });
              handleLogout();
            }
          })
          .catch((err) => {
            console.log(err);
            localStorage.removeItem("userData");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("accessuser");

            setUser(null);
            setLoading(false);
            destroyCookie({}, "token");
            destroyCookie({}, "access");
            destroyCookie({}, "groups");
          });
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (params, errorCallback) => {
    try {
      const config = {
        method: "post",
        url: "login",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: params,
      };
      const response = await axios(config);

      const { multi, code, token, message, user_access, groups, data } =
        response.data;

      if (multi) {
        return data;
      }

      if (code !== 200) {
        await errorCallback(message);
      } else {
        window.localStorage.setItem(authConfig.storageTokenKeyName, token);
        window.localStorage.setItem(
          authConfig.storageTokenKeyNameAccess,
          user_access
        );
        window.localStorage.setItem(
          authConfig.storageTokenKeyNameGroup,
          groups
        );

        const returnUrl = router.query.returnUrl;
        setUser(jwt.decode(token));
        setUserAccess(jwt.decode(user_access));
        setGroups(jwt.decode(groups));
        setCookie({}, "token", token, {
          path: "/",
        });
        setCookie({}, "access", user_access, {
          path: "/",
        });
        setCookie({}, "groups", groups, {
          path: "/",
        });
        setToken(token);

        await window.localStorage.setItem(
          "userData",
          JSON.stringify(jwt.decode(token))
        );
        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

        window.location.replace(redirectURL);
      }
    } catch (error) {
      if (errorCallback) errorCallback(error.message);
    }
  };

  const handleLogout = () => {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    );

    const config = {
      method: "post",
      url: "logout",
      headers: {
        token: storedToken,
      },
    };
    axios(config);
    setUser(null);
    setIsInitialized(false);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
    destroyCookie({}, "token", {
      path: "/",
    });
    destroyCookie({}, "access", {
      path: "/",
    });
  };

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error);
        } else {
          handleLogin({ email: params.email, password: params.password });
        }
      })
      .catch((err) => (errorCallback ? errorCallback(err) : null));
  };

  const values = {
    user,
    userAccess,
    groups,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    token,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
