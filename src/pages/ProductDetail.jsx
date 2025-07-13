import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
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
          const data = docSnap.data();
          setProduct({ id, ...data });

          // Check if wishlisted
          const user = auth.currentUser;
          if (user) {
            const wishlistRef = doc(db, "wishlists", user.uid, "products", id);
            const wishlistSnap = await getDoc(wishlistRef);
            setIsWishlisted(wishlistSnap.exists());
          }
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

  const toggleWishlist = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to use the wishlist.");
      return;
    }

    const ref = doc(db, "wishlists", user.uid, "products", id);
    if (isWishlisted) {
      await deleteDoc(ref);
      setIsWishlisted(false);
    } else {
      await setDoc(ref, { ...product, timestamp: new Date() });
      setIsWishlisted(true);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    alert("✅ Product added to cart!");
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

  const {
    Name,
    image = "/assets/default.jpg",
    ["5ml"]: price_5ml,
    ["10ml"]: price_10ml,
    ["30ml"]: price_30ml,
    ["Short Description"]: description,
    rating,
    reviewCount
  } = product;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-bold">{Name}</h2>
        <button onClick={toggleWishlist} className="text-red-500">
          {isWishlisted ? <AiFillHeart size={28} /> : <AiOutlineHeart size={28} />}
        </button>
      </div>

      <img
        src={image}
        alt={Name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <p className="text-gray-700 mb-3">{description || "No description available."}</p>

      <div className="text-lg font-medium text-gray-900 mb-4 space-y-1">
        {price_5ml && <p>💧 5ml: ₹{price_5ml}</p>}
        {price_10ml && <p>💧 10ml: ₹{price_10ml}</p>}
        {price_30ml && <p>💧 30ml: ₹{price_30ml}</p>}
      </div>

      {/* Ratings */}
      <div className="mb-6 flex items-center gap-2">
        {rating ? (
          <>
            <span className="text-yellow-500 text-lg">⭐ {rating.toFixed(1)}</span>
            <span className="text-sm text-gray-600">({reviewCount || 0} reviews)</span>
          </>
        ) : (
          <span className="text-sm text-gray-500">No reviews yet</span>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-black text-white px-6 py-2 rounded-xl shadow hover:bg-gray-800 mb-8"
      >
        Add to Cart
      </button>

      {/* Reviews */}
      <ReviewsList productId={id} />
      <ReviewForm productId={id} onReviewSubmitted={() => {}} />
    </div>
  );
};

export default ProductDetail;