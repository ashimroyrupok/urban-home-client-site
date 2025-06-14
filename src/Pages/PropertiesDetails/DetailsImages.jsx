/* eslint-disable react/prop-types */

const DetailsImages = ({ property }) => {
  return (
    <div className="flex lg:flex-row flex-col gap-4 p-1 my-5">
      <div className="flex-1">
        <div className="relative group">
          <img
            width={600}
            height={450}
            className="w-full"
            alt="room_image"
            src={property?.images?.[0] ?? ""}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
        </div>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-3">
          {/** Repeat for each small image */}

          <div className="relative group">
            <img
              width={300}
              height={220}
              className="w-full"
              src={
                property?.images?.[1] ??
                "https://i.ibb.co/bRzjXVB/real-estate-property.jpg"
              }
              alt="img"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </div>
          <div className="relative group">
            <img
              width={300}
              height={220}
              className="w-full"
              src={
                property?.images?.[2] ??
                "https://i.ibb.co/bRzjXVB/real-estate-property.jpg"
              }
              alt="img"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </div>
          <div className="relative group">
            <img
              width={300}
              height={220}
              className="w-full"
              src={
                property?.images?.[3] ??
                "https://i.ibb.co/bRzjXVB/real-estate-property.jpg"
              }
              alt="img"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </div>
          <div className="relative group">
            <img
              width={300}
              height={220}
              className="w-full"
              src={
                property?.images?.[4] ??
                "https://i.ibb.co/bRzjXVB/real-estate-property.jpg"
              }
              alt="img"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsImages;
