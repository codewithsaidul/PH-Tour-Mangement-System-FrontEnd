import { baseApi } from "@/redux/baseApi";
import type { IDivision, IResponse } from "@/types";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation<IResponse<IDivision>, FormData>({
      query: (division) => ({
        url: "/division/create",
        method: "POST",
        data: division,
      }),
      invalidatesTags: ["Division"],
    }),
    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Tour Type"],
    }),
  }),
});

export const { useAddDivisionMutation } = divisionApi;
