import React, { useState, useEffect } from "react";
import axios from "axios";
import FarmerCardsFarmersPage from "./FarmerCardsFarmersPage";

const VendorsList = () => {
  const [farmers, setFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const farmersPerPage = 10;
  const [sortBy, setSortBy] = useState('latest');

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };


  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/farmers");
        const farmersData = response.data.farmers || [];
        setFarmers(farmersData);
      } catch (err) {
        console.error("Failed to fetch farmers:", err);
      }
    };
    fetchFarmers();
  }, []);

  // Only filter if there's a search term
  const filteredFarmers = searchTerm.trim()
    ? farmers.filter((farmer) =>
        farmer.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : farmers;

  const indexOfLastFarmer = currentPage * farmersPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
  const dateA = new Date(a.created_at || a.date || a.id);
  const dateB = new Date(b.created_at || b.date || b.id);
  return sortBy === '1' || sortBy === 'latest' ? dateB - dateA : dateA - dateB;
  });
  const currentFarmers = sortedFarmers.slice(indexOfFirstFarmer, indexOfLastFarmer);

  const totalPages = Math.ceil(filteredFarmers.length / farmersPerPage);

  return (
    <section className="vendors-list py-80">
      <div className="container container-lg">
        <div className="flex-between flex-wrap gap-8 mb-40">
          <span className="text-neutral-600 fw-medium px-40 py-12 rounded-pill border border-neutral-100">
            Showing {indexOfFirstFarmer + 1}-
            {Math.min(indexOfLastFarmer, filteredFarmers.length)} of{" "}
            {filteredFarmers.length} results
          </span>
          <div className="flex-align gap-16">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="search-form__wrapper position-relative d-block"
            >
              <input
                type="text"
                className="search-form__input common-input py-13 ps-16 pe-18 rounded-pill pe-44"
                placeholder="Search farmers by name or ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset to page 1 on new search
                }}
              />
              <button
                type="submit"
                className="w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
              >
                <i className="ph ph-magnifying-glass" />
              </button>
            </form>
            <div className="flex-align gap-8">
              <span className="text-gray-900 flex-shrink-0">Sort by:</span>
              <select
                className="common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium"
                defaultValue="Old"
                value={sortBy} onChange={handleSortChange}
              >
                <option value="Latest">Latest</option>
                <option value="Old">Old</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row gy-4 vendor-card-wrapper">
          {currentFarmers.map((farmer) => (
            <FarmerCardsFarmersPage key={farmer.id} farmer={farmer} />
          ))}
        </div>

        <ul className="pagination flex-center flex-wrap gap-16 mt-40">
          <li className="page-item">
            <button
              className="page-link h-64 w-64 flex-center text-xxl rounded-circle fw-medium text-neutral-600 border border-gray-100"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <i className="ph-bold ph-arrow-left" />
            </button>
          </li>

          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button
                className="page-link h-64 w-64 flex-center text-md rounded-circle fw-medium text-neutral-600 border border-gray-100"
                onClick={() => setCurrentPage(i + 1)}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              className="page-link h-64 w-64 flex-center text-xxl rounded-circle fw-medium text-neutral-600 border border-gray-100"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <i className="ph-bold ph-arrow-right" />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default VendorsList;
