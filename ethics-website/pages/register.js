import React from 'react';
import { TextInput, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { supabase } from '../client'
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function Register() {
    const [error, setError] = React.useState(null);
    const router = useRouter();

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

    const signUpWithEmail = async () => {
        const { email, password } = registerForm.values;

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
        }

        if (data) {
            setError(null);
            registerForm.reset();
            router.push("/");
        }
    }

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={registerForm.onSubmit(signUpWithEmail)}>
                <img style={{ width: 220, height: 200 }} src={"./images/aston_logo.png"} />
                <TextInput mt="sm" label="Email" placeholder="Enter your email" {...registerForm.getInputProps("email")} />
                <PasswordInput label="Password" placeholder="Password" {...registerForm.getInputProps("password")} />
                <PasswordInput label="Confirm Password" placeholder="Password" {...registerForm.getInputProps("confirmPassword")} />
                {error && <p style={{color: "red"}}>{error}</p>}
                <Group position="right" mt="md">
                    <Link href={"/login"}>Already have an account? Sign In</Link>
                </Group>
                <Group position="center" mt="md">
                    <Button type="submit" fullWidth variant="outline">Sign Up</Button>
                </Group>
            </form>
        </Box>
    )

}
