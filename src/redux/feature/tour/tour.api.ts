import { baseApi } from "@/redux/baseApi";
import type { IAddTourType, IResponse, ITourType } from "@/types";





export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTourType: builder.mutation<IResponse<ITourType>, IAddTourType>({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName
            }),
            invalidatesTags: ["Tour Type"]
        }),
        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"
            }),
            transformResponse: (response) => response.data,
            providesTags: ["Tour Type"]
        }),
        removeTourTypes: builder.mutation<IResponse<null>, string>({
            query: (tourTypeId) => ({
                url: `/tour/tour-types/${tourTypeId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Tour Type"]
        }),
    })
})



export const { useAddTourTypeMutation, useGetTourTypesQuery, useRemoveTourTypesMutation } = tourApi