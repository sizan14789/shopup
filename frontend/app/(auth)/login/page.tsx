import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="shell flex grow my-8">
      <div className="core grow flex flex-col">
        <LoginForm />
      </div>
    </div>
  );
}
