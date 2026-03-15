import AuthContainer from "../ui/AuthContainer";
import RegisterForm from "../register/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full flex h-screen justify-center items-center">
      <AuthContainer>
        <RegisterForm />
      </AuthContainer>
    </div>
  );
}
