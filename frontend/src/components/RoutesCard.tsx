import React from 'react';

function RoutesCard(props) {
    return (
        <div className="p-4 border-2 border-[#194569] rounded-xl shadow-md m-8">
            <h2 className="text-black text-xl font-semibold mb-2">Recent Routes</h2>
            <ul className="list-disc pl-5 text-gray-700">
                <li>List item</li>
                <li>List item</li>
                <li>List item</li>
                <li>List item</li>
                <li>List item</li>
                <li>List item</li>
            </ul>
        </div>);
}

export default RoutesCard;