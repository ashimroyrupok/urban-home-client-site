/* eslint-disable react/prop-types */

const DetailsImages = ({images}) => {
    return (
      <div className="flex lg:flex-row flex-col gap-4 p-1 my-5">
        <div className="flex-1">
          <div className="relative group">
            <img
              width={600}
              height={450}
              className="w-full"
              alt="room_image"
              src={images ?? ""}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-3">
            {/** Repeat for each small image */}
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="relative group">
                <img
                  width={300}
                  height={220}
                  className="w-full"
                  src={images ?? ""}
                  alt="img"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default DetailsImages;