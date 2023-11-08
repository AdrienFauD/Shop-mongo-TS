import { useParams } from "react-router-dom"
import useSearchProduct from "../hooks/useSearchProduct"

export default function SearchProductPage() {

    const params = useParams()

  return (
    <div>{JSON.stringify(params)}</div>
  )
}
