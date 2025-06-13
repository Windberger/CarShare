// import React, {useMemo, useState, useContext, useEffect} from 'react';
// import Navbar from "./Navbar.tsx";
// import Select, {SingleValue} from 'react-select'
// import countryList from "react-select-country-list";
// import {UserContext} from "../context/UserContext.tsx";
// import {getRouteByJoinCode} from "../services/RouteService.ts";
// import {useParams} from "react-router-dom";
// import {useNavigate} from "react-router-dom";
// import {createRouteMember} from "../services/RouteMemberService.ts";
// import {IRoute} from "../model/IRoute.ts";
// import {ICreateAddress} from "../model/IAddress.ts";
//
// type CountryOption = {
//     label: string;
//     value: string;
// };
//
// function JoinRouteForm() {
//
//     const {joinCode} = useParams();
//     const [startAddress, setStartAddress] = useState<ICreateAddress>({
//         country: '',
//         postalCode: '',
//         city: '',
//         street: '',
//         houseNumber: ''
//     });
//
//     const [destinationAddress, setDestinationAddress] = useState<ICreateAddress>({
//         country: '',
//         postalCode: '',
//         city: '',
//         street: '',
//         houseNumber: ''
//     });
//
//     const [startCountry, setStartCountry] = useState<CountryOption | null>(null);
//     const [startCity, setStartCity] = useState("");
//     const [destinationCity, setDestinationCity] = useState("");
//     const [destinationCountry, setDestinationCountry] = useState<CountryOption | null>(null);
//     const [routeData, setRouteData] = useState<IRoute>()
//     const [dateString, setDateString] = useState<string>("");
//     const navigate = useNavigate();
//
//     const userContext = useContext(UserContext);
//     if (!userContext) {
//         throw new Error("UserContext not found");
//     }
//     const {userId} = userContext;
//
//     const countryOptions = useMemo(() => countryList().getData(), [])
//
//     useEffect(() => {
//         loadRoute(joinCode as string);
//     }, []);
//
//     const loadRoute = (joinCode: string) => {
//         getRouteByJoinCode(joinCode)
//             .then((route: IRoute) => {
//                 const newStartAddress: ICreateAddress = {
//                     country: route.startAddress.country,
//                     postalCode: route.startAddress.postalCode as string,
//                     city: route.startAddress.city,
//                     street: route.startAddress.street,
//                     houseNumber: route.startAddress.houseNumber
//                 };
//                 const newDestinationAddress: ICreateAddress = {
//                     country: route.endAddress.country,
//                     postalCode: route.endAddress.postalCode,
//                     city: route.endAddress.city,
//                     street: route.endAddress.street,
//                     houseNumber: route.endAddress.houseNumber
//                 }
//
//                 setRouteData(route);
//                 setStartAddress(newStartAddress);
//                 setDestinationAddress(newDestinationAddress);
//                 setStartCountry({label: newStartAddress.country, value: newStartAddress.country});
//                 setDestinationCountry({label: newDestinationAddress.country, value: newDestinationAddress.country});
//                 setStartCity(route.startAddress.city);
//                 setDestinationCity(route.endAddress.city);
//
//                 const formatted = new Intl.DateTimeFormat("de-DE", {
//                     day: "2-digit",
//                     month: "2-digit",
//                     year: "numeric",
//                     hour: "2-digit",
//                     minute: "2-digit"
//                 }).format(new Date(Date.parse(route.startTime)));
//                 setDateString(formatted.replace(", ", " at "));
//             })
//             .catch((error) => {
//                 console.log(error);
//                 alert("An unknown error occurred!");
//             })
//     }
//
//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//
//         if (!userId) {
//             return;
//         }
//
//         createRouteMember(joinCode as string, userId, startAddress, destinationAddress)
//             .then((response) => {
//                 if (response.status == 200) {
//                     navigate("/dashboard");
//                 } else {
//                     alert("An error occurred while joining the Route: " + response.statusText);
//                 }
//             }).catch((error) => {
//             console.log(error)
//             console.log(error.response.data.detail)
//             alert("An error occurred while joining the Route: " + error.response.data.body.detail);
//         });
//     };
//
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'destination') => {
//         const {name, value} = e.target;
//
//         if (type === 'start') {
//             setStartAddress(prev => ({...prev, [name]: value}));
//         } else {
//             setDestinationAddress(prev => ({...prev, [name]: value}));
//         }
//     };
//
//     const handleCountryChange = (selected: SingleValue<CountryOption>, type: string) => {
//         if (!selected) return;
//         const countryCode = selected.value;
//
//         if (type === "start") {
//             setStartCountry(selected);
//             setStartAddress(prev => ({...prev, country: countryCode}));
//         } else {
//             setDestinationCountry(selected);
//             setDestinationAddress(prev => ({...prev, country: countryCode}));
//         }
//     };
//
//     const renderAddressFields = (type: 'start' | 'destination', address: typeof startAddress) => (
//         <div className="mb-10">
//             <h3 className="text-xl font-semibold text-[#194569]">
//                 {type === 'start' ? 'Start Address' : 'Destination Address'}
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                     <label className="block font-medium mb-1">Country</label>
//                     <Select
//                         options={countryOptions}
//                         value={type === 'start' ? startCountry : destinationCountry}
//                         onChange={(e) => handleCountryChange(e, type)}
//                         className="text-black"
//                         placeholder="Country"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">Postal Code</label>
//                     <input
//                         type="text"
//                         name="postalCode"
//                         value={address.postalCode}
//                         onChange={(e) => handleChange(e, type)}
//                         className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">City</label>
//                     <input
//                         type="text"
//                         name="city"
//                         value={address.city}
//                         onChange={(e) => handleChange(e, type)}
//                         className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
//                         required
//                     />
//                 </div>
//                 <div className="md:col-span-2">
//                     <label className="block text-gray-700 font-medium mb-1">Street</label>
//                     <input
//                         type="text"
//                         name="street"
//                         value={address.street}
//                         onChange={(e) => handleChange(e, type)}
//                         className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 font-medium mb-1">House Number</label>
//                     <input
//                         type="text"
//                         name="houseNumber"
//                         value={address.houseNumber}
//                         onChange={(e) => handleChange(e, type)}
//                         className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
//                         required
//                     />
//                 </div>
//             </div>
//         </div>
//     );
//
//     return (
//         <div className="min-h-screen flex flex-col bg-gray-100">
//             <Navbar previousPage={"dashboard"}/>
//             <main className="w-screen flex-1 flex items-center justify-center">
//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-white w-full max-w-3xl mx-auto p-10 rounded-xl shadow-md"
//                 >
//                     <h2 className="text-3xl font-bold text-[#194569] mb-4">Route
//                         from {startCity} to {destinationCity}</h2>
//
//                     {routeData &&
//                         <p className="text-black mb-4 text-xl">
//                             Route from {routeData.driver.firstname}, starts on {dateString}
//                         </p>
//                     }
//                     {renderAddressFields('start', startAddress)}
//                     {renderAddressFields('destination', destinationAddress)}
//
//
//                     <div className="flex justify-center">
//                         <button
//                             type="submit"
//                             className="px-6 py-2 bg-[#194569] text-white rounded-xl shadow hover:bg-[#163a57] transition mr-3"
//                         >
//                             Join Route
//                         </button>
//                         <button
//                             onClick={() => navigate("/dashboard")}
//                             className="px-6 py-2 bg-[#194569] text-white rounded-xl shadow hover:bg-[#163a57] transition"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             </main>
//             <div/>
//         </div>
//     );
// }
//
// export default JoinRouteForm;