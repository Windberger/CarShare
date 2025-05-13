import React, {useState, useContext, useEffect} from "react";
import PropTypes from 'prop-types';
import Navbar from "./Navbar.tsx";
import {useParams} from "react-router-dom";
import {RouteContext} from "../context/RouteContext.tsx";
import {IRoute} from "../model/IRoute.ts";


/**
 * @author Johanna Hechtl
 * @since 13.05.2025
 */


// TODO: hab die Routen in RouteContext geschrieben mit id bestimmte Route suchen


RouteDetails.propTypes = {};

function RouteDetails(props) {
    const {id} = useParams();
    const {recentRoutes, joinedRoutes} = useContext(RouteContext)!;
    let route: IRoute | undefined;

    function findRoute(id) {

        route = recentRoutes.find(id);
        if (route == null) {
            joinedRoutes.find(id);
        }

    }

    useEffect(() => {
        findRoute(id);
    }, []);

    return (
        <>
            <Navbar></Navbar>


            <div>{route?.startAddress.city}</div>

        </>
    );
}

export default RouteDetails;