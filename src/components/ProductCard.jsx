import React, { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const ref = doc(db, "wishlists", user.uid, "products", product.id);
        const snap = await getDoc(ref);
        setIsWishlisted(snap.exists());
      }
    };
    checkWishlist();
  }, [product.id]);

  const toggleWishlist = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    const ref = doc(db, "wishlists", user.uid, "products", product.id);
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
    <div className="border rounded-xl p-4 shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">₹{product.price}</p>
      <button onClick={toggleWishlist} className="text-red-500 mt-2">
        {isWishlisted ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
      </button>
    </div>
  );
};

export default ProductCard;