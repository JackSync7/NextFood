"use client"
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from 'next/image'

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState()
    const imageInput = useRef()
    const handleClick = () => {
        imageInput.current.click()
    }

    const handleImageChanges = (e) => {
        const file = e.target.files[0]
        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }
    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage ? <p>no image picked yet</p> : <Image src={pickedImage} alt="the image selected by usser." fill />}
                </div>
                <input
                    className={classes.input}
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChanges}
                    required
                />
                <button className={classes.button} type="button" onClick={handleClick}>
                    Pick an Image
                </button>

            </div>
        </div>
    );
}
