"use client";

import { Button } from "@/components/common";

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="w-full flex items-center justify-center p-4 border border-gray-300 rounded-lg">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-600">{error.message}</h2>
        <Button 
          onClick={() => reset()} 
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </Button>
      </div>
    </div>
  );
}