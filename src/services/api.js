import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL, // url API stockée dans le fichier .env
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: '/user/login', method: 'POST', body }),
    }),
    getUserProfile: builder.query({
      query: () => ({ url: '/user/profile', method: 'GET' }),
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({ url: '/user/profile', method: 'PUT', body }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = api
