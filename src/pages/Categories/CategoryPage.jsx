import React, { useState, useEffect } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import CategoryForm from "./CategoryForm";
import { useAuth0 } from "@auth0/auth0-react";

const CategoriesPage = () => {
  const [categorias, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectCategorias, setSelectedProduct] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const fetchCategorias = async () => {
    try {
      const token = await getAccessTokenSilently();

      console.log("ID Token:", token);
      let response = await axios.get(
        "https://backend-productos.netlify.app/api/categorias",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data || []);

      setLoading(false);
    } catch (error) {
      toast.error("Hubo un error al cargar las categorias");
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleShowModal = () => {
    setSelectedProduct(null);
    setShowModal(true);
    fetchCategorias();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchCategorias();
  };

  const handleEditButtonClick = (categoria) => {
    setSelectedProduct(categoria);
    setShowModal(true);
  };

  const handleDeleteClick = (categoria) => {
    axios
      .delete(
        `https://backend-productos.netlify.app/api/categorias/${categoria.id}`
      )
      .then(() => {
        toast.success("La categoria se ha eliminado correctamente.");
        console.log('La categoria es eliminada:', categoria);
        fetchCategorias();
      })
      .catch((error) => {
        toast.error("Hubo un error al eliminar la categoria.");
        console.error(error);
      });
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <BeatLoader />
      ) : (
        <>
          <Container>
            <Row>
              <Button onClick={handleShowModal}>Agregar categoria</Button>
            </Row>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>{categoria.nombre}</td>
                
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          {showModal && (
            <CategoryForm
              showModal={showModal}
              handleClose={handleCloseModal}
              product={selectCategorias}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
