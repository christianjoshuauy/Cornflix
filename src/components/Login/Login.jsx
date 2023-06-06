import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import "./Login.scss";

function Login() {
  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    const { email, password } = data;
  };
  return (
    <form className="Login__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="Login__form--input">
        <Input
          type="text"
          name="email"
          placeholder="E-mail"
          validationMessage="Please enter a valid email address."
          {...register("email", {
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
          errors={errors}
        />
      </div>
      <div className="Login__form--input">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          validationMessage="The password should have a length between 6 and 30 characters."
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 30,
          })}
          errors={errors}
        />
      </div>
      <button type="submit" className="Login__form--button button__submit">
        Sign In
      </button>
    </form>
  );
}

export default Login;
