import { useState } from "react";
import { Button } from "../components/ui/button";
import { uploadProfileImage } from "../services/users";
import { useAppSelector } from "../hooks/hooks";
import type { BasicUser } from "../types/user";
import toast, { Toaster } from "react-hot-toast";

export default function AdminSettings() {
  const [uploading, setUploading] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const user = useAppSelector(
    (state) => state.auth.user
  ) as BasicUser & { image_url?: string };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    setUploading(true);
    try {
      const url = await uploadProfileImage(user.id, file);
      setProfileUrl(url);
      toast.success("Profile image updated successfully!");
      // TODO: optionally update Redux store with new image_url here
    } catch (err: any) {
      console.error("Error uploading profile image:", err);
      toast.error(err?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Admin Settings
        </h1>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Profile Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600"
              />
              {uploading && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Uploading...
                </p>
              )}
              {(profileUrl || user?.image_url) && (
                <img
                  src={profileUrl || user.image_url}
                  alt="Profile"
                  className="mt-4 w-24 h-24 object-cover rounded-full border dark:border-slate-600"
                />
              )}
            </div>

            {/* Admin Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue={user?.email || ""}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600"
                placeholder="admin@example.com"
                disabled
              />
            </div>

            {/* Notification Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notification Preferences
              </label>
              <select className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600">
                <option>Email Only</option>
                <option>SMS Only</option>
                <option>Email & SMS</option>
                <option>None</option>
              </select>
            </div>

            {/* Change Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Change Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600"
                placeholder="New password"
              />
            </div>

            {/* Save Settings Button */}
            <div className="text-center">
              <Button type="submit" disabled={uploading}>
                Save Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
