import React, { useState, type FormEvent } from "react";
import { validation } from "../../utils/validation";
import { useForm } from "../../hooks/useForm";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, validate } = useForm(
    { email: "", password: "" },
    { email: validation.email, password: validation.password }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/home");
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center font-mono">
      <div className="max-illusBreak:hidden h-screen w-full border-r-1 border-[#8e8e8e] flex flex-col items-center justify-center">
        <img
          className="max-w-sm"
          alt="illustration"
          src="src/assets/login-illustration.png"
        />
        <h3 className="max-w-lg text-[30px] px-10 font-bold text-black">
          Your next big idea starts here — sign in
        </h3>
      </div>
      <div className="h-full w-full flex flex-col items-start p-10 text-black">
        <h3 className="">CORUM</h3>
        <h1 className="mt-10">
          Hello,
          <br />
          Welcome Back
        </h1>
        <p className="mb-10 text-[#8E8E8E]">Please enter your credentials</p>
        <form
          onSubmit={handleSubmit}
          className="max-xl:w-full min-xl:w-100 min-illusBreak:max-w-100"
        >
          <Input
            label="Enter your Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email ? errors.email : undefined}
            autoComplete="email"
            className=""
          />
          <Input
            label="Enter your Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={
              touched.password && errors.password ? errors.password : undefined
            }
            autoComplete="current-password"
            className=""
          />
          <div className="w-full flex items-center justify-between py-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 bg-black rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-black">Remember me</span>
            </label>
            <a className="text-sm text-[#8e8e8e] hover:text-black transition-colors cursor-pointer">
              Forgot password?
            </a>
          </div>
          <Button
            type="submit"
            loading={loading}
            className="my-10 max-w-30 uppercase bg-[#147324]"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return <LoginForm />;
};

export default App;
