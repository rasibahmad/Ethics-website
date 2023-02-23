import React from "react";
import { supabase } from './client'
import { useRouter } from 'next/router'

function Navbar() {
    const router = useRouter();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            setError(error.message);
        }
    }

    return (
        <ul>
            <li>
                <a href="/">
                    <img style={{ width: 150, height: 130 }} src={"./images/aston_logo.png"} />
                </a>
            </li>
            <li>
                <a href="/">
                    Home
                </a>
            </li>
            <li>
                <a href="/applications">
                    Applications
                </a>
            </li>
            <li>
                <a>
                    <button onClick={signOut}>Sign out</button>
                </a>
            </li>
        </ul>
    )
}

export default Navbar; 