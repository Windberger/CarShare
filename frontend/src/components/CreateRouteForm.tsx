import React, {useMemo, useState} from 'react';
import Navbar from "./Navbar.tsx";
import Select, {SingleValue} from 'react-select'
import countryList from "react-select-country-list";
import {options} from "axios";

type CountryOption = {
    label: string;
    value: string;
};

function CreateRouteForm() {
    const [startAddress, setStartAddress] = useState({
        country: '',
        zip: '',
        city: '',
        street: '',
        houseNumber: ''
    });

    const [destinationAddress, setDestinationAddress] = useState({
        country: '',
        zip: '',
        city: '',
        street: '',
        houseNumber: ''
    });

    const [startCountry, setStartCountry] = useState<CountryOption | null>(null);
    const [destinationCountry, setDestinationCountry] = useState<CountryOption | null>(null);

    const countryOptions = useMemo(() => countryList().getData(), [])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Start Address:', startAddress);
        console.log('Destination Address:', destinationAddress);
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
        const countryName = selected.label;

        if (type === "start") {
            setStartCountry(selected);
            setStartAddress(prev => ({...prev, country: countryCode}));
        } else {
            setDestinationCountry(selected);
            setDestinationAddress(prev => ({...prev, country: countryCode}));
        }

        console.log("Selected country code:", countryCode);
    };

    const renderAddressFields = (type: 'start' | 'destination', address: typeof startAddress) => (
        <div className="mb-10">
            <h3 className="text-xl font-semibold text-[#194569] mb-4">
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
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Postal Code</label>
                    <input
                        type="text"
                        name="zip"
                        value={address.zip}
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
            <Navbar/>
            <main className="w-screen flex-1 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white w-full max-w-3xl mx-auto p-10 rounded-xl shadow-md"
                >
                    <h2 className="text-3xl font-bold text-[#194569] mb-8 text-center">Create Carpool</h2>
                    {renderAddressFields('start', startAddress)}
                    {renderAddressFields('destination', destinationAddress)}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#194569] text-white rounded-full shadow hover:bg-[#163a57] transition"
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
