import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    ID = product.id,
    Name,
    ["5ml"]: price_5ml,
    ["10ml"]: price_10ml,
    ["30ml"]: price_30ml,
    ["Short Description"]: description,
    image = "/assets/default.jpg"
  } = product;

  useEffect(() => {
    const checkWishlist = async () => {
      const user = auth.currentUser;
      if (user && ID) {
        const ref = doc(db, "wishlists", user.uid, "products", ID);
        const snap = await getDoc(ref);
        setIsWishlisted(snap.exists());
      }
    };
    checkWishlist();
  }, [ID]);

  const toggleWishlist = async (e) => {
    e.preventDefault(); // Prevent navigation when clicking heart
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    const ref = doc(db, "wishlists", user.uid, "products", ID);
    if (isWishlisted) {
      await deleteDoc(ref);
      setIsWishlisted(false);
    } else {
      await setDoc(ref, {
        ...product,
        timestamp: new Date()
      });
      setIsWishlisted(true);
    }
  };

  return (
    <Link
      to={`/product/${ID}`}
      className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition p-4"
    >
      <div className="relative">
        <img
          src={image}
          alt={Name}
          className="w-full h-48 object-cover rounded-xl"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 text-red-500"
        >
          {isWishlisted ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        </button>
      </div>

      <h3 className="mt-3 text-lg font-semibold">{Name}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-2">{description}</p>
      )}

      <div className="text-sm space-y-1">
        {price_5ml && <p><strong>5ml:</strong> ₹{price_5ml}</p>}
        {price_10ml && <p><strong>10ml:</strong> ₹{price_10ml}</p>}
        {price_30ml && <p><strong>30ml:</strong> ₹{price_30ml}</p>}
      </div>
    </Link>
  );
};

export default ProductCard;