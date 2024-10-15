import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CgSelect } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../Data/FilterData";

function Filters(props) {
  const {
    categories,
    category,
    setCategory,
    language,
    setLanguage,
    year,
    setYear,
    times,
    setTimes,
    rates,
    setRates,
  } = props?.data;
  const Filter = [
    {
      value: category,
      onchange: setCategory,
      items:
        categories?.length > 0
          ? [{ title: "All Categories" }, ...categories]
          : [
              {
                title: "No Categories Found",
              },
            ],
    },
    {
      value: language,
      onchange: setLanguage,
      items: LanguageData,
    },
    {
      value: year,
      onchange: setYear,
      items: YearData,
    },
    {
      value: times,
      onchange: setTimes,
      items: TimesData,
    },
    {
      value: rates,
      onchange: setRates,
      items: RatesData,
    },
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6 ">
      {Filter.map((items, index) => (
        <Listbox key={index} value={items.value} onChange={items.onchange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs ">
              <span className="block truncate">{items.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <CgSelect className="h-5 w-5" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1  w-full bg-white border border-r-gray-800 text-dryGray rounded-md shadow-lg max-h-60 ring-opacity-5 overflow-auto focus:outline-none sm:text-sm  ">
                {items.items.map((iterm, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={iterm}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {iterm.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <FaCheck className="h-3 w-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
}

export default Filters;
