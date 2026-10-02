"use client"
import { useSearchParams } from 'next/navigation';
import React from 'react';


import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { resetPassword } from '@/app/lib/auth-client';

const Respwoser = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const handeldResetPasword = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries())
        const resData = await resetPassword({
            newPassword:data.password,
            token
        })
        console.log("alterw resetate password",resData)
        // Convert FormData to plain object


    };



    return (
        <div>
            <h3>Resedad pawsord</h3>
            <p>Now give me new pasword</p>

            <Form className="flex w-96 flex-col gap-4" onSubmit={handeldResetPasword}>
               
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                     
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>

        </div>
    );
};

export default Respwoser;