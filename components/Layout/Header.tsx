import {NextPage} from "next";
import {useSelector} from "react-redux";
import Link from "next/link";
const Header: NextPage = () => {
    const cart = useSelector((state: any) => state.cart)
    return (
        <>
            <h2><Link href="/cart"><a>Car ({cart.totalQuantity})</a></Link> </h2>
        </>
    )
}

export default Header;

