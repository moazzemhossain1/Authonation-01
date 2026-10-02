"use client";

import { requestPasswordReset } from "@/app/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const ForgotPaworsrd = () => {
  const handleForgautPawoerd =async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    const restRequestpaword=await requestPasswordReset({
        email:data.email,
        redirectTo:"/Auths/rese-pawosurs"
    })

    
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Forgot Password
      </h2>

      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={handleForgautPawoerd}
      >
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            Send Reset Link
          </Button>

          <Button
            type="reset"
            variant="secondary"
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPaworsrd;