import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryForm = ({ showModal, handleClose, categorie }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoriaId: categorie ? categorie.categoriaId?.toString() : ""
    }    
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("https://backend-productos.netlify.app/api/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error(error);
        // Manejar el error
      }
    };
  
    fetchCategorias();
  }, []);
  


  const onSubmit = (data) => {
    data.categoriaId = parseInt(data.categoriaId);
    if (categorie) {
      // Actualización del categorie
      axios
        .put(
          `https://backend-productos.netlify.app/api/categorias/${categorie.id}`,
          data
        )
        .then((response) => {
          console.log(response.data);
          toast.success("La categoria se ha actualizado correctamente.");
          handleClose();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Hubo un error al actualizar la categoria");
        });
    } else {
      // Creación del categorie
      axios
        .post("https://backend-productos.netlify.app/api/categorias", data)
        .then((response) => {
          console.log(response.data);
          toast.success("La categoria se ha creado correctamente.");

          handleClose();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Hubo un error al crear la categoria");
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {categorie ? "Editar Categoria" : "Agregar Categoria"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="productName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
  type="text"
  {...register("nombre", { required: true })}
  defaultValue={categorie ? categorie.nombre : ""}
  className={errors.nombre ? "is-invalid" : ""}
/>
{errors.nombre && <span className="text-danger">El nombre es requerido</span>}

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

export default CategoryForm;
