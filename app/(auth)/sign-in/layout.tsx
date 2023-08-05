import "@/app/globals.css";

export const metadata = {
  title: "Wblow - Admin - Sign in",
  description: "",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="flex items-center h-full overflow-hidden">{children}</div>
    </div>
  );
};

export default AuthLayout;
