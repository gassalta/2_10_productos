import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = ({ showModal, handleClose, product }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoriaId: product ? product.categoriaId?.toString() : "1"
    }
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-productos.netlify.app/api/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => console.error(error));
  }, []);


  const onSubmit = (data) => {
    data.categoriaId = parseInt(data.categoriaId);
    if (product) {
      // Actualización del producto
      axios
        .put(
          `https://backend-productos.netlify.app/api/productos/${product.id}`,
          data
        )
        .then((response) => {
          console.log(response.data);
          toast.success("El producto se ha actualizado correctamente.");
          handleClose();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Hubo un error al actualizar el producto");
        });
    } else {
      // Creación del producto
      axios
        .post("https://backend-productos.netlify.app/api/productos", data)
        .then((response) => {
          console.log(response.data);
          toast.success("El producto se ha creado correctamente.");

          handleClose();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Hubo un error al crear el producto");
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {product ? "Editar Producto" : "Agregar Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="productName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                {...register("nombre", { required: true })}
                defaultValue={product ? product.nombre : ""}
              />
              {errors.nombre && <span>El nombre es requerido</span>}
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                {...register("precio", { required: true })}
                defaultValue={product ? product.precio : ""}
              />
              {errors.precio && <span>El precio es requerido</span>}
            </Form.Group>

            <Form.Group controlId="productCategory">
              <Form.Label>Categoría</Form.Label>
              <Controller
                name="categoriaId"
                control={control}
                render={({ field }) => (
                  <Form.Select {...field}>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              {errors.categoria && <span>La categoría es requerida</span>}
            </Form.Group>
            <Form.Group controlId="productStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                {...register("stock", { required: true })}
                defaultValue={product ? product.stock : ""}
              />
              {errors.stock && <span>El stock es requerido</span>}
            </Form.Group>
            <Button
              style={{ marginTop: "10px" }}
              variant="primary"
              type="submit"
            >
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductForm;
