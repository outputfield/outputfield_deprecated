import React from "react";
import { SubmitHandler } from "react-hook-form";
import ProfileForm from '../components/profileForm';

export default function SignUp() {
  const onSubmit: SubmitHandler<ISignUpInputs> = (data) => console.log(data);

  // TODO: make this a component ProfileForm that accepts `onSubmit` prop, so that it can be reused for "Edit profile"
  return (
    <>
      <ProfileForm
        onSubmit={onSubmit}
      />
    </>
  );
}
