import connectToDatabase from "@/utils/dbConnect";
import Post from "@/model/Post";
import Flutter from "@/model/User";

connectToDatabase();
export default async function createPost(req, res) {
  if (req.method === "POST") {
    const { text, username, name } = req.body;

    try {
      const user = await Flutter.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const post = new Post({ text, author: name, username });
      await post.save();

      res.status(201).json({ message: "Post created successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Could not create post." });
    }
  } else {
    res.status(400).json({ message: "Invalid request method." });
  }
}
