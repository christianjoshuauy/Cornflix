import React from "react";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import "./Signup.scss";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/slices/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    const { displayName, email, password } = data;
    dispatch(signUp({ displayName, email, password }));
  };
  return (
    <form className="Signup__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="Signup__form--input">
        <Input
          type="text"
          name="displayName"
          placeholder="Your name"
          validationMessage="Please enter your name."
          validation={register("displayName", {
            required: true,
            minLength: 2,
            maxLength: 60,
          })}
          errors={errors}
        />
      </div>
      <div className="Signup__form--input">
        <Input
          type="text"
          name="email"
          placeholder="E-mail"
          validationMessage="Please enter a valid email address."
          validation={register("email", {
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
          errors={errors}
        />
      </div>
      <div className="Signup__form--input">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          validationMessage="The password should have a length between 6 and 30 characters."
          validation={register("password", {
            required: true,
            minLength: 6,
            maxLength: 30,
          })}
          errors={errors}
        />
      </div>
      <div className="Signup__form--input">
        <Input
          type="password"
          name="check_password"
          placeholder="Repeat your password"
          validationMessage="Passwords should match"
          validation={register("check_password", {
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return (
                  (value && password === value) || "Passwords should match!"
                );
              },
            },
          })}
          errors={errors}
        />
      </div>
      <button type="submit" className="Signup__form--button button__submit">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
