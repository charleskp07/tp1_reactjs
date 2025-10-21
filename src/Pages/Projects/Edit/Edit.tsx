import { useNavigate, useParams } from "react-router";
import Loader from "../../../components/Loader/Loader";
import Input from "../../../components/Input/Input";
import { projectApi } from "../../../api/projects/crud.api";
import { useEffect, useState } from "react";

export default function Edit() {
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1)
  }

  const params = useParams()

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
      await projectApi.update(parseInt(params.id || "0", 10), formData)

      setSuccessMessage("Projet mis à jour avec succès avec success")

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchProject = async () => {
      if (params.id) {
        try {
         const data = await projectApi.read(parseInt(params.id || "0", 10));

          setName(data.name || "")
          setDescription(data.description  || "")
          setStatus(data.status || "")
          console.log(data)
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchProject()

  }, [params]);


  return (
    <div>
      {
        successMessage
      }
      <button type="button" onClick={goToBack}>
        retour
      </button>
      <h1>
        Modifier un project
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


          <button type="submit" disabled={isLoading} style={{ width: "100px" }}>
            {
              isLoading ?
                <div style={{ width: "50px" }}>
                  <Loader />
                </div> :
                <p>Mettre à jour</p>
            }

          </button>

        </form>
      </div>
    </div>
  )
}
