import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button"
import { Product } from "../../models/product";
import { ProductInput } from "../../network/product_api";
import * as ProductApi from "../../network/product_api"
import { useForm } from "react-hook-form";

type AddEditProductFormProps = {
  productToEdit?: Product | null,
  onProductSaved: (product: Product) => void,
}

export default function AddEditProductForm({ productToEdit, onProductSaved }: AddEditProductFormProps) {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductInput>({
    defaultValues: {
      name: productToEdit?.name || "",
      price: productToEdit?.price || "",
      description: productToEdit?.description || "",
      images: productToEdit?.images || [],
      thumbnail: productToEdit?.thumbnail || "",
      stock: productToEdit?.stock || "",
      seller: productToEdit?.seller || "",
      category: productToEdit?.category || "",
    }
  })

  async function onSubmit(input: ProductInput) {
    console.log(input)
    try {
      let productResponse: Product
      if (productToEdit) {
        productResponse = await ProductApi.updateProduct(productToEdit._id, input)
      } else {
        productResponse = await ProductApi.createProduct(input)
      }

      onProductSaved(productResponse)
    } catch (error) {
      console.error(error)
      alert(error)

    }
  }
  return (
    <>

      <Form id="addEditProductForm" onSubmit={handleSubmit(onSubmit)}>

        <InputGroup className="mb-3">
          <InputGroup.Text>Name</InputGroup.Text>
          <Form.Control
            placeholder="Name"
            aria-label="Name"
            aria-describedby="basic-addon1"
            isInvalid={!!errors.name}
            {...register("name", { required: "Required" })}
          />
          <Form.Control.Feedback>
            {errors.name?.message}
          </Form.Control.Feedback>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Price</InputGroup.Text>
          <Form.Control
            placeholder="Price"
            aria-label="Price"
            aria-describedby="basic-addon2"
            {...register("price", { required: "Required" })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Description</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            rows={4}
            {...register("description", { required: "Required" })} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Stock</InputGroup.Text>
          <Form.Control
            placeholder="Stock"
            aria-label="Stock"
            aria-describedby="basic-addon3"
            {...register("stock", { required: "Required" })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Seller</InputGroup.Text>
          <Form.Control
            placeholder="Seller"
            aria-label="Seller"
            aria-describedby="basic-addon4"
            {...register("seller", { required: "Required" })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Category</InputGroup.Text>
          <Form.Control
            placeholder="Category"
            aria-label="Category"
            aria-describedby="basic-addon5"
            {...register("category", { required: "Required" })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Images</InputGroup.Text>
          <Form.Control
            placeholder="Images"
            aria-label="Images"
            aria-describedby="basic-addon6"
            {...register("images", { required: "Required" })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Thumbnail</InputGroup.Text>
          <Form.Control
            placeholder="Thumbnail"
            aria-label="Thumbnail"
            aria-describedby="basic-addon7"
            {...register("thumbnail", { required: "Required" })}
          />
        </InputGroup>
        <Button
          type="submit"
          id="addEditProductForm"
          disabled={isSubmitting}
        >
          {!productToEdit ? "Add product" : "Update product"}

        </Button>
      </Form>
    </>
  )
}
