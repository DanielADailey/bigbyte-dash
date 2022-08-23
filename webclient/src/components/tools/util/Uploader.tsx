import React, { useState } from "react";
import { Button } from "@mui/material";

export default function Uploader() {
    const [image, setImage] = useState<any>({})
    const handleUpload = (event:any) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
           setImage(reader.result)
        }
        console.log(url); // Would see a path?
    }
    return (
        <Button onClick={handleUpload}>Upload Image</Button>
    )
}