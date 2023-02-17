import React from 'react';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { useState } from 'react';
import { supabase } from '../client'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';

{/*const { data, error } = await supabase.auth.signUp({
    email: 'example@email.com',
    password: 'example-password',
  })
*/}
export default function Login() {
    const loginForm = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: isEmail('Invalid Email'),
            password: hasLength({ min: 8 }, 'Password must be atleast 8 characters'),
        },
    });

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={loginForm.onSubmit(console.log)}>
                <TextInput mt="sm" label="Email" placeholder="Enter your email" {...loginForm.getInputProps('email')} />
                <PasswordInput label="Password" placeholder="Password" {...loginForm.getInputProps('password')} />
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
