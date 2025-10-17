import { Fragment,useState } from "react"
import Input from "../../components/Input/Input"
import H1 from "../../components/H1/H1"
import { Link, useNavigate } from "react-router"
import z from "zod"
import Form from "../../components/Form/Form"



const registrationSchema = z.object({
    full_name: z.string().min(5, "Le nom complet doit avoir au moins 5 caractères"),
    email: z.email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmation_password: z.string(),
})

    .refine((data) => data.password === data.confirmation_password, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmation_password"],
    });

type RegistrationData = z.infer<typeof registrationSchema>;


export default function Registration() {
    const [full_name, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmation_password, setConfirmationPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const OnFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value)
    }

    const OnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const OnPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const OnConfirmationPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmationPassword(event.target.value)
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();//Quand  il est sur un element tout les comportement sont annuler

        const formData: RegistrationData = { full_name, email, password, confirmation_password };
        const validation = registrationSchema.safeParse(formData);

        if (!validation.success) {
            console.log(error)
            setError(validation.error.message);
            return;
        }

        // const user= {full_name, email}

        // console.log(user)

        localStorage.setItem("user", JSON.stringify({ full_name, email, password }));
        navigate("/profile");


    }




    return (
        <Fragment>
            <div className="contenair">
                <Form onSubmit={onSubmit}>
                    <H1>S'inscrire</H1>
                    <br />
                    <Input label='Nom complet'
                        reference='full_name'
                        type='text'
                        placeholder='Saisir votre nom complet'
                        onChange={OnFullNameChange}
                        value={full_name} />

                    <Input
                        label='Adresse e-mail'
                        reference='email'
                        type='email'
                        placeholder='Saisir votre email'
                        onChange={OnEmailChange}
                        value={email} />

                    <Input
                        label='Mot passe'
                        reference='password'
                        type='password'
                        placeholder='Saisir votre mot de passe'
                        onChange={OnPasswordChange}
                        value={password} />

                    <Input
                        label='Confirmation mot de passe'
                        reference='confirmation_password'
                        type='password'
                        placeholder='Confimer votre mot de passe '
                        onChange={OnConfirmationPasswordChange}
                        value={confirmation_password} />

                    {/* {error && <p>{error}</p>} */}

                    <button type="submit" className="sbm-btn">S'inscrire</button>

                </Form>

                <div className="text-center">
                    <p>Déjà membre ? <Link to="/">Se connecter</Link></p>
                </div>
            </div>
        </Fragment>
    )


}