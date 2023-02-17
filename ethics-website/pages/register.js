import React from 'react';
import { TextInput, PasswordInput, Button, Group, Box, Center } from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { supabase } from '../client'
import Link from 'next/link';

export default function Register() {
    const registerForm = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            email: isEmail('Invalid Email'),
            password: hasLength({ min: 7 }, 'Password must be atleast 7 characters'),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords do not match' : null,
        },
    });

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={registerForm.onSubmit(console.log)}>
                <TextInput mt="sm" label="Email" placeholder="Enter your email" {...registerForm.getInputProps('email')} />
                <PasswordInput label="Password" placeholder="Password" {...registerForm.getInputProps('password')} />
                <PasswordInput label="Confirm Password" placeholder="Password" {...registerForm.getInputProps('confirmPassword')} />
                <Group position='right' mt="md">
                    <Link href={'/login'}>Already have an account? Sign In</Link>
                </Group>
                <Group position="center" mt="md">
                    <Button type="submit" fullWidth variant="outline">Sign Up</Button>
                </Group>
            </form>
        </Box>
    )

}
