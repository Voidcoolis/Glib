import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null); // Local state to hold the selected image (base64)

  // Handles image file selection and upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    const reader = new FileReader(); // Create a FileReader to read the file

    reader.readAsDataURL(file); // Read file as base64 string

    reader.onload = async () => {
      const base64Image = reader.result; // Get base64 string
      setSelectedImg(base64Image); // Update local preview
      await updateProfile({ profilePic: base64Image });  // Send to backend to update profile
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profil</h1>
            <p className="mt-2">Ihre Profilinformationen</p>
          </div>

          {/* section for avatar upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            {/* Show upload status or instructions */}
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Hochladen..." : "Klicken Sie auf das Kamerasymbol, um Ihr Foto zu aktualisieren"}
            </p>
          </div>
          
          {/* User info section */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Vollständiger Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>
            
            {/* Email Address  section*/}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-Mail Adresse
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          {/* Account information section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Konto-Informationen</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Mitglied seit</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              {/* Account status */}
              <div className="flex items-center justify-between py-2">
                <span>Konto-Status</span>
                <span className="text-green-500">Aktiv</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
