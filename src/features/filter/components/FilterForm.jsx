import { ArrowPathIcon, MagnifyingGlassIcon, MinusCircleIcon, PlusCircleIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { FunnelIcon as FunnelIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

const FilterForm = ({ handleSubmit, isFiltering, handleOnChange, filterFields }) => {

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="px-5 w-full h-auto bg-white/50">

        {/* Form for filtering */}
        <form onSubmit={(e) => handleSubmit(e)} method="post" className="flex flex-col gap-4">

            {/* Collapsible form fields */}
            <div 
                className={`flex items-center sm:justify-around justify-center-safe w-full flex-wrap
                ${isFilterOpen ? 'h-auto mt-4' : 'h-0 mt-0'} overflow-hidden transition-all`}
            >
                {/* Drop down to select type */}
                <div className={`flex flex-col ${isFilterOpen ? 'lg:w-[18%] md:w-50' : 'lg:w-[15%] md:w-50'} transition-all `}>
                    <label 
                    className="text-sm" htmlFor="type">Type</label>
                    <select 
                        className="px-5 py-2 border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"
                        name="type" 
                        id="type"
                        value={filterFields?.type || "expense"}
                        onChange={e => handleOnChange(e)}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                {/* Sort by field */}
                <div className={`flex flex-col ${isFilterOpen ? 'lg:w-[18%] md:w-50' : 'lg:w-[15%] md:w-50'} transition-all `}>
                    <label 
                    className="text-sm" htmlFor="sortingParameter">Sort By</label>
                    <select 
                        className="px-5 py-2 w-full border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"
                        name="sortingParameter" 
                        id="sortingParameter"
                        value={filterFields?.sortingParameter || "date"}
                        onChange={e => handleOnChange(e)}
                    >
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>

                {/* Sorting order */}
                <div className={`flex flex-col ${isFilterOpen ? 'lg:w-[18%] md:w-50' : 'lg:w-[15%] md:w-50'} transition-all `}>
                    <label 
                    className="text-sm" htmlFor="sortingOrder">Sorting Order</label>
                    <select 
                        className="px-5 py-2 w-full border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"
                        name="sortingOrder" 
                        id="sortingOrder"
                        value={filterFields?.sortingOrder || "asc"}
                        onChange={e => handleOnChange(e)}
                    >
                        <option value="desc">Decending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>

                {/* Starting date */}
                <div className={`flex flex-col ${isFilterOpen ? 'lg:w-[18%] md:w-50' : 'lg:w-[15%] md:w-50'} transition-all `}>
                    <label 
                    className="text-sm" htmlFor="startDate">Starting Date</label>
                    <input 
                        className="px-5 py-2 w-full border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"
                        type="date" 
                        name="startDate" 
                        id="startDate" 
                        min="2000-01-01"
                        max={filterFields?.endDate || new Date().toISOString().split('T')[0]} 
                        value={filterFields?.startDate || ""}
                        onChange={e => handleOnChange(e)}
                    />
                </div>

                {/* Ending date */}
                <div className={`flex flex-col ${isFilterOpen ? 'lg:w-[18%] md:w-50' : 'lg:w-[15%] md:w-50'} transition-all `}>
                    <label 
                    className="text-sm" htmlFor="endDate">Ending Date</label>
                    <input 
                        className="px-5 py-2 w-full border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"
                        type="date" 
                        name="endDate" 
                        id="endDate" 
                        min={filterFields?.startDate || "2000-01-01"}
                        max={new Date().toISOString().split('T')[0]} 
                        value={filterFields?.endDate || ""}
                        onChange={e => handleOnChange(e)}
                    />
                </div>

            </div>

            {/* Filter toggle, search field and Search button */}
            <div className="w-full mb-4 flex gap-1 justify-between">
                <button 
                    type="button"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="rounded-lg sm:shadow-lg/30 shadow-lg/20 flex mx-auto px-6 py-2
                      bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e] text-white hover:cursor-pointer"
                >
                    {
                        isFilterOpen
                        ?
                            <span className="flex items-center justify-center gap-2">
                                <FunnelIconSolid className="block sm:hidden w-6" />
                                <MinusCircleIcon className="sm:block hidden w-6" />
                                <p className="sm:block hidden">
                                    See less filters
                                </p>
                            </span>
                        :
                            <span className="flex items-center justify-center gap-2">
                                <FunnelIcon className="block sm:hidden w-6" />
                                <PlusCircleIcon className="sm:block hidden w-6" />
                                <p className="sm:block hidden">
                                    See more filters
                                </p>
                            </span>
                    }
                </button>
                <input 
                    className="px-5 w-1/2 border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"
                    type="text" 
                    name="keyword" 
                    id="keyword" 
                    placeholder="&#x1F50D; Search any keyword"
                    value={filterFields?.keyword || ""}
                    onChange={e => handleOnChange(e)}
                />
                <button type="submit"
                    disabled={isFiltering}
                    className="rounded-lg sm:shadow-lg/30 shadow-lg/20 flex mx-auto px-6 py-2
                    bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                    text-white hover:cursor-pointer disabled:text-white/60 disabled:cursor-not-allowed disabled:bg-[#1d722e]"
                >
                    {
                        isFiltering 
                        ?
                            <span className="flex items-center justify-center gap-2">
                                <ArrowPathIcon className="block w-6 animate-spin" />
                                <p className="sm:block hidden">
                                    Searching...
                                </p>
                            </span>
                        :
                            <span className="flex items-center justify-center gap-2">
                                <MagnifyingGlassIcon className="block w-6" />
                                <p className="sm:block hidden">
                                    Search
                                </p>
                            </span>
                    }
                </button>
            </div>

        </form>
    </section>
  )
}

export default FilterForm