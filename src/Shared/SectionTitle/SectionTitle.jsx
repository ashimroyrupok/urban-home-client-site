
const SectionTitle = ({title}) => {
    return (
        <div className='flex flex-col text-center items-center my-9 justify-center'>
            <h2 className=' text-2xl md:text-4xl font-bold text-center'> {title} </h2>
            <hr className='bg-[#F2561B] my-3 w-[20%] h-1 text-center'></hr>
        </div>
    );
};

export default SectionTitle;