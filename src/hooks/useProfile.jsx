import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../axiosInstance";

export const useProfile = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);

 

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user._id) {
        try {
          console.log(`Fetching profile for user ID: ${user._id}`);
          console.log(`Username: ${user.username}`); // Affichage du nom d'utilisateur
          const response = await axiosInstance.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${user._id}`);
          setProfile(response.data);
          console.log('Profile fetched successfully:', response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setProfile(null);
        }
      } else {
        console.log('No user or user ID available');
      }
    };

    fetchProfile();
  }, [user]);

  return { profile };
};












