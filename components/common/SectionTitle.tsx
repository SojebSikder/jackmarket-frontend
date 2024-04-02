
const SectionTitle = ({title,shortDescription}) => {
    return (
        <div className=" text-center my-5 text-secondary ">
            <h1 className=" font-bold text-3xl">{title}</h1>
            <p className="text-gray-600 mt-3 ">{shortDescription}</p>
        </div>
    );
};

export default SectionTitle;