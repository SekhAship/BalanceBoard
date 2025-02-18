import { Disclosure } from "@headlessui/react";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center  shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Dashboard Name */}
          <h1 className="text-white text-xl font-semibold">BalanceBoard</h1>

          {/* User Avatar */}
          <div className="flex items-center">
            <img
              alt="User"
              src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid"
              className="h-10 w-10 rounded-full border-2 border-gray-500"
            />
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
