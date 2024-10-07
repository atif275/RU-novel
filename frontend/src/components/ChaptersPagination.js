import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FaBook, FaSearch, FaSort } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to get theme

const Chapters = ({ bookId, bookTitle }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const theme = useSelector((state) => state.userData.theme); // Get the current theme

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(`https://api.ru-novel.ru/api/books/${bookId}`);
        const bookData = response.data;

        const chaptersWithFormattedDates = bookData.chapters.map((chapter) => ({
          ...chapter,
          createdAt: new Date(chapter.createdAt.$date || chapter.createdAt),
        }));

        setData(chaptersWithFormattedDates);
        setFilteredData(chaptersWithFormattedDates);
      } catch (err) {
        console.error("Error fetching chapters:", err);
      }
    };

    fetchChapters();
  }, [bookId]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filtered = data.filter((chapter) =>
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(0);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return sortOrder === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
    });

    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  // Conditional styles based on theme
  const containerStyles = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
  const inputStyles = theme === 'dark' ? 'bg-gray-700 border-gray-500 text-white' : 'bg-white border-gray-300 text-black';
  const tableStyles = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const headerStyles = theme === 'dark' ? 'text-[#c2a970]' : 'text-black';
  const dateBgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-[#eff3f8]'; // Subtle difference for date bg color in dark mode
  const borderBottomStyles = theme === 'dark' ? 'border-gray-600' : 'border-gray-300'; // Lighter bottom border in dark mode
  const lineSeparatorStyles = theme === 'dark' ? 'border-gray-600' : 'border-gray-300'; // Line between chapter names

  return (
    <div className={`p-6 mb-6 ${containerStyles}`}>
      {/* Table of Contents Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-[16px] font-bold flex items-center ${headerStyles}`}>
          <FaBook className="mr-2" /> TABLE OF CONTENTS
        </h2>
        <div className="text-white bg-gray-400 p-1 text-sm">
          {data.length} Chapters
        </div>
      </div>

      {/* Search and Entries Selector */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-center mb-4">
        <div>
          <select
            className={`border rounded-md p-2 ${inputStyles}`}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="10">10 entries per page</option>
            <option value="25">25 entries per page</option>
            <option value="50">50 entries per page</option>
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            className={`border rounded-md p-2 pl-10 ${inputStyles}`}
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Chapters Table */}
      <div className="overflow-x-auto text-[14px]">
        <table className={`min-w-full border-collapse ${tableStyles}`}>
          <thead>
            <tr>
              <th className={`p-2 text-left ${borderBottomStyles}`}>Chapter Name</th>
              <th
                className={`p-2 text-right cursor-pointer ${borderBottomStyles}`}
                onClick={handleSort}
              >
                Release Date <FaSort className="inline" />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((chapter, index) => (
              <tr key={index} className={`border-b ${lineSeparatorStyles} hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <td className={`p-2 text-[#337ab7] hover:underline ${lineSeparatorStyles}`}>
                  <Link
                    to={`/fiction/${bookId}/${bookTitle}/chapter/${chapter._id}/${chapter.title}`}
                  >
                    {chapter.title}
                  </Link>
                </td>
                <td className={`p-2 text-right text-[#337ab7] ${dateBgColor} ${lineSeparatorStyles}`}>
                  {chapter.createdAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          breakClassName={"page-item"}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"inline-flex list-none pagination"}
          pageClassName={"inline mx-1"}
          pageLinkClassName={
            `px-3 py-1 rounded hover:bg-[#337ab7] hover:text-white text-white`
          }
          previousClassName={"inline mx-1"}
          previousLinkClassName={
            "px-3 py-1 rounded hover:bg-[#337ab7] hover:text-white"
          }
          nextClassName={"inline mx-1"}
          nextLinkClassName={
            "px-3 py-1 rounded hover:bg-[#337ab7] hover:text-white"
          }
          activeClassName={"rounded mt-[-3px] py-[3px] bg-[#337ab7] text-white"}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default Chapters;