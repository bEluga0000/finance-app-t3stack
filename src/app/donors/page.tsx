'use client';

import { useState } from "react";
import SearchInput from "~/app/_components/searchInput";
import PaginationLimitSelect from "~/app/_components/pagination/limit";
import ReactPaginationStyle from "~/app/_components/pagination/pagination";
import DonorFilterForm from "./filter";

const donorData = [
  {
    id: 1,
    date: "2024/10/01",
    name: "John Doe",
    donationType: "One-time",
    amount: "500.00",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "2024/10/03",
    name: "Jane Smith",
    donationType: "Recurring",
    amount: "1200.00",
    status: "Pending",
  },
  {
    id: 3,
    date: "2024/10/05",
    name: "Alex Johnson",
    donationType: "One-time",
    amount: "300.00",
    status: "Confirmed",
  },
  {
    id: 4,
    date: "2024/10/07",
    name: "Chris Evans",
    donationType: "Recurring",
    amount: "700.00",
    status: "Cancelled",
  },
  {
    id: 5,
    date: "2024/10/01",
    name: "John Doe",
    donationType: "One-time",
    amount: "500.00",
    status: "Confirmed",
  },
  {
    id: 6,
    date: "2024/10/03",
    name: "Jane Smith",
    donationType: "Recurring",
    amount: "1200.00",
    status: "Pending",
  },
  {
    id: 7,
    date: "2024/10/05",
    name: "Alex Johnson",
    donationType: "One-time",
    amount: "300.00",
    status: "Confirmed",
  },
  {
    id: 8,
    date: "2024/10/07",
    name: "Chris Evans",
    donationType: "Recurring",
    amount: "700.00",
    status: "Cancelled",
  },
  {
    id: 9,
    date: "2024/10/05",
    name: "Alex Johnson",
    donationType: "One-time",
    amount: "300.00",
    status: "Confirmed",
  },
  {
    id: 10,
    date: "2024/10/07",
    name: "Chris Evans",
    donationType: "Recurring",
    amount: "700.00",
    status: "Cancelled",
  }
];

const totalItems = 100; // Total number of items (for example)
const itemsPerPage = 10; // Items per page

export default function DonorReport() {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [limit, setLimit] = useState<number>(10); // Default limit
  const [currentPage, setCurrentPage] = useState(0);

  console.log(appliedFilters)
  const handlePagination = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected); // Update current page
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    console.log('Selected limit:', newLimit); // Handle limit change as needed
  };

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    console.log("Applied Filters:", filters);
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
    console.log("Filters cleared");
  };

  return (
    <div className="h-full">
      <div className="mb-6 p-2 shadow-md bg-white flex justify-center">
        <div className="container py-1">
          <DonorFilterForm onApply={handleApplyFilters} onClear={handleClearFilters} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className='shadow-md container rounded-md m-2 p-2'>

          <div className="grid grid-cols-2 mb-1">
            <div className="flex justify-start items-center space-x-2">
              <span className="font-semibold">Donor ({donorData.length})</span>
              <div className=" w-80 ">
                <SearchInput placeholder="Search Donor"
                  className="p-2"
                />
              </div>
            </div>

            <div className="flex justify-end items-center space-x-2">
              <ReactPaginationStyle
                total={totalItems}
                currentPage={currentPage}
                handlePagination={handlePagination}
                limit={itemsPerPage}
              />

              <PaginationLimitSelect
                limits={[10, 20, 50, 100]} // Define the limits you want to provide
                selectedLimit={limit}
                onLimitChange={handleLimitChange}
              />
            </div>
          </div>


          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Donor Name</th>
                <th className="px-4 py-2">Donation Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {donorData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.donationType}</td>
                  <td className="px-4 py-2">Rs. {item.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-lg text-sm ${item.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700'
                        : item.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}