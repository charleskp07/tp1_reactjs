import { useNavigate } from "react-router";

export default function Show() {
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <button type="button" onClick={goToBack}>
        retour
      </button>
      <h1>
        Details d'un project
      </h1>

      <div>
      </div>
    </div>
  )
}
