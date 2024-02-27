"use client"

export default function Error({ error }) {
    console.log(error);
    return (
        <main className='error'>
            <h1>An Error Occured!....</h1>
            <p>Failed to fatch meals data, please try again leter.</p>
        </main>
    )
}
