const mongoose = require("mongoose");
require("dotenv").config();

const Ad = require("./src/models/ad");
const User = require("./src/models/user");
const Category = require("./src/models/Category");
mongoose.connect("mongodb://127.0.0.1:27017/rao-vat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    await Ad.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});

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
        category: { name: "Đồ điện tử", subcategory: ["Điện thoại"] },
        price: 25000000,
        location: "Hà Nội",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1593642632740-3e7d7e4d6e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGlwaG9uZXxlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1602311122495-0d8b633d57a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fGlwaG9uZXxlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1610934385036-6f73f9f892a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEwfHxpUGhvbmV8ZW58MHx8fHwxNjEwODUyMDA1&ixlib=rb-1.2.1&q=80&w=400",
        ],
      },
      {
        title: "Laptop Dell XPS 13",
        description: "Laptop mỏng nhẹ, cấu hình mạnh, màn hình Full HD.",
        category: { name: "Máy tính", subcategory: ["Laptop"] },
        price: 18000000,
        location: "Hồ Chí Minh",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE1fHxMYXB0b3AlMjBEZWxsJTIwWFA1fGVufDB8fHx8MTYxMDg1MjAwNQ&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE1fHxMYXB0b3AlMjBEZWxsJTIwWFA1fGVufDB8fHx8MTYxMDg1MjAwNQ&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE1fHxMYXB0b3AlMjBEZWxsJTIwWFA1fGVufDB8fHx8MTYxMDg1MjAwNQ&ixlib=rb-1.2.1&q=80&w=400",
        ],
      },
      {
        title: "Xe máy Honda Air Blade",
        description: "Xe mới mua 6 tháng, chính chủ, màu đen.",
        category: { name: "Xe cộ", subcategory: ["Xe máy"] },
        price: 35000000,
        location: "Đà Nẵng",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1588123451878-11c711b87971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI0fHxlYi1tb2JpbGV8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1568442681928-80cf3ecb0c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE0fHxlYi1tb2JpbGV8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1587781508808-7994897c9b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDMwfHxwYXJ0cyUyMGdlcm1hbnRlc3xlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400",
        ],
      },
      {
        title: "Máy tính để bàn HP",
        description: "Máy tính để bàn mới, bảo hành 12 tháng.",
        category: { name: "Máy tính", subcategory: ["Máy tính để bàn"] },
        price: 12000000,
        location: "Cần Thơ",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1571590336107-8dc673a80310?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fG5vdGUlMjBzdHJpbmd8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1547657162-54d6c9c03703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDg1fHxNZXNqYXJkb3x8ZW58MHx8fHwxNjEwODUyMDA3&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1593642532740-3e7d7e4d6e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDEwfHxNZXNqYXJkb3xlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400",
        ],
      },
      {
        title: "Ghế sofa cao cấp",
        description: "Ghế sofa mới, thiết kế hiện đại, rất thoải mái.",
        category: { name: "Nội thất", subcategory: ["Ghế"] },
        price: 7000000,
        location: "Hà Nội",
        postedBy: user._id,
        images: [
          "https://images.unsplash.com/photo-1575154118477-309f0d70c76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE5fHxzb2ZhJTIwZ2FybGV0JTIwcGFydHxlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1601980366907-dbf688c944c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDI1fHxzb2ZhJTIwcGFydHxlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400",
          "https://images.unsplash.com/photo-1570988919073-d68c87360a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE2fHxzb2ZhJTIwcGFydHxlbnwwfHx8fDE2MTA4NTIwMDU&ixlib=rb-1.2.1&q=80&w=400",
        ],
      },
    ];

    await Ad.insertMany(ads);

    const categories = [
      {
        name: "Xe cộ",
        subcategories: [
          "Xe máy",
          "Ô tô",
          "Xe đạp",
          "Xe tải, Xe khách",
          "Phụ tùng, linh kiện",
        ],
      },
      {
        name: "Bất động sản",
        subcategories: ["Nhà đất", "Căn hộ", "Văn phòng"],
      },
      {
        name: "Đồ điện tử",
        subcategories: ["Điện thoại", "Máy tính", "TV"],
      },
      {
        name: "Thời trang",
        subcategories: ["Áo Quần", "Đầm cưới", "Trang sức"],
      },
      {
        name: "Nội thất",
        subcategories: ["Ghế", "Bàn", "Tủ"],
      },
    ];
    const insertedCategories = await Category.insertMany(categories);
    console.log("Danh mục đã được chèn:", insertedCategories);
  } catch (error) {
    console.error("Lỗi khi thêm dữ liệu:", error);
  }
};

seedDatabase();
