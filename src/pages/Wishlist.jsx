import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (auth.currentUser) {
        const colRef = collection(db, "wishlists", auth.currentUser.uid, "products");
        const querySnapshot = await getDocs(colRef);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWishlistItems(items);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>You haven’t added anything yet!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistItems.map(item => (
            <div key={item.id} className="border p-3 rounded-xl shadow-md">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <h3 className="font-semibold mt-2">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-lg font-bold mt-1">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
