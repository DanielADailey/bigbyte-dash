import { Card, CardContent } from "@mui/material";
import React, { useContext } from "react";
import GameForm from "../../../tools/games/GameForm";

export default function AddGame(){
    return(
        <div>
            <Card>
                <CardContent>
                    <GameForm/>
                </CardContent>
            </Card>
        </div>
    )
}