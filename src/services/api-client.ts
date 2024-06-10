import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "6e16e11c97fe47f380ee05aecba4533b",
  },
});