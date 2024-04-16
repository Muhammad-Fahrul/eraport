import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../../app/api/apiSlice';

const STUDENT_URL = '/api/students';

const studentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.poin < b.poin ? 1 : -1),
});

const initialState = studentsAdapter.getInitialState();

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: `${STUDENT_URL}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedStudents = responseData.students.map((student) => {
          student.id = student._id;
          return student;
        });
        return studentsAdapter.setAll(initialState, loadedStudents);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'Student', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Student', id })),
          ];
        } else return [{ type: 'Student', id: 'LIST' }];
      },
    }),
    addNewStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: `${STUDENT_URL}`,
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Student', id: arg.id },
      ],
    }),
  }),
});

export const {
  useAddNewStudentMutation,
  useDeleteStudentMutation,
  useGetStudentsQuery,
} = studentApiSlice;

// export const selectStudentsResult =
//   studentApiSlice.endpoints.getStudents.select();

// const selectStudentsData = createSelector(
//   selectStudentsResult,
//   (studentResult) => studentResult.data
// );

// export const {
//   selectAll: selectAllStudent,
//   selectById: selectStudentById,
//   selectIds: selectStudentIds,
// } = studentsAdapter.getSelectors(
//   (state) => selectStudentsData(state) ?? initialState
// );
