import fs from 'node:fs'
import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

const db = sql('meals.db')

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeals(meal) {
    meal.slug = slugify(meal.title, { lower: true })
    meal.instructions = xss(meal.instructions)

    const extenstion = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}.${extenstion}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer()

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error("saving image failed!")
        }
    })
    meal.image = `/images/${fileName}`

    db.prepare(`
        INSERT INTO meals 
        (title, instructions, summary, creator, creator_email, image, slug) 
        VALUES ( 
            @title,
            @instructions,
            @summary,
            @creator,
            @creator_email,
            @image,
            @slug
            )
    `).run(meal)
}