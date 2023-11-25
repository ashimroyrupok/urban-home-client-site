import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { Avatar } from '@mui/material';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
const Review = () => {
    const axiosPublic = useAxiosPublic()
    const { data: reviews = [] } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get('http://localhost:5000/reviews')
            return res.data

        }
    })

    console.log(reviews.length);
    return (
        <div className='my-10 '>
            <SectionTitle title={"WHAT OUR CLIENTS ARE SAYING"}></SectionTitle>

            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >

                {
                    reviews?.map((review, idx) => <SwiperSlide key={idx}>
                        <div className='flex flex-col max-w-3xl mx-auto justify-center items-center gap-2'>
                            <p className='text-center'> {review?.description} </p>
                            <Avatar
                                alt="Remy Sharp"
                                src={review?.image}
                                sx={{ width: 80, height: 80, mt: "30px" }}
                            />
                            <p className='text-sm'> {review?.title} </p>
                            <p className='font-semibold '>{review?.name}</p>
                        </div>
                    </SwiperSlide>)
                }
                {/* <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>

        </div>
    );
};

export default Review;