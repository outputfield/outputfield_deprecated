import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

import prisma from "../../lib/prisma";
import { ArtistRow } from "../../components/artists/artistRow.component";
import Link from "next/link";
import { convertDataToArtists } from "../../lib/misc";
import { useForm } from "react-hook-form";

const ArtistListPage = ({ artists }) => {
  const { register, handleSubmit, reset } = useForm(); // For filter checkboxes
  const [filterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);
    // TODO: submit filters here
    setFilterOpen(false);
  };

  return (
    <div>
      <div>
        <div>
          <input
            placeholder="search"
            className={`focus:border-blue-500 peer`}
          />
          {/* FIXME: on search focus, blur bg */}
          <div
            class="hidden peer-within-focus:visible fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity w-10 h-10 blurred border border-red-500"
            aria-hidden="true"
          >bg</div>

          <button
            onClick={() => setFilterOpen(true)}
            className="uppercase mx-auto">
            filter
          </button>
          <div>
            {artists.length + " result" + (artists.length == 1 ? "" : "s")}
          </div>
        </div>
        <div>
          {artists.map((e, i) => {
            return (
              <ArtistRow
                key={e.handle}
                artist={e}
                onClick={() => {
                  router.push("/artists/" + e.handle);
                }}
                type="list"
              />
            );
          })}
        </div>
      </div>

      {/* TODO: separate out the Filter Modal component */}
      {filterOpen && (
        <div
          class="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"></div>

            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true">
              &#8203;
            </span>

            {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 sm:mt-0 sm:ml-4 flex-row">
                    <button
                      class="underline leading-6 font-medium text-gray-900"
                      id="modal-title"
                      type="reset"
                      onClick={() => reset()}>
                      Clear Filters
                    </button>
                    <button onClick={() => setFilterOpen(false)}>x</button>
                  </div>
                  <div>
                    <form class="mt-2">
                      {["filter 1", "filter 2", "filter 3"].map((f) => (
                        <div key={f}>
                          <input
                            class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            type="checkbox"
                            value=""
                            id={f}
                            {...register(`filters.[${f}]`)}
                          />
                          <label
                            class="form-check-label inline-block text-gray-800"
                            for={f}>
                            {f}
                          </label>
                        </div>
                      ))}
                      <button
                        onClick={handleSubmit(onSubmit)}
                        role="submit"
                        type="button"
                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Filter
                        {/*TODO: add filter count here  */}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const res = await prisma.artist.findMany({
    include: {
      work: true,
      links: true,
    },
  });
  const artists = JSON.parse(JSON.stringify(res));
  return {
    props: {
      artists,
    },
  };
}

export default ArtistListPage;
