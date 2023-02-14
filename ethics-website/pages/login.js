import React from 'react';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';

function Login() {
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
                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    )

}
