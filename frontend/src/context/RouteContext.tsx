import { createContext, useState, ReactNode } from "react";
import { IRouteContext } from "../model/IRoute.ts";

/**
 * @author Johanna Hechtl
 * @since 13.05.2025
 */


interface RouteContextType {
    recentRoutes: IRouteContext[];
    setRecentRoutes: (routes: IRouteContext[]) => void;
    joinedRoutes: IRouteContext[];
    setJoinedRoutes: (routes: IRouteContext[]) => void;
}

export const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider = ({ children }: { children: ReactNode }) => {
    const [recentRoutes, setRecentRoutes] = useState<IRouteContext[]>([]);
    const [joinedRoutes, setJoinedRoutes] = useState<IRouteContext[]>([]);

    return (
        <RouteContext.Provider value={{ recentRoutes, setRecentRoutes, joinedRoutes, setJoinedRoutes }}>
            {children}
        </RouteContext.Provider>
    );
};