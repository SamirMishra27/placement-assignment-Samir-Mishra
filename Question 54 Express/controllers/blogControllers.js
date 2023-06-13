const { Router } = require("express");
const blogPostSchema = require("../models/blogModels.js");

const apiRouter = Router();

apiRouter.route("/posts/:authorName/:authorId")

    // Get all posts by user
    .get(async (request, response) => {
        try {
            const { authorName, authorId } = request.params;
            const blogPostList = await blogPostSchema.find({ authorName: authorName }).sort("createdAt -updatedAt");
            response.status(201).json({
                success: true,
                message: "",
                blogPostList: blogPostList
            });

        } catch (error) {
            response.status(401).json({
                success: false,
                message: "Failed to retrieve data from database",
                error: error.message
            });
        }
    })

    // Create a new blog post by user
    .post(async (request, response) => {
        try {
            const { authorName, authorId } = request.params;
            const { 
                title,
                slug,
                content,
                published
             } = request.body;

            const blogPostDoc = await blogPostSchema.create({
                title: title,
                authorId: authorId,
                authorName: authorName,
                slug: slug,
                content: content,
                published: published
            });

            await blogPostDoc.save();
            response.status(201).json({
                success: true,
                message: "",
                blogPostDoc: blogPostDoc
            });

        } catch (error) {
            response.status(401).json({
                success: false,
                message: "Failed to create data in database",
                error: error.message
            });
        }
    });

apiRouter.route("/posts/:authorName/:slug")

    // Edit a blog post by user
    .put(async (request, response) => {
        try {
            const { authorName, slug } = request.params;
            const { 
                title,
                authorId,
                content,
                published
             } = request.body;

            const blogPostDoc = await blogPostSchema.findByIdAndUpdate(id, {
                title: title,
                authorId: authorId,
                authorName: authorName,
                slug: slug,
                content: content,
                published: published
            });
            await blogPostDoc.save();

            response.status(201).json({
                success: true,
                message: "",
                blogPostDoc: blogPostDoc
            })
        } catch (error) {
            response.status(401).json({
                success: false,
                message: "Failed to update data in database",
                error: error.message
            });
        }
    })

    // Delete a blog post by user
    .delete(async (request, response) => {
        try {
            const { authorName, slug } = request.params;

            await blogPostSchema.findByIdAndDelete(id);
            response.status(201).json({
                success: true,
                message: ""
            })
        } catch (error) {
            response.status(401).json({
                success: false,
                message: "Failed to delete data in database",
                error: error.message
            });
        }
    });

module.exports = apiRouter;