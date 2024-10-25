const mongoose = require("mongoose");
require("dotenv").config();

const Ad = require("./src/models/ad");
const User = require("./src/models/user");

mongoose.connect("mongodb://127.0.0.1:27017/rao-vat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    await Ad.deleteMany({});
    await User.deleteMany({});

    const user = new User({
      email: "testuser@example.com",
      first_name: "John",
      last_name: "Doe",
      phone: "123456789",
      password: "password123",
      role: "user",
    });
    await user.save();

    const ads = [
      {
        title: "Bán iPhone 12 Pro Max",
        description: "Điện thoại mới 99%, đầy đủ phụ kiện.",
        category: "Electronics",
        price: 25000000,
        location: "Hà Nội",
        postedBy: user._id,
        images: ["https://example.com/image1.jpg"],
      },
      {
        title: "Laptop Dell XPS 13",
        description: "Laptop mỏng nhẹ, cấu hình mạnh, màn hình Full HD.",
        category: "Computers",
        price: 18000000,
        location: "Hồ Chí Minh",
        postedBy: user._id,
        images: ["https://example.com/image2.jpg"],
      },
      {
        title: "Xe máy Honda Air Blade",
        description: "Xe mới mua 6 tháng, chính chủ, màu đen.",
        category: "Vehicles",
        price: 35000000,
        location: "Đà Nẵng",
        postedBy: user._id,
        images: ["https://example.com/image3.jpg"],
      },
    ];

    await Ad.insertMany(ads);

    console.log("Dữ liệu đã được thêm thành công!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Lỗi khi thêm dữ liệu:", error);
  }
};

seedDatabase();