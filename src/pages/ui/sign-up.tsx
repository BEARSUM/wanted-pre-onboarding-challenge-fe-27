import SignUpForm from '@/entities/auth/ui/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="container max-w-[30rem] flex flex-col items-center">
      <h1 className="text-3xl mt-16 mb-6">회원가입</h1>
      <section className="w-full">
        <SignUpForm />
      </section>
    </div>
  );
}
