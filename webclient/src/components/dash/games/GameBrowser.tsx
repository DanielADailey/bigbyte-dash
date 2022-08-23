import { TableContainer, Table, TableCell, TableRow, TableHead, TableBody, Paper, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import { Getter } from "src/components/services/api-service";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth:'200px',
    textAlign: 'center',
    height: '200px',
    color: theme.palette.text.secondary,
}));

export default function GameBrowser() {
    const [games, setGames] = useState<any>(null)

    useEffect(() => {
        Getter("/games", (games: any): void => {
            setGames(games)
            console.log(games)
        })
    }, [])

    const handleGameClick = (id:string) => {
        console.log("Click game ID: ", id)
    }
    return (
            <Grid sx={{ flexGrow: 1, alignContent:'center',alignItems:'center',justifyContent:'center' }} container spacing={2}>
                {
                    games !== null ?
                        games.map((game: any) => (
                            <Grid item xs={2} sm={4} md={4} key={game.ID}>
                                <Item onClick={()=>{handleGameClick(game.ID)}}><Typography>{game.Title}</Typography></Item>
                            </Grid>
                        ))
                        :
                        <div></div>
                }
            </Grid>

    )
}