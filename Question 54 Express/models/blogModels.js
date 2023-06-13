const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Must provide a title for Post"],
            trim: true,
            default: "My Blog Post"
        },
        authorId: {
            type: Number,
            required: [true, "Must provide an author ID"]
        }, 
        authorName: {
            type: String,
            required: [true, "Must provide an author name"]
        },
        slug: {
            type: String,
            lowercase: true,
            trim: true,
            required: [True, "Must provide slug of Post"]
        },
        content: {
            type: String,
            required: [true, "Content of blog must not be empty"],
            trim: true
        },
        published: {
            type: Boolean,
            required: [true, "Boolean of published is required"]
        },
        metaKeywords: [
            {
                type: String,
                trim: true
            }
        ]
    }, 
    { timestamps: true }
);

const blogPostModel = mongoose.model("Post", blogPostSchema)
module.exports = blogPostModel;