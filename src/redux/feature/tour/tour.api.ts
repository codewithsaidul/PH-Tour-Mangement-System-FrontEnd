import { baseApi } from "@/redux/baseApi";
import type { IAddTourType, IResponse, ITour, ITourType } from "@/types";





export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTour: builder.mutation<IResponse<ITour>, FormData>({
            query: (tourData) => ({
                url: "/tour/create",
                method: "POST",
                data: tourData
            }),
            invalidatesTags: ["Tour"]
        }),
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



export const { useAddTourMutation, useAddTourTypeMutation, useGetTourTypesQuery, useRemoveTourTypesMutation } = tourApi