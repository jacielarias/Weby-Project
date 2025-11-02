import Link from "next/link";

const Logo = ({ textSize }) => {
    return (
        <Link href={"/"} className="flex items-center gap-4">
            <h1 className={`${textSize} font-extrabold`}>
                <span className="text-custom">W</span>eby
            </h1>
        </Link>
    )
}

export default Logo;