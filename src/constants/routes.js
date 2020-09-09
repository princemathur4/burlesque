import Home from '../components/home';
import Game from '../components/game';


export const routes = [
    {
        path: "/",
        component: Home,
        name: "mainPage",
        customProps: {
            name: "mainPage",
        }
    },
    {
        path: "/game",
        component: Game,
        name: "game",
        customProps: {
            name: "game",
        }
    },
]