import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { validation } from "../../../utils/validation";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export default function RegisterTab() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, validate } = useForm(
    { name: "", email: "", password: "", confirmPassword: "" },
    {
      name: validation.name,
      email: validation.email,
      password: validation.password,
      confirmPassword: validation.password,
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: values.name,
          email: values.email,
          password: values.password,
        }),
      });
      if (!response || response.status !== 200) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert("Registeration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full w-full flex flex-col items-start p-10 text-black">
      <h3 className="">CORUM</h3>
      <h1 className="mt-10">New User</h1>
      <p className="mb-10 text-[#8E8E8E]">Please enter your details</p>
      <form
        onSubmit={handleSubmit}
        className="max-xl:w-full min-xl:w-100 min-illusBreak:max-w-100"
      >
        <Input
          label="Enter your Full Name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={touched.name && errors.name ? errors.name : undefined}
          autoComplete=""
          className=""
        />
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
          label="Password"
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
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          error={
            touched.confirmPassword && errors.confirmPassword
              ? errors.confirmPassword
              : undefined
          }
          autoComplete="current-password"
          className=""
        />
        <Button
          type="submit"
          loading={loading}
          className="my-5 max-w-30 uppercase bg-[#147324]"
        >
          Register
        </Button>
        <div className="text-sm">
          Already have an account?{" "}
          <a className="text-blue-200" href="/auth">
            Login here
          </a>
        </div>
      </form>
    </div>
  );
}
