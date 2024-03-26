import { apiSlice } from '../../../app/api/apiSlice';

const RAPORT_URL = '/api/raports';

export const raportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRaportsByUsername: builder.query({
      query: (username) => ({
        url: `${RAPORT_URL}/${username}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: [{ type: 'Raport', id: 'LIST' }],
    }),
    addNewRaport: builder.mutation({
      query: (data) => ({
        url: `${RAPORT_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Raport', id: 'LIST' }],
    }),
    deleteRaport: builder.mutation({
      query: ({ id }) => ({
        url: `${RAPORT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Raport', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddNewRaportMutation,
  useGetRaportsByUsernameQuery,
  useDeleteRaportMutation,
} = raportApiSlice;
