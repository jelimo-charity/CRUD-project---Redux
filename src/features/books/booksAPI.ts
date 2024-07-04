// import { TBook } from './../../utils/Types';
import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//create books api
export interface TBook {
    id: number,
    title: string,
    author: string,
    year: number
}
export const booksAPI = createApi({
    reducerPath: 'booksAPI',
    baseQuery:  fetchBaseQuery({baseUrl: 'http://localhost:8090' }),
    tagTypes: ['Book'], //define tag types
    endpoints: (builder) => ({
        getBooks: builder.query<TBook[], void>({ query: () => 'books',
            providesTags:  [{ type: 'Book', id: 'LIST'}],
        }),
        createBook: builder.mutation <TBook, Partial<TBook>>({
            query: (newBook) => ({
                url: 'books',  
                method: 'POST',
                body: newBook,
                providesTags: ['createBook']
            }),
            invalidatesTags:  [{ type: 'Book', id: 'LIST'}],
        }),
        updateBook: builder.mutation  <TBook, Partial<TBook>>({
            query: ({id, ...rest}) => ({
                url: `books/${id}`,
                method: 'PUT',
                body: rest,
                providesTags: ['updateBook']
            }),
            invalidatesTags: [{ type: 'Book', id: 'LIST'}]

        }),
        deleteBook: builder.mutation<{success: boolean; id: number}, number>({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE',
                providesTags: ['deleteBook']
            }),
            invalidatesTags: [{ type: 'Book', id: 'LIST'}]

        })
    })
})
export const { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksAPI;