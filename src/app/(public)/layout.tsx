import Navbar from "@/components/shared/navbar/navbar";
import Footer from "@/components/shared/footer";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
