const uri =
  process.env.NODE_ENV === "production"
    ? "https://libya-store-git-main-hermis-s-team.vercel.app"
    : "http://localhost:3000";

export default uri;
