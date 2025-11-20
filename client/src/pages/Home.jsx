import { useEffect, useState } from "react";
import { getAllItems } from "../api/items";
import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import TiltedItemCard from "@/components/TiltedItemCard";
import Particles from "@/components/Particles";

export default function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getAllItems().then((data) => {
      setItems(data);
      setFilteredItems(data);
    });
  }, []);

  const runSearch = (q, c) => {
    q = q.toLowerCase();
    c = c.toLowerCase();

    const results = items.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(q);
      const matchesReview = item.reviews.some((r) =>
        r.review.toLowerCase().includes(q)
      );
      const matchesCategory = item.category.toLowerCase().includes(c);

      return (matchesName || matchesReview) && matchesCategory;
    });

    setFilteredItems(results);
  };

  return (
    <div className="text-white w-full max-h-full relative">

      {/* GLOBAL PARTICLE BACKGROUND */}
      <Particles
        particleColors={["#ffffff"]}
        particleCount={250}
        particleSpread={10}
        speed={0.12}
        particleBaseSize={110}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className="fixed inset-0 -z-10 pointer-events-none"
      />

      {/* =========================== */}
      {/* HERO SECTION (KEPT AS YOU LIKE IT) */}
      {/* =========================== */}

      <div className="w-full h-[600px] relative mb-16">

        {/* HERO UI OVER PARTICLES */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 bg-black/30 p-4">
          
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-xl">
            Rate Everything ✨
          </h1>

          <p className="text-gray-300 text-lg max-w-xl drop-shadow-md">
            Search, browse, and review anything.
          </p>

          {/* Main Search Bar */}
          <Input
            placeholder="Search items..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              runSearch(e.target.value, category);
            }}
            className="
              text-white border-gray-700 
              w-full max-w-2xl h-14 text-lg px-6
              rounded-xl shadow-md
            "
          />

          {/* Category Input */}
          <Input
            placeholder="Filter by category..."
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              runSearch(query, e.target.value);
            }}
            className="
              bg-gray-900/80 text-white border-gray-700 
              w-full max-w-md h-12 text-base px-5
              rounded-xl shadow-md
            "
          />

          {/* Add Item Button */}
          <Link
            to="/add"
            className="
              bg-blue-600 hover:bg-blue-700 
              px-6 py-3 rounded-xl text-white 
              font-medium transition shadow-lg
            "
          >
            ➕ Add New Item
          </Link>

        </div>
      </div>

      {/* ================== */}
      {/* ITEMS GRID SECTION */}
      {/* ================== */}

      <div className="max-w-6xl mx-auto px-6 backdrop-blur-sm pb-20">
        <h2 className="text-3xl font-semibold mb-8">Browse Items</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.length === 0 ? (
            <p className="text-gray-400 text-lg">No items found.</p>
          ) : (
            filteredItems.map((item) => (
              <TiltedItemCard key={item._id} item={item} />
            ))
          )}
        </div>
      </div>

    </div>
  );
}
