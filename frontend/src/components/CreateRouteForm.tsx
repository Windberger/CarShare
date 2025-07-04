import React, {useMemo, useState, useContext} from 'react';
import Navbar from "./Navbar.tsx";
import Select, {SingleValue} from 'react-select'
import countryList from "react-select-country-list";
import {createAddress} from "../services/AddressService.ts";
import {UserContext} from "../context/UserContext.tsx";
import {createRoute} from "../services/RouteService.ts";
import {useNavigate} from "react-router-dom";
import {ICreateAddress} from "../model/IAddress.ts";
import {ICreateRoute} from "../model/IRoute.ts";


type CountryOption = {
    label: string;
    value: string;
};

function CreateRouteForm() {
    const [startAddress, setStartAddress] = useState<ICreateAddress>({
        country: '',
        postalCode: '',
        city: '',
        street: '',
        houseNumber: ''
    });

    const [destinationAddress, setDestinationAddress] = useState<ICreateAddress>({
        country: '',
        postalCode: '',
        city: '',
        street: '',
        houseNumber: ''
    });

    const [startCountry, setStartCountry] = useState<CountryOption | null>(null);
    const [destinationCountry, setDestinationCountry] = useState<CountryOption | null>(null);
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("")
    const navigate = useNavigate();

    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext not found");
    }
    const {userId} = userContext;

    const countryOptions = useMemo(() => countryList().getData(), [])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        let startAddressId: number | null = null;
        let destinationAddressId: number | null = null;

        createAddress(startAddress).then((data) => {
            startAddressId = data;
            createAddress(destinationAddress).then((data) => {
                destinationAddressId = data;
                console.log("start id: " + startAddressId + " end addr id " + destinationAddressId + " usid " + userId)

                if (startAddressId && destinationAddressId && userId) {
                    const datetime = `${startDate}T${startTime}`

                    const route: ICreateRoute = {
                        startAddressId: startAddressId,
                        endAddressId: destinationAddressId,
                        startTime: datetime,
                        driverId: userId
                    }
                    createRoute(route).then((data) => {
                        console.log(data);



                        navigate(`/detailRoute/${data}`)
                    }).catch((error) => {
                        if (error.status == 403) {
                            alert("This route already exists!");
                        } else {
                            console.error(error);
                            alert("An unknown error occurred!");
                        }
                    });
                }
            }).catch((error) => {
                if (error.status == 400) {
                    alert(`Address ${destinationAddress.street} ${destinationAddress.houseNumber}, ${destinationAddress.city} does not exist!`)
                }
            })
        }).catch((error) => {
            if (error.status == 400) {
                alert(`Address ${startAddress.street} ${startAddress.houseNumber}, ${startAddress.city} does not exist!`)
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'destination') => {
        const {name, value} = e.target;
        if (type === 'start') {
            setStartAddress(prev => ({...prev, [name]: value}));
        } else {
            setDestinationAddress(prev => ({...prev, [name]: value}));
        }
    };

    const handleCountryChange = (selected: SingleValue<CountryOption>, type: string) => {
        if (!selected) return;

        const countryCode = selected.value;

        if (type === "start") {
            setStartCountry(selected);
            setStartAddress(prev => ({...prev, country: countryCode}));
        } else {
            setDestinationCountry(selected);
            setDestinationAddress(prev => ({...prev, country: countryCode}));
        }
    };

    const renderAddressFields = (type: 'start' | 'destination', address: typeof startAddress) => (
        <div className="mb-10">
            <h3 className="text-xl font-semibold text-[#194569]">
                {type === 'start' ? 'Start Address' : 'Destination Address'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block font-medium mb-1">Country</label>
                    <Select
                        options={countryOptions}
                        value={type === 'start' ? startCountry : destinationCountry}
                        onChange={(e) => handleCountryChange(e, type)}
                        className="text-black"
                        placeholder="Country"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={address.postalCode}
                        onChange={(e) => handleChange(e, type)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">City</label>
                    <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={(e) => handleChange(e, type)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">Street</label>
                    <input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={(e) => handleChange(e, type)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">House Number</label>
                    <input
                        type="text"
                        name="houseNumber"
                        value={address.houseNumber}
                        onChange={(e) => handleChange(e, type)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
                        required
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar previousPage={"dashboard"}/>
            <main className="w-screen flex-1 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white w-full max-w-3xl mx-auto p-10 rounded-xl shadow-md"
                >
                    <h2 className="text-3xl font-bold text-[#194569] mb-4 text-center">Create Carpool</h2>
                    {renderAddressFields('start', startAddress)}
                    {renderAddressFields('destination', destinationAddress)}

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-[#194569] mb-4">Start Time</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Start Time</label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#194569]"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#194569] text-white rounded-3xl shadow"
                            onClick={handleSubmit}
                        >
                            Create Carpool
                        </button>
                    </div>
                </form>
            </main>
            <div/>
        </div>
    );
}

export default CreateRouteForm;
