import React from 'react';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { supabase } from '../client'
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Login() {
    const [error, setError] = React.useState(null);
    const router = useRouter();

    const loginForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: isEmail('Invalid Email'),
            password: hasLength({ min: 7 }, 'Password must be atleast 7 characters'),
        },
    });

    const signInWithEmail = async () => {
        const { email, password } = loginForm.values;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
        }

        if (data) {
            setError(null);
            console.log(error);
            loginForm.reset();
            router.push("/");
            console.log(data.message);
        }
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={loginForm.onSubmit(signInWithEmail)}>
                <img style={{ width: 220, height: 200 }} src={"./images/aston_logo.png"} />
                <TextInput mt="sm" label="Email" placeholder="Enter email" {...loginForm.getInputProps('email')} />
                <PasswordInput label="Password" placeholder="Password" {...loginForm.getInputProps('password')} />
                {error && <p style={{color: "red"}}>{error}</p>}
                <Link href={'/register'}>Forgot Password?</Link>
                <Group position='right' mt="md">
                    <Link href={'/register'}>Sign Up</Link>
                </Group>
                <Group position="center" mt="md">
                    <Button type="submit" fullWidth variant="outline">Login</Button>
                </Group>
            </form>
        </Box>
    )

}
