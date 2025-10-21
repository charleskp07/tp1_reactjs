import { useNavigate } from "react-router"
import Input from "../../../components/Input/Input";
import { useState } from "react";
import { projectApi } from "../../../api/projects/crud.api";
import Loader from "../../../components/Loader/Loader";

export default function Create() {
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1)
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>("")

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")


  const OnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const OnDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const OnStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true)
      setSuccessMessage("")
      const formData = new FormData()
      formData.set("name", name)
      formData.set("description", description)
      formData.set("status", status)
      await projectApi.create(formData)

      setSuccessMessage("Projet ajouter avec success")
      setName('')
      setDescription('')
      setStatus('')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    
    <div>
      {
        successMessage
      }
      <button type="button" onClick={goToBack}>
        retour
      </button>
      <h1>
        Ajouter un project
      </h1>

      <div>
        <form onSubmit={handleSubmit}>
          <Input label='Nom du projet'
            reference='name'
            type='text'
            placeholder='Saisir votre nom du project'
            onChange={OnNameChange}
            value={name} />
          <br />
          <Input label='status du projet'
            reference='status'
            type='text'
            placeholder='Saisir le status'
            onChange={OnStatusChange}
            value={status} />
          <br />
          <textarea
            name='description'
            value={description}
            onChange={OnDescriptionChange}
            placeholder="Saisir la description" />


          <button type="submit" disabled={isLoading} style={{width:"100px"}}>
            {
              isLoading ?
              <div style={{width:"50px"}}>
                <Loader />
              </div> :
              <p>Ajouter</p>
            }
            
          </button>

        </form>
      </div>
    </div>
  )
}
