// Icons
import { CiPaperplane, CiLocationArrow1  } from "react-icons/ci";

const Newsletter = ({ customClass }) => {
    
    return (
            <div className={customClass}>
                <CiLocationArrow1 className="text-3xl md:text-5xl text-custom" />
                <h2 className="!text-2xl md:text-3xl font-bold mb-2">Subscribe to our Newsletter!</h2>
                <p className="mb-4">
                    Subscribe to our email newsletter to get the latest posts delivered right to your email.
                </p>
                <form className="flex justify-center items-center gap-5 flex-col lg:flex-row w-full ">
                    <input 
                        className="tnp-email min-w-[250px] h-[60px] bg-white dark:bg-[#3b394a] py-4 px-5 w-full text-[#4B4870] dark:text-white outline-0" type="email" required name="ne" placeholder="Your email here"
                    >
                    </input>
                    <button 
                        className={`
                            tnp-submit relative group overflow-hidden bg-custom shadow-light dark:shadow-dark cursor-pointer text-white py-4 px-5 h-[60px] w-full lg:w-[20%] flex justify-center items-center gap-2 text-lg transition-all duration-300 ease-out shine-effect min-w-[200px]
                        `}
                        type="submit"
                    >
                        <span className="relative z-10 flex items-center gap-2 text-2xl">
                            <CiPaperplane />
                        </span>
                        Subscribe
                    </button>
                </form>
        </div>
    )
};

export default Newsletter;