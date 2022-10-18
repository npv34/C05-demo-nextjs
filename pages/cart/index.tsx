import { NextPage } from "next";
import {useDispatch, useSelector} from "react-redux";
import {removeProduct} from "../../redux/features/cartSlice";
import Link from "next/link";

const Cart: NextPage = () => {
    const cart = useSelector((state: any) => state.cart)
    const dispatch = useDispatch();

    const handlerDeleteItemToCart = (index: number) => {
        dispatch(removeProduct(index))
    }
    return (
        <>
            <table>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Img</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                {cart && cart.items.map((item:any, index: number) => (
                    <tr key={item.id}>
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            <img src={item.img} alt=""/>
                        </td>
                        <td>
                            {item.price}
                        </td>
                        <th>
                            <button onClick={() => handlerDeleteItemToCart(index)}>Delete</button>
                        </th>
                    </tr>
                ))}

            </table>
            <h2>TotalMoney: {cart.totalMoney}</h2>
            <Link href="/products"><a>Back</a></Link>
        </>
    )
}

export default Cart
