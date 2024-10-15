import React, { useContext, useState } from "react";

const AppContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const updateUserInformation = (data) => {
    setUserInfo(data);
  };
  // const { data: dataUser } = useQuery("validateToken", validateToken, {
  //   retry: false,
  // });
  return (
    <AppContext.Provider
      value={{
        userInfo: userInfo,
        updateUserInformation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
