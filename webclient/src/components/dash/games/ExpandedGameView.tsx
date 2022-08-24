import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { Getter } from "../../../services/api-service";

export default function ExpandedGameView(props:any){
    const [loading, setLoading] = useState<boolean>(true)
    const [game, setGame] = useState<any>({})
    useEffect(()=>{
        var id = window.location.href.split("/").pop()
        Getter("/games/"+id, (data:any)=>{
            setLoading(false)
            setGame(data)
        })
    },[])
    return(
        <div>
            {loading ? <SyncLoader color="white"/> :
            game != null ? <Typography>{game.Title}</Typography> : 
            null
            }
        </div>
    )
}