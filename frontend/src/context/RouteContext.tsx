import React, { createContext, useState, ReactNode } from "react";
import { IRoute } from "../model/IRoute";

interface RouteContextType {
    recentRoutes: IRoute[];
    setRecentRoutes: (routes: IRoute[]) => void;
    joinedRoutes: IRoute[];
    setJoinedRoutes: (routes: IRoute[]) => void;
}

export const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider = ({ children }: { children: ReactNode }) => {
    const [recentRoutes, setRecentRoutes] = useState<IRoute[]>([]);
    const [joinedRoutes, setJoinedRoutes] = useState<IRoute[]>([]);

    return (
        <RouteContext.Provider value={{ recentRoutes, setRecentRoutes, joinedRoutes, setJoinedRoutes }}>
            {children}
        </RouteContext.Provider>
    );
};