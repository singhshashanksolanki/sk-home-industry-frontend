import moment from "moment";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { getUserDetails } from "../Redux/Actions/userActions";
import { listMyOrders } from "../Redux/Actions/OrderActions";
import Header from "../components/Header";


const OrdersScreen = () => {
  
    window.scrollTo(0, 0);

    const dispatch = useDispatch();

    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;

    useEffect(() => {
        dispatch(listMyOrders());
        dispatch(getUserDetails("profile"));
    }, [dispatch]);

  return (
    <>
        <Header />
        <div className="ordersScreenContainer">
            <div className=" d-flex justify-content-center align-items-center flex-column">
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                <>
                {orders.length === 0 ? (
                    <div className="col-12 alert alert-info text-center mt-3">
                    No Orders
                    <Link
                        className="btn btn-success mx-2 px-3 py-2"
                        to="/"
                        style={{
                        fontSize: "12px",
                        }}
                    >
                        START SHOPPING
                    </Link>
                    </div>
                ) : (
                    <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>STATUS</th>
                            <th>PAID</th>
                            <th>PAYMENT METHOD</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr
                            className={`${
                                order.paymentMethod !== "POD (Pay On Delivery)" ?  (order.isPaid ? "alert-success" : "alert-danger") : "alert-success"
                            }`}
                            key={order._id}
                            >
                            <td>
                                <a href={`/order/${order._id}`} className="link">
                                {order._id}
                                </a>
                            </td>
                            <td>{order.status}</td>
                            <td>{order.paymentMethod !== "POD (Pay On Delivery)" ? (order.isPaid ? <>Paid</> : <>Not Paid</>) : <>N/A</>}</td>
                            <td>{order.paymentMethod}</td>
                            <td>
                                {order.isPaid
                                ? moment(order.paidAt).calendar()
                                : moment(order.createdAt).calendar()}
                            </td>
                            <td>₹{order.totalPrice}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                )}
                </>
            )}
            </div>
        </div>
    </>
  );
};

export default OrdersScreen;
