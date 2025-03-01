import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionSimple } from "react-icons/pi";
import { RiMovie2Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

export const navigation = [
    {
        label: "TV Shows",
        href: 'tv',
        icon: <PiTelevisionSimple />
    },
    {
        label: "Movies",
        href: 'movie',
        icon: <RiMovie2Line />
    },
]

export const mobileNavigation = [
    {
        label: "Home",
        href: "/",
        icon: <MdHomeFilled />
    },
    ...navigation,
    {
        label: "Search",
        href: "search",
        icon: <FaSearch />
    }
]