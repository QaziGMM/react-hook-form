import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);

      throw new Error();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "This email is alrady taken",
      });
    }
  };

  return (
    <div>
      <h1 className="flex font-bold pt-10 items-center justify-center text-4xl">
        React Hook Form
      </h1>
      <div>
        <form
          className="flex flex-col items-center m-10 justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="bg-gray-500 h-full w-full text-2xl p-5 mt-10 outline-none border-none rounded-lg"
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                value.includes("@") || "Email must include '@'",
            })}
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <div className=" text-xl  text-red-500">{errors.email.message}</div>
          )}

          <input
            className="bg-gray-500 h-full w-full text-2xl p-5 mt-10 outline-none border-none rounded-lg"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <span className=" text-xl  text-red-500">
              {errors.password.message}
            </span>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full text-2xl mt-10 h-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-lg"
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          {errors.root && (
            <span className=" text-xl  text-red-500">
              {errors.root.message}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
