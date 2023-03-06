import { Header } from './components/Header';
import { ContactForm } from './components/ContactForm';
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { SubItem } from "./components/SubItem";
import { Result } from "./pages/Result";
import { PrefinalResult } from "./pages/PrefinalResult";
import { VerifyUser } from "./pages/VerifyUser";
import { EmailVerify } from "./pages/EmailVerify";
import { VerifiedEmail }  from "./pages/VerifiedEmail";
import { ForgotPassword }  from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { EditProfile } from "./pages/EditProfile";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer";

const Routes ={
  Header:Header,
  ContactForm:ContactForm,
  Home:Home,
  Profile:Profile,
  SubItem:SubItem,
  Result:Result,
  PrefinalResult:PrefinalResult,
  VerifyUser:VerifyUser,
  EmailVerify:EmailVerify,
  VerifiedEmail:VerifiedEmail,
  ForgotPassword:ForgotPassword,
  ResetPassword:ResetPassword,
  EditProfile:EditProfile,
  Footer:Footer,
  Error:Error
}
export default Routes