import {createContext, useState, ReactNode} from 'react';

interface UserContextType {
    userId: number | null
    setUserId: (userId: number | null) => void;

}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [userId, setUserId] = useState<number | null>(null);


    return (
        <UserContext.Provider
            value={{userId, setUserId}}
        >
            {children}
        </UserContext.Provider>
    );
};
