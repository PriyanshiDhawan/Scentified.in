import React, { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    id,
    name,
    price_5ml,
    price_10ml,
    price_30ml,
    description,
    image
  } = product;

  const productImage = image || "/assets/default.jpg";

  useEffect(() => {
    const checkWishlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const ref = doc(db, "wishlists", user.uid, "products", id);
        const snap = await getDoc(ref);
        setIsWishlisted(snap.exists());
      }
    };
    checkWishlist();
  }, [id]);

  const toggleWishlist = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    const ref = doc(db, "wishlists", user.uid, "products", id);
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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition p-4 flex flex-col">
      <div className="relative">
        <img
          src={productImage}
          alt={name}
          className="w-full h-48 object-cover rounded-xl"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 text-red-500"
        >
          {isWishlisted ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        </button>
      </div>

      <h3 className="mt-3 text-lg font-semibold">{name}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-2">{description}</p>
      )}

      <div className="text-sm">
        <p><strong>5ml:</strong> ₹{price_5ml}</p>
        <p><strong>10ml:</strong> ₹{price_10ml}</p>
        <p><strong>30ml:</strong> ₹{price_30ml}</p>
      </div>
    </div>
  );
};

export default ProductCard;