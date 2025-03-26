import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Camera, Clock, Mail, Upload, User } from 'lucide-react';
// import defaultImage from '../../../backend/uploads/default.jpg';
import {BACK_END_BASE_URL} from "../utils/axios"
function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuth();
  const [profilePic, setProfilePic] = React.useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profilePic', file);
    updateProfile(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="shadow-xl rounded-lg p-6 w-full max-w-md bg-base-200 text-base-content">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

        {/* Profile Picture Upload */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={`${BACK_END_BASE_URL}/${profilePic || authUser.profilePic || "uploads/default.jpg"}` } 
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-primary shadow-lg"
          />
          
          {/* Upload Icon */}
          <label
            className={`absolute bottom-0 right-0 bg-primary text-black p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200 ease-in-out ${isUpdatingProfile ? 'opacity-0' : 'opacity-100'}`}
            htmlFor="avatar-upload"
          >
            <Camera size={20} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              name="profilePic"
              onChange={handleProfileUpdate}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-sm text-center text-neutral-content">
          {isUpdatingProfile ? 'Uploading...' : 'Click the Camera icon to update profile picture'}
        </p>

        {/* User Info */}
        <div className="space-y-4 text-xl mt-7 text-center">
          <div className="p-3 flex justify-center rounded-md gap-2">
            <User size={20} />
            <strong>Username:</strong> {authUser.fullName}
          </div>
          <div className="p-3 flex justify-center rounded-md gap-2">
            <Mail size={20} />
            <strong>Email:</strong> {authUser.email}
          </div>
          <div className="p-3 flex justify-center rounded-md gap-2">
            <Clock size={20} />
            <strong>Member Since:</strong>
            <span>{authUser.createdAt?.split('T')[0]}</span>
          </div>
        </div>

        {/* Save Button */}
        <button className="mt-6 w-full bg-primary text-black py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:bg-primary-focus transition">
          <Upload size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;