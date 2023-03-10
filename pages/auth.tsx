import Header from "../components/Auth/Header";
import RegisterForm from "../components/Auth/RegisterForm";
import Layout from "../components/layout";

export default function Auth() {
  return (
    <Layout>
      <h1 className="text-5xl font-extrabold text-center py-10">Join Now!</h1>
      <div className="max-w-screen-md w-full bg-zinc-900 mx-auto rounded-md overflow-hidden">
        <Header />
        <main className="w-full p-5">
          <RegisterForm />
        </main>
      </div>
    </Layout>
  );
}
