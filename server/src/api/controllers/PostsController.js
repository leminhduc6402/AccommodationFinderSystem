import { createError } from "../../utils/error.js";
import PostModel from "../models/post.js";
import FollowModel from "../models/follow.js";
import NotificationModel from "../models/notification.js";

const PostsController = {
  // [POST] /api/posts/create/ {name, content, price, images, acreage, longitude, latitude, address, userId, categoryId}
  create: async (req, res, next) => {
    try {
      const files = req.files;
      const paths = files?.map((file) => file.path);
      if (paths.length > 5) {
        res.status(400).send("Upload maximum 5 photos");
        return next(createError(400, "Upload maximum 5 photos"));
      }
      const {
        name,
        content,
        price,
        acreage,
        longitude,
        latitude,
        district,
        province,
        ward,
        address,
        userId,
        categoryId,
      } = req.body;
      const post = await PostModel.create({
        name,
        content,
        price,
        images: paths,
        acreage,
        longitude,
        latitude,
        district,
        province,
        ward,
        address,
        categoryId,
        active: 0,
        userId,
      });

      // const followers = await FollowModel.find({follower: userId})
      // const notifications = 

      return res.status(201).json(post);
    } catch (error) {
      return next(error);
    }
  },

  // [GET] /api/posts/ { price, acreage, categoryId, province, district, ward, longitude, latitude }
  getAllPost: async (req, res, next) => {
    try {
      const query = {};
      const {
        price,
        acreage,
        categoryId,
        province,
        district,
        ward,
        longitude,
        latitude,
      } = req.query;

      if (price) {
        query.price = { $lte: parseFloat(price) };
      }

      if (acreage) {
        query.acreage = { $lte: parseFloat(acreage) };
      }

      if (categoryId) {
        query.categoryId = { $eq: categoryId };
      }

      if (province) {
        query.province = { $eq: province };
        if (district) {
          query.district = { $eq: district };
          if (ward) {
            query.ward = { $eq: ward };
          }
        }
      }
      if (categoryId) {
        query.categoryId = { $eq: categoryId };
      }

      if (longitude && latitude) {
        query.longitude = {
          $lte: parseFloat(longitude) + 0.05,
          $gte: parseFloat(longitude) - 0.05,
        }; // Khoảng cách dự đoán: ~5km
        query.latitude = {
          $lte: parseFloat(latitude) + 0.05,
          $gte: parseFloat(latitude) - 0.05,
        }; // Khoảng cách dự đoán: ~5km
      }

      const posts = await PostModel.find(query).populate("userId");

      if (!posts) {
        return res.status(404).send("Posts not found");
      }
      return res.status(200).json(posts);
    } catch (error) {
      return next(error);
    }
  },

  // [GET] /api/posts/:id
  getPost: async (req, res, next) => {
    try {
      const post = await PostModel.findById({ _id: req.params.id }).populate(
        "userId"
      );
      if (!post) {
        return res.status(404).send("Post not found!!!");
      }
      return res.status(200).json(post);
    } catch (error) {
      return next(error);
    }
  },

  // [GET] /api/posts/manage/:id
  getAllPostByUserId: async (req, res, next) => {
    try {
      const posts = await PostModel.find({
        userId: req.params.id,
        categoryId: req.query?.categoryId,
      });
      if (posts.length === 0) {
        return res.status(404).send("Posts not found");
      }
      return res.status(200).json(posts);
    } catch (error) {
      return next(error);
    }
  },

  // [DELETE] /api/posts/:id
  delete: async (req, res, next) => {
    try {
      const post = await PostModel.delete({ _id: req.params.id });

      if (post.modifiedCount === 0) {
        return res.status(400).send("Something wrong!!!");
      }

      return res.status(200).send("Post has delete");
    } catch (error) {
      return next(error);
    }
  },
};

export default PostsController;
