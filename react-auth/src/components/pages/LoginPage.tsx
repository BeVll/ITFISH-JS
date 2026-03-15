import LoginForm from "../login/LoginForm";
import AuthContainer from "../ui/AuthContainer";

export default function LoginPage() {
  return (
    <div className="w-full flex h-screen justify-center items-center">
      <AuthContainer>
        <LoginForm />
      </AuthContainer>
    </div>
  );
}
