import { Fragment } from "react/jsx-runtime";
import H1 from "../../components/H1/H1";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import z from "zod";
import axios from "axios";


const loginSchema = z.object({
    email: z.email("Email invalide"),
    password: z.string().min(6, "Mot de passe trop court"),
});

type LoginData = z.infer<typeof loginSchema>;

type projectType = {
    name: string
}
type projectResponse = {
    data: [
        projectType
    ]
}

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Array<projectType>>([]);


    const OnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const OnPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: LoginData = { email, password };
        const validation = loginSchema.safeParse(data);

        if (!validation.success) {
            console.log(error)
            setError(validation.error.message);
            return;
        }


        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (user && user.email === email && user.password === password) {
            navigate("/profile")
        } else {
            setError("User not found");
            console.log(error)
        }
    }


    useEffect(() => {
        axios.get('https://focuspro.dayal-enterprises.com/public/api/projects')

            .then(function (response) {

                // handle success
                console.log(response.data);

                const resultData: projectResponse = response;
                // console.log(resultData.data[0])

                setProjects(resultData.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed(example: isLoading)
            });
    }, []);


    return (
        <div className="contenair">
            <Fragment>
                {
                    projects.map((project, index) => {
                        return (
                            <div key={index}>
                                {project.name}
                            </div>
                        )
                    })
                }

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


