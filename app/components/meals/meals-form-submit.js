'use client'
import { useFormStatus } from 'react-dom'

export default function MealsFormSubmit() {
    const { pending } = useFormStatus()
    console.log(pending)
    return (
        <button disabled={pending}>{pending ? "submiting...." : "Share Meal"}</button>
    )
}
