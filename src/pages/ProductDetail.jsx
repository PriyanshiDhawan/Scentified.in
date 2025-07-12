import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("📦 Fetching product with ID:", id);
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("✅ Product found:", docSnap.data());
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.warn("❌ Product not found in Firestore.");
          setNotFound(true);
        }
      } catch (error) {
        console.error("🔥 Error fetching product:", error.message);
        setNotFound(true);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const toggleWishlist = () => {
    if (!auth.currentUser) {
      alert("Please log in to use the wishlist.");
      return;
    }
    setIsWishlisted((prev) => !prev);
    // Firebase wishlist logic can be added here
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    alert("Product added to cart!");
  };

  if (notFound) {
    return (
      <div className="p-6 text-red-600 text-center">
        ❌ Product not found. Please check the URL or ensure the product exists in Firestore.
      </div>
    );
  }

  if (loading || !product) {
    return (
      <div className="p-6 text-gray-500 text-center animate-pulse">
        ⏳ Loading product details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <button onClick={toggleWishlist} className="text-red-500">
          {isWishlisted ? <AiFillHeart size={28} /> : <AiOutlineHeart size={28} />}
        </button>
      </div>

      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 mb-4">
          No image available
        </div>
      )}

      <p className="text-gray-700 mb-2">{product.description || "No description available."}</p>
      <p className="text-xl font-semibold text-black mb-2">₹{product.price || "N/A"}</p>

      {/* Ratings Summary */}
      <div className="mb-4 flex items-center gap-2">
        {product.rating ? (
          <>
            <span className="text-yellow-500 text-lg">⭐ {product.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-600">({product.reviewCount || 0} reviews)</span>
          </>
        ) : (
          <span className="text-sm text-gray-500">No reviews yet</span>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-black text-white px-6 py-2 rounded-xl shadow hover:bg-gray-800 mb-6"
      >
        Add to Cart
      </button>

      {/* Reviews Section */}
      <ReviewsList productId={id} />
      <ReviewForm productId={id} onReviewSubmitted={() => {}} />
    </div>
  );
};

export default ProductDetail;