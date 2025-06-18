import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-primary to-black p-4 relative overflow-hidden">
      <div className="relative z-10 animate-fade-in backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 max-w-xl w-full text-center transition-all duration-500 ease-in-out transform hover:scale-[1.015] hover:shadow-primary/40">
        <div className="flex justify-center mb-6">
          <CheckCircle size={72} className="text-primary drop-shadow-md" />
        </div>

        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
          Payment Successful!
        </h1>
        <p className="text-white/80 text-lg mb-8 leading-relaxed">
          We're thrilled to confirm your payment. Your order is now being
          processed and a confirmation email is on its way.
        </p>

        <Link
          to="/"
          className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-primary/60 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
