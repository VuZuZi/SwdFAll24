import React from "react";
import Head from "../components/Head";
import Layout from "../Layout/Layout";
function AboutUs() {
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4 ">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold ">
                Welcome to our MonterHub.
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Chào mừng bạn đến với MonsterHub - nơi thỏa mãn đam mê yêu
                  thích điện ảnh và giải trí! Với tập trung chất lượng và đa
                  dạng, MonsterHub mang đến cho bạn những trải nghiệm xem phim
                  tuyệt vời trên mọi thiết bị.
                </p>
                <p>
                  Với một thư viện phim phong phú bao gồm các thể loại từ hành
                  động, hài hước, kinh dị cho đến phim hoạt hình, bạn sẽ luôn có
                  lựa chọn thú vị cho mọi tâm trạng và sở thích. Chúng tôi cam
                  kết mang đến cho bạn những bộ phim mới nhất và cũng như những
                  tác phẩm kinh điển.
                </p>
                <p>
                  Tận hưởng trải nghiệm xem phim mượt mà với chất lượng hình ảnh
                  sắc nét và âm thanh sống động. Với giao diện thân thiện và dễ
                  sử dụng, bạn có thể tìm kiếm và trải nghiệm những bộ phim mà
                  mình yêu thích chỉ trong vài cú click.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold ">10K</span>
                  <h4 className="text-lg font-semibold my-2"> Listed Movies</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    MonterHub - Khám phá thế giới phim ảnh với trải nghiệm xem
                    phim tuyệt vời
                  </p>
                </div>
                <div className="p-6 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold ">8K</span>
                  <h4 className="text-lg font-semibold my-2"> Lovely User</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Đăng ký tài khoản ngay để không bỏ lỡ bất kỳ khoảnh khắc
                    giải trí nào.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="/images/aboutus.png"
                alt="aboutus"
                className="w-full xl:block hidden h-header object-cover "
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
