import { NavBar } from "@/components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import registerSchema, { RegisterData } from "../../app/register/validators";
import { useAuth } from "@/context/authContext";
import { Input } from "../Input";

const RegisterForm = () => {};

export default RegisterForm;
