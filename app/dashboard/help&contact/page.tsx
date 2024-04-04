import img from '../../../public/icon (1).png'
import SectionTitle from './../../../components/common/SectionTitle';
import Image from "next/image";
const page = () => {
    return (
        <div> 
            <SectionTitle title={'Help & Contact'} shortDescription={'Need answers or contact our Customer Service? You have come to the right place!'}/>
            <div className='grid lg:grid-cols-3 gap-5'>
                <div className=' border border-black shadow-md shadow-gray-600 p-3'>
                <Image src={img} alt='' className='mx-auto'/>
                <h2 className='text-primary font-semibold text-center'>My Purchases</h2>
                <p className='text-center'>Track, postpone or cancel my order, request a refund...</p>
            </div>
                <div className=' border border-black shadow-md shadow-gray-600 p-3'>
                <Image src={img} alt='' className='mx-auto'/>
                <h2 className='text-primary font-semibold text-center'>My Purchases</h2>
                <p className='text-center'>Track, postpone or cancel my order, request a refund...</p>
            </div>
                <div className=' border border-black shadow-md shadow-gray-600 p-3'>
                <Image src={img} alt='' className='mx-auto'/>
                <h2 className='text-primary font-semibold text-center'>My Purchases</h2>
                <p className='text-center'>Track, postpone or cancel my order, request a refund...</p>
            </div>
            </div>
        </div>
    );
};

export default page;