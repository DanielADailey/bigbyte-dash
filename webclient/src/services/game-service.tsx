import axios from "axios";
import React from "react";

const API_STRING = "http://localhost:3001/"
const GAMES_ENDPOINT = "games" 

export interface Game {
    title: string
    description:string
}

interface GameServiceContextType {
    add: (game:Game) => void
    get: (uid:string) => Game
}

export const GameProviderContext = React.createContext<GameServiceContextType>(null!)

export function GameServiceProvider({children}: {children: React.ReactNode;}) {
    let add = (game:Game) => {
        return gameProviderService.add(game)
    }
    let get = (uid:string) : Game => {
        return gameProviderService.get(uid)
    }
    let values = {add, get}
    return(<GameProviderContext.Provider value={values}>{children}</GameProviderContext.Provider>)
}

export const gameProviderService = {
    add(game:Game){
        axios.post(API_STRING+GAMES_ENDPOINT).then(res => {
            console.log(res)
        }).catch(err => {

        })
    },
    get(uid:string) : Game{
        return {title:"", description:""}
    }
}