import CreateYap from "../components/CreateYap";
import YapFeed from "../components/YapFeed";
import { useEffect, useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleYapCreated = () => {
    setRefresh((prev) => prev + 1);
  };

  if (showHero) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">
            Welcome to TwitterClone
          </h1>
          <p className="text-xl text-gray-600">
            Your go-to platform for connecting and sharing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <CreateYap onYapCreated={handleYapCreated} />
        <YapFeed key={refresh} />
      </div>
    </div>
  );
}
