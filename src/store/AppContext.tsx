import React from "react";
import auth from 'firebase';

export interface AppContextInterface {
    isLoggedIn: boolean | null,
    user: auth.User | null
}

export const AppContext = React.createContext<AppContextInterface | null>(null);