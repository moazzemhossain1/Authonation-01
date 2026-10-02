"use client";
import { signIn, signUp } from "@/app/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

const SingUp = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries())
        // console.log("aflter loging data", data)
        // Convert FormData to plain object

        const { data: resData, error } = await signUp.email({
            name:data.name,
            email: data.email,
            password: data.password,

        })
        if (error) {
            console.log("sing error", error)
            return;
        }
        console.log("Signup success:", resData);

    };

    const GoolSinup=async()=>{
        const data=await signIn.social({
            provider: "google",
        })
    }

    const signInsw = async () => {
    const data = await signIn.social({
        provider: "github"
    })
}
    return (
        <div>
            <h3>Please Sing up</h3>
            <Form className="flex w-96 flex-col gap-4 " onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input placeholder="John Doe" />
                    <FieldError />
                </TextField>
                <TextField isRequired name="email" type="email"></TextField>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
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
                        {/* <Check /> */}
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
            <h3>OR</h3>
             <Button
             onClick={GoolSinup}
              variant="secondary">SingUP with Goole</Button>
              <h3>OR</h3>
             <Button
             onClick={signInsw}
              variant="secondary">SingUP with Githup</Button>
              



        </div>
    );
};

export default SingUp;