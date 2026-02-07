// src/components/Navbar.jsx
import React, { useState } from "react";
import { Bell, Search, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ConfirmationDialog from "./ConfirmationDialog";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-2.5 hidden md:block">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md"></div>

          {/* Right Section */}

          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 px-4 py-2 border-e-1 border-black "
              onClick={() => navigate("/profile")}
            >
              <User className="w-5 h-5 text-gray-500" />
              <span className=" text-md font-normal">
                {user?.email || "User Profile"}
              </span>
            </div>
         
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 px-4 py-2 text-white bg-gray-900 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showLogoutDialog}
        title="Logout Confirmation"
        message="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        isDangerous={true}
      />
    </>
  );
};

export default Navbar;
