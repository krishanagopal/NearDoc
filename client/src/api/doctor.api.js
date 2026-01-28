
import api from "./axios";

export const fetchDoctors = async () => {
  const res = await api.get("/users/doctors");
  return res.data.doctors;
};

