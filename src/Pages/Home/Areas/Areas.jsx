import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const Areas = () => {






    return (
        <div className="bg-[#222222] text-white mx-auto px-3 my-14 py-4 pb-4 lg:pb-10">
            <SectionTitle  title={"AREAS"}></SectionTitle>
            <div>
                <div className="grid  grid-cols-4">
                    <div className="  col-span-1">
                        <img className="h-60 w-full hover:scale-90 duration-300" src="https://i.ibb.co/gj95wMP/360-F-209705645-b78-HGJI1i1mxq-Lw-MYA7z1m3-Vv-Cxgx-JFO.jpg" alt="" />

                    </div>
                    <div className=" col-span-3">

                        <img className="h-60 w-full ml-2 hover:scale-90 duration-300 pr-2 mb-2" src="https://i.ibb.co/7VdC4p0/topic-london-gettyimages-760251843-feature.jpg" alt="" />

                    </div>
                    <div className="col-span-2 mt-2">
                        <img className="h-60 w-[95%] hover:scale-90  duration-300 ml-3" src="https://i.ibb.co/Pj5mpNS/pexels-photo-2779863-jpeg-cs-srgb-dl-pexels-nextvoyage-2779863.jpg" alt="" />
                    </div>
                    <div className="col-span-2 mt-2">
                        <img className="h-60 w-full hover:scale-90 duration-300 " src="https://i.ibb.co/hsHRJTD/140630124917-12-canada-most-beautiful-places.jpg" alt="" />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Areas;