"use client";

import useRegisterationModal from "@/app/hooks/useRegisterationModal";
import axios from "axios";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterationModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register/", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };

  const Toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="create an account" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        required
        register={register}
        errors={errors}
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="continue with google"
        disabled={isLoading}
        onClick={() => signIn("google")}
        icon={FcGoogle}
        outline
      />
      <Button
        label="continue with Github"
        disabled={isLoading}
        onClick={() => signIn("github")}
        outline
        icon={AiFillGithub}
      />
      <div className="text-neutral-500 text-center mt-1 font-light ">
        <p>
          Aready have an account?
          <span onClick={Toggle} className="text-neutral-800 hover:underline">
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Registraton"
      actionLabel="continue"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
