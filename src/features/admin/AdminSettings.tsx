import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateUserProfileSettings } from "@/services/users";
import { useAppSelector } from "@/hooks/hooks";
import type { BasicUser } from "@/types/user";
import toast, { Toaster } from "react-hot-toast";
import React = require("react");

export default function AdminSettings() {
  const user = useAppSelector(
    (state) => state.auth.user
  ) as BasicUser & { image_url?: string; notification_preference?: string };

  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [phone, setPhone] = useState(user?.contact_phone || "");
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [notificationPreference, setNotificationPreference] = useState(
    user?.notification_preference || "email"
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setProfileUrl(URL.createObjectURL(selectedFile)); // preview
  };

  const handleSaveSettings = async () => {
    if (!user?.id) return;
    setUploading(true);

    try {
      const { message } = await updateUserProfileSettings(user.id, {
        name,
        contact_phone: phone,
        password: password.trim() !== "" ? password : undefined,
        file: file || undefined,
        notification_preference: notificationPreference,
      });

      toast.success(message || "✅ Profile updated!");
    } catch (err: any) {
      console.error("❌ Error updating profile:", err);
      toast.error(err?.message || "Failed to update profile.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
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

            {/* Admin Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600"
                placeholder="Full name"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600"
                placeholder="0712345678"
              />
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600"
                disabled
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Change Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600"
                placeholder="New password"
              />
            </div>

            {/* 🔔 Notification Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notification Preference
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="notification"
                    value="email"
                    checked={notificationPreference === "email"}
                    onChange={() => setNotificationPreference("email")}
                  />
                  Email
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="notification"
                    value="sms"
                    checked={notificationPreference === "sms"}
                    onChange={() => setNotificationPreference("sms")}
                  />
                  SMS
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="notification"
                    value="none"
                    checked={notificationPreference === "none"}
                    onChange={() => setNotificationPreference("none")}
                  />
                  None
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="text-center">
              <Button type="button" disabled={uploading} onClick={handleSaveSettings}>
                {uploading ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
