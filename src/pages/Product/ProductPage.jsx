import React, { useState, useEffect } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import ProductForm from "./ProductForm";
import { useAuth0 } from "@auth0/auth0-react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const fetchProducts = async () => {
    try {
      const token = await getAccessTokenSilently();

      console.log("ID Token:", token);

      let response = await axios.get(
        "https://backend-productos.netlify.app/api/productos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data || []);

      setLoading(false);
    } catch (error) {
      toast.error("Hubo un error al cargar los productos");
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowModal = () => {
    setSelectedProduct(null);
    setShowModal(true);
    fetchProducts();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchProducts();
  };

  const handleEditButtonClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteClick = (product) => {
    axios
      .delete(
        `https://backend-productos.netlify.app/api/productos/${product.id}`
      )
      .then(() => {
        toast.success("El producto se ha eliminado correctamente.");

        fetchProducts();
      })
      .catch((error) => {
        toast.error("Hubo un error al eliminar el producto.");
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
              <Button onClick={handleShowModal}>Agregar Producto</Button>
            </Row>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nombre}</td>
                    <td>${product.precio}</td>
                    <td>{product.categoria}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Button
                        className="me-2"
                        onClick={() => handleEditButtonClick(product)}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(product)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          {showModal && (
            <ProductForm
              showModal={showModal}
              handleClose={handleCloseModal}
              product={selectedProduct}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductPage;
