import Footer from "@/src/components/shared/Footer";
import Navbar from "@/src/components/shared/Navbar";

const CommonLayout = ({children} :{children : React.ReactNode}) => {
  return (
    <div>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}

export default CommonLayout;