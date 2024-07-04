// import React from 'react'
import { useForm } from 'react-hook-form'
import { useCreateBookMutation } from '../features/books/booksAPI'
import { Toaster, toast } from 'sonner'

type FormValues = {
    author: string,
    title: string,
    year: number
}

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [createBook, { isLoading }] = useCreateBookMutation();

    const onSubmit = async (data: FormValues) => {
        data.year = parseInt(data.year as unknown as string, 10);
        try {
            console.log('Submitting data:', data);
            const result = await createBook(data);
            console.log('Result:', result);
            if (result) {
                toast.success(`Book created successfully`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to create book');
        }
    }

    return (
        <>
            <Toaster toastOptions={{
                classNames: {
                    error: 'bg-red-400',
                    success: 'text-green-400',
                    warning: 'text-yellow-400',
                    info: 'bg-blue-400',
                },
            }} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Add a Book</h1>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Author</span>
                    </div>
                    <input {...register('author', { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                {errors.author && <span className="text-red-600">Author is required</span>}

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Title</span>
                    </div>
                    <input {...register('title', { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                {errors.title && <span className="text-red-600">Title is required</span>}

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Year</span>
                    </div>
                    <input {...register('year', { required: true, valueAsNumber: true })} type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                {errors.year && <span className="text-red-600">Year is required</span>}
                <button type='submit' className='btn btn-outline btn-info w-full max-w-xs mt-5 mr-60 mb-20'>
                    {isLoading ? "Loading" : "Submit book"}
                </button>
            </form>
        </>
    )
}

export default Form
