import React from "react";
import { FiUser } from "react-icons/fi";
function Promos() {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed  ">
            Download MonterHub.App Watch Offline <br /> Enjoy on your mobile
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            MonterHub -Khám phá thế giới giải trí di động tuyệt vời với ứng dụng
            xem phim của chúng tôi! Với hơn hàng nghìn bộ phim đa dạng và phong
            phú, bạn sẽ được trải nghiệm những khoảnh khắc thú vị ngay trên
            chiếc điện thoại của mình. Tận hưởng chất lượng hình ảnh sắc nét
            cùng âm thanh chất lượng cao mọi lúc, mọi nơi. Đặc biệt, chế độ xem
            tiện lợi và tùy chỉnh sẽ giúp bạn dễ dàng tìm kiếm và thưởng thức
            những bộ phim ưa thích. Hãy tải ngay ứng dụng của chúng tôi và bắt
            đầu hành trình giải trí không giới hạn trên điện thoại của bạn!
          </p>
          <div className="flex gap-4 md:text-lg text-sm ">
            <div className="flex-colo bg-black text-subMain px-5 py-1 rounded font-bold">
              HD 4k
            </div>
            <div className="flex-rows gap-4  bg-black text-subMain px-5 py-1 rounded font-bold">
              <FiUser />
              2K
            </div>
          </div>
        </div>
        <div className="">
          <img
            src="/images/mobile.png"
            alt="Mobile App"
            className="w-80 h-100 items-center object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Promos;
