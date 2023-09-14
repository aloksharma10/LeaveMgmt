import AuthSideContainer from "../AuthSideContainer";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthSideContainer
        title="Login"
        desc="This library has saved me countless hours of work and
          helped me deliver stunning designs to my clients faster than
          ever before."
      />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
