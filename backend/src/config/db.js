import mogooose from "mongoose";

export const connectDB = async () => {
  try {
    await mogooose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("liên kết cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("lỗi khi kết nối cơ sở dữ liệu", error);
    process.exit(1); // đóng cổng database
  }
};
