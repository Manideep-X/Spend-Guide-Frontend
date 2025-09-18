import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid"
import EmptyListFiller from "./components/EmptyListFiller"
import FilterForm from "./components/FilterForm"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { filterLatestTransactions } from "../../services/FilterService";
import toast from "react-hot-toast";
import FilterList from "./components/FilterList";

const Filter = () => {

  const [filterFields, setFilterFields] = useState({
    type: "expense",
    sortingParameter: "date",
    sortingOrder: "asc"
  });
  const [transactions, setTransactions] = useState([]);
  const [onlyType, setOnlyType] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [emptyMsg, setEmptyMsg] = useState("");
  const navigate = useNavigate();

  // Handle changes in the input form fields
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFilterFields(prevFilterFields => ({
      ...prevFilterFields,
      [name]: value
    }))
  }

  // Uses the filter fields to fetch incomes/expenses from DB
  const filterTransactions = async () => {

    setIsFiltering(true);
    setOnlyType(filterFields?.type);
    
    // Fetching the datails
    try {
      let response = {};

      if (Object.keys(filterFields).length !== 0)
        response = await filterLatestTransactions(filterFields);

      if (Object.keys(response).length !== 0) {
        setTransactions(response);
      } else {
        setEmptyMsg("No details found");
      }

      // If any error is caught then display that in toaster and/or redirect
    } catch (error) {
      setOnlyType(null);

      console.error(error);
      if (error.message) toast.error(error.message);
      if (error.redirect) navigate(error.redirect);

    } finally {
      setIsFiltering(false);
    }

  }

  const handleSubmit = (e) => {

    e.preventDefault();

    filterTransactions();

  }

  return (

    <section className="md:px-5 md:py-0 w-full h-screen overflow-hidden pt-20 md:pt-3">
      
      {/* Title with heading and icon */}
      <section className="flex w-full justify-between px-6 md:py-5 py-3">

        {/* Heading with icon */}
        <div className="flex items-center gap-3 md:gap-4">
          <AdjustmentsHorizontalIcon className="w-7 h-7 stroke-[2.5] text-[#423e36]" />
          <header className="text-2xl font-bold text-[#423e36]">
            Filter & Search
          </header>
        </div>

      </section>

      {/* Section after heading for form and list display */}
      <section className="relative flex flex-col w-full md:h-[88%] h-11/12 rounded-2xl text-[#423e36] bg-white/50 overflow-hidden">

        {/* This will display the filter form */}
        <FilterForm 
          handleSubmit={handleSubmit} 
          isFiltering={isFiltering} 
          handleOnChange={handleOnChange}
          filterFields={filterFields}
        />

        {/* The main list section after filtering, if empty then it shows the filler component */}
        {
          transactions.length === 0
          ?
            <EmptyListFiller emptyMsg={emptyMsg} />
          :
            <div className="flex overflow-y-auto thin-scrollbar">
              <FilterList 
                transactions={transactions}
                type={onlyType} 
                filterTransactions={filterTransactions}
              />
            </div>
        }

      </section>

    </section>
  )
}

export default Filter