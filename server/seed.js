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
        images: [
          "https://images.unsplash.com/photo-1593642632740-3e7d7e4d6e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGlwaG9uZXxlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1602311122495-0d8b633d57a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGlwaG9uZXxlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1610934385036-6f73f9f892a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEwfHxpUGhvbmV8ZW58MHx8fHwxNjEwODUyMDA1&ixlib=rb-1.2.1&q=80&w=400"
        ],
      },
      {
        title: "Laptop Dell XPS 13",
        description: "Laptop mỏng nhẹ, cấu hình mạnh, màn hình Full HD.",
        category: "Computers",
        price: 18000000,
        location: "Hồ Chí Minh",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE1fHxMYXB0b3AlMjBEZWxsJTIwWFA1fGVufDB8fHx8MTYxMDg1MjAwNQ&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1512223782101-09c3b51f62d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEwfHxsYXB0b3B8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1519337267534-d4b17b16759a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDExfHxMYXB0b3AlMjBEZWxsJTIwWFA1fGVufDB8fHx8MTYxMDg1MjAwNQ&ixlib=rb-1.2.1&q=80&w=400"
        ],
      },
      {
        title: "Xe máy Honda Air Blade",
        description: "Xe mới mua 6 tháng, chính chủ, màu đen.",
        category: "Vehicles",
        price: 35000000,
        location: "Đà Nẵng",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1588123451878-11c711b87971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI0fHxlYi1tb2JpbGV8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1568442681928-80cf3ecb0c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE0fHxlYi1tb2JpbGV8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1587781508808-7994897c9b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDMwfHxwYXJ0cyUyMGdlcm1hbnRlc3xlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400"
        ],
      },
      {
        title: "Máy tính để bàn HP",
        description: "Máy tính để bàn mới, bảo hành 12 tháng.",
        category: "Computers",
        price: 12000000,
        location: "Cần Thơ",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1571590336107-8dc673a80310?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fG5vdGUlMjBzdHJpbmd8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1547657162-54d6c9c03703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDg1fHxNZXNqYXJkb3x8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1511006910431-4b9b1bc0c978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDgwfHxMZXB0b3B8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400"
        ],
      },
      {
        title: "Xe đạp thể thao",
        description: "Xe đạp mới, chưa sử dụng, kích thước 26 inch.",
        category: "Vehicles",
        price: 5000000,
        location: "Nha Trang",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDMwfHxlYi1yYW5nZXxlbnwwfHx8fDE2MTA4NTIwMDg&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDMwfHxlYi1yYW5nZXxlbnwwfHx8fDE2MTA4NTIwMDg&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDMwfHxlYi1yYW5nZXxlbnwwfHx8fDE2MTA4NTIwMDg&ixlib=rb-1.2.1&q=80&w=400"
        ],
      },
      {
        title: "Áo thun Unisex",
        description: "Áo thun thời trang, nhiều màu sắc.",
        category: "Fashion",
        price: 250000,
        location: "Hà Nội",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1527745548650-1b032a90d765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDB8fGFvdCUyMHR1bmV8ZW58MHx8fHwxNjEwODUyMDA4&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1576017208773-b7b451f6c15d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDB8fGFvdCUyMHR1bmV8ZW58MHx8fHwxNjEwODUyMDA4&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1510294402525-8e3839f6c098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGFvdCUyMHR1bmV8ZW58MHx8fHwxNjEwODUyMDA4&ixlib=rb-1.2.1&q=80&w=400"
        ],
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
