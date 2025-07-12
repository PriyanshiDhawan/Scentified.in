import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("Product not found");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-6">Loading product details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-xl font-semibold text-black mb-4">₹{product.price}</p>

      {/* Reviews Section */}
      <ReviewsList productId={id} />
      <ReviewForm productId={id} onReviewSubmitted={() => {}} />
    </div>
  );
};

export default ProductDetail;