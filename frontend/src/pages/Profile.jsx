import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    skills: "",
    bio: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/me");

        setFormData({
          branch: response.data.user.branch || "",
          year: response.data.user.year || "",
          skills: response.data.user.skills || "",
          bio: response.data.user.bio || "",
          github: response.data.user.github || "",
          linkedin: response.data.user.linkedin || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/users/me", formData);

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;