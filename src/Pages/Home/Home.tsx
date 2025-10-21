import { Fragment } from "react/jsx-runtime";
import H1 from "../../components/H1/H1";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import z from "zod";
import { userApi } from "../../api/users/authentication";


const loginSchema = z.object({
    email: z.email("Email invalide"),
    password: z.string().min(6, "Mot de passe trop court"),
});

type LoginData = z.infer<typeof loginSchema>;



export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)



    const OnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const OnPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: LoginData = { email, password };
        const validation = loginSchema.safeParse(data);

        if (!validation.success) {
            console.log(error)
            setError(validation.error.message);
            return;
        }


        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.set("email", email)
            formData.set("password", password)
            const result = await userApi.login(formData)
            console.log(result, email, password)
            if (result.success) {
                console.log("connexion reussi")
            }else {
                console.log("echec")
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
        
        // const user = JSON.parse(localStorage.getItem("user") || "null");

        // if (user && user.email === email && user.password === password) {
        // } else {
        //     setError("User not found");
        //     console.log(error)
        // }
    }



    return (
        <div className="contenair">
            <Fragment>

                <Link to="/projects" >Listes de projects</Link>


                <Form onSubmit={onSubmit}>
                    <H1>
                        Se Connecter
                    </H1>
                    <br />
                    <Input
                        label='Adresse e-mail'
                        reference='email'
                        type='email'
                        placeholder='Saisir votre email'
                        onChange={OnEmailChange}
                        value={email} />
                    <Input
                        label='Mot de passe'
                        reference='password'
                        type='password'
                        placeholder='Saisir votre mot de passe'
                        onChange={OnPasswordChange}
                        value={password} />

                    <button type="submit" className="sbm-btn">Se connecter</button>

                    <div className="text-center">
                        <p>Nouveau membre ? <Link to="/registration">S'inscrire</Link></p>
                    </div>
                </Form>
            </Fragment>
        </div>
    )
}


