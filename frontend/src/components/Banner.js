import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function MemberListPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://api.ru-novel.ru/api/members")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); // Initialize filteredData with all data
      })
      .catch((err) => console.error("Failed to fetch members:", err));
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the form from submitting traditionally
    const filtered = data.filter((member) =>
      member.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(0); // Reset pagination to the first page
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <div
      className="w-full bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://cdn.vox-cdn.com/thumbor/kjcG6uGRVOuM9gwUdERF5vGvZdc=/0x0:1920x1080/1820x1213/filters:focal(804x128:1110x434):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/70383739/S8_KeyArt.0.jpg')",
      }}
    >
      <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-white w-full">
        {/* Search box */}
        <div className="bg-white shadow-md rounded-t mt-8 mx-auto px-4 sm:px-8 pt-6 pb-8 mb-4 w-full">
          <div className="mb-4">
            <div className="text-lg font-bold mb-2 pb-4 border-b border-gray-300">
              <span className="caption-subject bold">Search Member List</span>
            </div>
          </div>
          <form onSubmit={handleSearch} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="q"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="q"
                name="q"
                placeholder="Search for user..."
                className="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end">
                
              <button
                type="submit"
                className="bg-custom-blue hover:bg-custom-hover-blue text-white px-3 py-1 font-bold focus:outline-none focus:shadow-outline"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Member list */}
        <div className="table-responsive ">
          <table className="min-w-full leading-normal ">
            <thead className="text-black">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold uppercase tracking-wider">
                  Avatar
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold uppercase tracking-wider">
                  Username
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold uppercase tracking-wider">
                  Fictions
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold uppercase tracking-wider">
                  Posts
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-white text-left text-xs font-semibold uppercase tracking-wider">
                  Level
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.length > 0 ? (
                currentPageData.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    }}
                  >
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full "
                            src={item.avatarURL}
                            alt={item.username}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="text-custom-blue whitespace-no-wrap">
                          {item.username}
                        </div>
                        {item.role === "staff" && (
                          <span className="bg-custom-blue text-white text-xxs font-semibold px-1 rounded-full">
                            Staff
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <div className="text-gray-900 whitespace-no-wrap">
                        {item.joined}
                      </div>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <div className="text-gray-900 whitespace-no-wrap">
                        {item.lastVisit}
                      </div>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <div className="text-gray-900 whitespace-no-wrap">
                        {item.fictions}
                      </div>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <div className="text-gray-900 whitespace-no-wrap">
                        {item.posts}
                      </div>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <div className="text-gray-900 whitespace-no-wrap">
                        {item.level}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-3">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              breakClassName={"page-item"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"inline-flex list-none pagination"}
              pageClassName={"inline mx-1"}
              pageLinkClassName={
                "px-3 py-1 rounded hover:bg-custom-hover-blue hover:text-white"
              }
              previousClassName={"inline mx-1"}
              previousLinkClassName={
                "px-3 py-1 rounded hover:bg-custom-hover-blue hover:text-white"
              }
              nextClassName={"inline mx-1"}
              nextLinkClassName={
                "px-3 py-1 rounded hover:bg-custom-hover-blue hover:text-white"
              }
              activeClassName={"bg-custom-blue text-white"}
              forcePage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberListPage;
