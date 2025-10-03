import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { validation } from "../../../utils/validation";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export default function LoginTab() {
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
      navigate("/");
    } catch (error) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
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
          className="my-5 max-w-30 uppercase bg-[#147324]"
        >
          Sign in
        </Button>
        <div className="text-sm">
          Don't have an account?{" "}
          <a className="text-blue-200" href="/auth/register">
            Register here
          </a>
        </div>
      </form>
    </div>
  );
}
