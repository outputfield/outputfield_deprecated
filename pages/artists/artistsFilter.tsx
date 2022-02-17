import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Overlay from "../../components/overlay";
import Checkbox from "../../components/checkbox";
import { Button } from "../../components/button/button.component";

export default function ArtistsFilter({ onClose, filters: mediums }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const [filters, setFilters] = useState(null);
  const filtersCount = useMemo(() => {
    if (filters && Object.values(filters).some((f) => f === true)) {
      return Object.values(filters).filter((f) => f === true).length;
    } else {
      return 0;
    }
  }, [filters]);

  useEffect(() => {
    const defaultFilters = {};
    console.log(mediums);
    mediums.forEach(({ medium }) => {
      defaultFilters[medium] = false;
    });
    console.log(defaultFilters);
    setFilters(defaultFilters);
  }, [mediums]);

  const onSubmit = (data) => {
    // console.log(data);
    console.log(filters);
    // TODO: submit filters here
    onClose();
  };

  const onCheckChange = (name, value) => {

    const _filters = { ...filters };
    _filters[name] = value;
    setFilters(_filters);
  };

  const clearFilters = () => {
    const _filters = { ...filters };
    Object.keys(_filters).forEach((k) => (_filters[k] = false));
    setFilters(_filters);
  };

  return (
    <Overlay>
      <div className="mt-0 sm:mt-0 sm:ml-4 flex justify-between border-b border-black pb-3">
        <button
          className="underline uppercase leading-6 font-medium text-gray-900"
          type="reset"
          // onClick={() => reset()}
          onClick={clearFilters}>
          Clear Filters
        </button>
        <button onClick={onClose}>x</button>
      </div>
      <div className="my-5">
        <form>
          {mediums.map(({ medium, i }) => {
            const n = `filters[${medium}]`;
            // const { ref, onChange } = register(n);
            return (
              <Checkbox
                key={medium}
                // name={n}
                name={medium}
                label={medium}
                value={filters ? filters[medium] : false}
                onChange={onCheckChange}
                // onChange={onChange}
                // ref={ref}
                // ref={register(n)}
                // {...register(n)}
              />
            );
          })}
          <Button
            onClick={handleSubmit(onSubmit)}
            role="submit"
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 outline-none shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Filter {Boolean(filtersCount) ? `(${filtersCount})` : ""}
          </Button>
        </form>
      </div>
    </Overlay>
  );
}
