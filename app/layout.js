import '@stream-io/video-react-sdk/dist/css/styles.css'
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {UserProvider} from "@/lib/context/UserContext";
import QueryProvider from '@/lib/context/QueryProvider';
import {AuthProvider} from "@/lib/context/AuthContext";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata = {
  title: "Forge",
  description: "Next Level Project Management Tool",
  image: "/logo.png",

};

export default function RootLayout({ children }) {



  return (
    <html lang="en">
   
      <body className={inter.className}>


        <UserProvider>

      <QueryProvider>
          {children}
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            className="z-50"
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </QueryProvider>
   

        </UserProvider>

      </body>
    </html>
  );
}
