'use server'

import { saveMeals } from "./meals"
import { redirect } from "next/navigation"

export const shareMeal = async (formData) => {

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }
    await saveMeals(meal)

    redirect('/meals')
}