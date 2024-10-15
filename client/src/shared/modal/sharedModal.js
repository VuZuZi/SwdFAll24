import React from "react";
import MainModal from "./MainModal";
import { Input } from "../input";
import {
  FaFacebook,
  FaPinterest,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { MdMail } from "react-icons/md";
import {
  FacebookShareButton,
  MailruShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
function ShareMovieModal({ modalOpen, setModalOpen, movie }) {
  const shareData = [
    {
      incon: FaFacebook,
      shareButton: FacebookShareButton,
    },
    {
      incon: FaTwitter,
      shareButton: TwitterShareButton,
    },
    {
      incon: FaTelegram,
      shareButton: TelegramShareButton,
    },
    {
      incon: MdMail,
      shareButton: MailruShareButton,
    },
    {
      incon: FaPinterest,
      shareButton: PinterestShareButton,
    },
    {
      incon: FaWhatsapp,
      shareButton: WhatsappShareButton,
    },
  ];
  const url = `${window.location.protocol}//${window.location.host}/movie/${movie._id}`;
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border z-100 relative border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main  text-white rounded-2xl">
        <h2 className="text-2xl ">
          Share <span className="text-xl font-bold"> '{movie.name}'</span>
        </h2>
        <form className="flex-rows flex-wrap gap-6 mt-6">
          {shareData.map((data, index) => (
            <data.shareButton
              key={index}
              url={url}
              quote="Monterhub.| Watch and Download Free Movie"
            >
              <div className="w-12 tranistions hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30  ">
                <data.incon />
              </div>
            </data.shareButton>
          ))}
        </form>
      </div>
    </MainModal>
  );
}

export default ShareMovieModal;
