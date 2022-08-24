import { TableContainer, Table, TableCell, TableRow, TableHead, TableBody, Paper, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import { Getter } from "../../../services/api-service";
import { useNavigate } from "react-router";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '200px',
    color: theme.palette.text.secondary,
}));

export default function GameBrowser() {
    const [games, setGames] = useState<any>(null)

    const nav = useNavigate()

    useEffect(() => {
        Getter("/games", (games: any): void => {
            setGames(games)
            console.log(games)
        })
    }, [])

    const handleGameClick = (id: string) => {
        console.log("Click game ID: ", id)
        nav("games/view/"+id, {replace:false})
    }
    return (
        <Grid sx={{ flexGrow: 1, p:5 }}
            direction="row"
            alignItems="center"
            justifyContent="center"
            container spacing={2}>
            {
                games !== null ?
                    games.map((game: any) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={game.ID} >
                            <Item onClick={() => { handleGameClick(game.ID) }}><Typography>{game.Title}</Typography></Item>
                        </Grid>
                    ))
                    :
                    <div></div>
            }
        </Grid>

    )
}