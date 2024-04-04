import { apiSlice } from '../../../app/api/apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getUser: builder.query({
      query: (username) => `${USERS_URL}/${username}`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    // getRaport: builder.query({
    //   query: ({ studentId }) => `${USERS_URL}/raports/${studentId}`,
    //   providesTags: (result, error, arg) => [
    //     { type: 'Raport', id: arg.studentId },
    //     ...result.map((raport) => ({ type: 'Raport', id: raport._id })),
    //   ],
    // }),
    // getTopStudents: builder.query({
    //   query: () => ({
    //     url: `${USERS_URL}/rank`,
    //     method: 'GET',
    //   }),
    //   providesTags: ['Raport'],
    // }),
    // getAudioRaport: builder.query({
    //   query: ({ chap }) => `https://equran.id/api/v2/surat/${chap}`,
    //   transformResponse: (response, meta, arg) => {
    //     return response.data.ayat[arg.ver - 1].audio['05'];
    //   },
    // }),
  }),
});

export const { useRegisterMutation, useGetUserQuery, useUpdateUserMutation } =
  userApiSlice;
