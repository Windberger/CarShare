import React, {useState} from 'react';
import PropTypes from 'prop-types';

CreateRouteForm.propTypes = {
    
};

function CreateRouteForm(props) {
    const [address, setAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className=" bg-white w-screen h-screen ">
            <h2 className="text-[#194569] text-xl font-semibold mb-4">Create Carpool</h2>

            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#194569]"
                    placeholder="Enter your address"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="destinationAddress" className="block text-gray-700 font-medium mb-2">Destination Address</label>
                <input
                    type="text"
                    id="destinationAddress"
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#194569]"
                    placeholder="Enter destination address"
                    required
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-[#194569] text-white rounded-3xl shadow hover:bg-[#163a57]">
                Create Carpool
            </button>
        </form>
    );
}

export default CreateRouteForm;