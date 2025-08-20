import { baseApi } from "@/redux/baseApi";
import type { IDivision, IResponse } from "@/types";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDivision: builder.query({
      query: () => ({
        url: "/division",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Division"],
    }),

    addDivision: builder.mutation<IResponse<IDivision>, FormData>({
      query: (division) => ({
        url: "/division/create",
        method: "POST",
        data: division,
      }),
      invalidatesTags: ["Division"],
    }),
    removeDivision: builder.mutation<IResponse<null>, string>({
      query: (divisionId) => ({
        url: `/division/${divisionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Division"],
    }),
  }),
});

export const { useGetAllDivisionQuery, useAddDivisionMutation, useRemoveDivisionMutation } = divisionApi;
