import React from 'react';

export const Invitations = () => {
    return (
        <div className="flex-grow p-4 bg-gray-200">
            <div className="shadow rounded overflow-hidden bg-white">
                <img className="w-full h-48 object-cover" src="https://www.royalroad.com/dist/img/collaborators_header.jpg" alt="Collaborators" />

                <div className="p-4 bg-orange-400 m-4 rounded">
                    <p className="text-sm text-orange-900">
                        Note: this page is for incoming invitations; to add a collaborator to your fiction, please go to the 
                        <a className="inline-block bg-blue-600 text-white py-1 px-3 rounded text-sm ml-2 cursor-pointer hover:bg-orange-700" href="/author-dashboard/collaborators">"Collaborators" settings page</a>.
                    </p>
                </div>

                <div className="p-4">
                    <h4 className="text-lg font-semibold mb-3 text-gray-700">Pending Collaboration Invitations</h4>
                    <div className="p-4 bg-gray-200  rounded">
                        
                            <p className="text-center text-gray-600">
                                You have no pending collaboration invitations.
                            </p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
