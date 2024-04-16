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
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/uploadProfilePhoto`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetUserQuery,
  useUpdateUserProfileMutation,
  useUpdateUserMutation,
} = userApiSlice;
