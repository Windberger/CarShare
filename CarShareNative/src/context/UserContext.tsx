import React, { createContext, useState, ReactNode, useContext } from "react";

// Der Typ für unseren Context
type UserContextType = {
    userId: number | null;
    setUserId: (id: number | null) => void;
};

const defaultValue: UserContextType = {
    userId: null,
    setUserId: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<number | null>(null);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
