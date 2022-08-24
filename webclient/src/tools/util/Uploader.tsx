import React, { useState, useRef } from "react";
import { Button } from "@mui/material";

export default function Uploader() {
    const [image, setImage] = useState<any>({})
    const inputFile = useRef<HTMLInputElement | null>(null);
    const handleUpload = (event:any) => {
        inputFile?.current?.click()
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
           setImage(reader.result)
        }
        console.log(url); // Would see a path?
    }
    return (
        <div>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
            <Button onClick={handleUpload}>Upload Image</Button>
        </div>
    )
}