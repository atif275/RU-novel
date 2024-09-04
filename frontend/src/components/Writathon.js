import React from 'react';

export const Writathon = () => {
    return (
        <div className="flex-grow p-4 bg-gray-200">
        <div className="flex-grow">
            {/* Background image and text */}
            <div className="h-64 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url("https://www.royalroad.com/dist/img/writathon.jpg")' }}>
                <div className="p-4 bg-black bg-opacity-50 rounded">
                    <h1 className="text-4xl font-bold text-white">Royal Road Writathon</h1>
                    <p className="text-xl text-white mt-2">There is currently no Writathon scheduled</p>
                </div>
            </div>
        </div>
        </div>
    );
};
