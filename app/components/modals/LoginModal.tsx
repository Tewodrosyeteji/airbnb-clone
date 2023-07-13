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
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

const LoginModal = () => {
  const registerModal = useRegisterationModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const Toggled = useCallback(() => {
    registerModal.onClose;
  }, []);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login into your account" />
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
        onClick={() => {}}
        icon={FcGoogle}
        outline
      />
      <Button
        label="continue with Github"
        disabled={isLoading}
        onClick={() => {}}
        outline
        icon={AiFillGithub}
      />
      <div className="text-neutral-500 text-center mt-1 font-light ">
        <p>
          Aready have an account?
          <span onClick={Toggled} className="text-neutral-800 hover:underline">
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      actionLabel="continue"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
