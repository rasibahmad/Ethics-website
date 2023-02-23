import { TextInput } from "@mantine/core";
import React, { useState } from "react";

function reset(){
    const[email, setEmail] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const {error} = await supabase.auth.api.resetPasswordForEmail(email);
        }
        catch(error){
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <TextInput mt="sm" label="Email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default reset;