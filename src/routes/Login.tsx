import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/user/user";
import Button from "../components/Button/Button.component";
import FormInput from "../components/FormInput/FormInput.component";

interface SigninValues {
  username: string;
  password: string;
}

interface Event {
  target: { value: string & any } & any;
}

const Login: React.FC = () => {
  const { error, setError, signIn } = useUserStore((state) => state);
  const [signinValues, setSigninValues] = useState<SigninValues>({
    username: "",
    password: "",
  });

  useEffect(() => {
    setError();
  }, []);

  // ... (keep the handleSubmit function as is)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      signIn(signinValues);
    } catch (err: any) {
      //setError(err.message || "An error occurred");
      console.error("Login error:", error);
    }
  };

  const setUsername = (e: Event) => {
    setSigninValues({
      ...signinValues,
      username: e.target.value,
    });
  };

  const setPassword = (e: Event) => {
    setSigninValues({ ...signinValues, password: e.target.value });
  };

  const ErrorMassage = () => {
    if (error.message !== "Network Error")
      switch (error.status) {
        case 401:
          return (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              Error:Invalid Username or Password !
            </div>
          );
          break;
        case 500:
          return (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              Error:Unknown Error Occured !
            </div>
          );
          break;
      }
    else
      return (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          Error:Network Error !
        </div>
      );
  };

  return (
    <div className="min-h-full min-w-full  flex items-center justify-center">
      {/* Main container with a gradient background and card */}
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl p-10 w-full max-w-md mx-auto border border-gray-200">
        {/* Header: Login Title */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Sign In
        </h2>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Number Input */}

          <FormInput
            inputId="username"
            label="Username"
            inputOptions={{
              type: "text",
              required: true,
              onChange: setUsername,
              name: "phone_number",
              value: signinValues.username,
            }}
          />

          {/* Password Input */}

          <FormInput
            inputId="password"
            label="Password"
            inputOptions={{
              type: "password",
              required: true,
              onChange: setPassword,
              name: "password",
              value: signinValues.password,
            }}
          />

          {/* Error Message */}
          {error && <ErrorMassage />}

          {/* Submit Button and Sign Up Link */}
          <div className="flex items-center justify-center">
            <Button buttonStyle="baseFullW" buttonType="submit">
              Login
            </Button>
          </div>
        </form>

        {/* Additional Note
        <Link to="/signup">
          {" "}
          <p className="text-center text-gray-500 mt-4">
            Not registered? Click the link to sign up.
          </p>
          </Link>*/}
      </div>
    </div>
  );
};

export default Login;
