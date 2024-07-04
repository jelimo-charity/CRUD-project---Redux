// import React from 'react'
import { toast } from "sonner"
import { useGetBooksQuery, useDeleteBookMutation, useUpdateBookMutation, TBook } from "./booksAPI"

const Books = () => {
    const {data: booksData, error, isLoading, isError} = useGetBooksQuery()
    const [deleteBook] = useDeleteBookMutation()
    const [updateBook] = useUpdateBookMutation()

    const handleDelete = async( id: number) => {
        await deleteBook(id)
        toast.success(`deleted`)
    }
    const handleUpdate = async (id: number, updatedData: Partial<TBook>) => {
        try {
            await updateBook({ id, ...updatedData })
            toast.success(`Book ${id} updated successfully`)
            refetch() // Optionally, refresh the book list after update
        } catch (error) {
            toast.error(`Failed to update book ${id}: ${error.message}`)
        }
    }
    
  return (
    <>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Id</th>
        <th>Author</th>
        <th>Title</th>
        <th>Year</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      {
        isLoading ? ( <tr><td>Loading...</td></tr>) : (
            isError ? (
                error && (
                    <tr><td>No Data</td></tr>
    
                )
            ) : (
                booksData && booksData.map((book, index) => (
                    <tr key={index}>
                    <th>{book.id}</th>
                    <th>{book.author}</th>
                    <td>{book.title}</td>
                    <td>{book.year}</td>
                    <td className="flex gap-2">
                        <button onClick={()=> handleUpdate(book.id, { author: 'Updated Author', title: 'Updated Title', year: 2025 })}>edit</button>
                        <button onClick={ () => handleDelete(book.id)}>delete</button>
                    </td>
                  </tr>
                      
                ))
            )
        ) 
      }
     
     
    </tbody>
  </table>
</div>
    </>
  )
}

export default Books
