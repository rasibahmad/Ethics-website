import React from 'react';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { useState } from 'react';
import { supabase } from '../client'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';

export default function Login() {
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

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: '',
            password: '',
        })
        console.log(loginForm.values)
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto" >
            <form onSubmit={loginForm.onSubmit(signInWithEmail)}>
                <img style={{ width: 220, height: 200 }} src={"./images/aston_logo.png"} />
                <TextInput mt="sm" label="Email" placeholder="Enter email" value={loginForm.email}
                    {...loginForm.getInputProps('email')} />
                <PasswordInput label="Password" placeholder="Password" value={loginForm.password}
                    {...loginForm.getInputProps('password')} />
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
