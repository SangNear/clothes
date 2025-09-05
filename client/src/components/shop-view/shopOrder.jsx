import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import OrderDetail from '../admin-view/order-detail'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderByUser } from '@/store/order-slice'
import Loading from '../common/loading'
import { Badge } from '../ui/badge'

const ShoppingOders = () => {
    const [opentDialogDetail, setOpentDialogDetail] = useState(false)
    const [currentOrderIdSelected, setCurrentOrderIdSelected] = useState(null)
    const { user } = useSelector(state => state.auth)
    const { orderList, orderDetail } = useSelector(state => state.order)

    const dispatch = useDispatch()
    useEffect(() => {
        if (user?.id) {
            dispatch(getAllOrderByUser(user.id))
                .then((data) => console.log("all orders", data.payload))
        }

    }, [dispatch])
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Order History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>STT</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className='sr-only'>Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderList && orderList.data && orderList.data.length > 0
                            ? orderList.data.map((orderItem, index) => (
                                <TableRow key={orderItem._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{orderItem.orderDate.split('T')[0]}</TableCell>
                                    <TableCell><Badge className={`text-md ${orderItem.orderStatus === 'confirm'? 'bg-green-600' : ""}` }>{orderItem.orderStatus}</Badge></TableCell>
                                    <TableCell>{orderItem.totalAmount}</TableCell>
                                    <TableCell>
                                        <Dialog open={opentDialogDetail} onOpenChange={setOpentDialogDetail}>
                                            <Button
                                                onClick={() => {
                                                    setCurrentOrderIdSelected(orderItem._id),
                                                        setOpentDialogDetail(true)
                                                }
                                                }
                                                className="cursor-pointer"
                                            >
                                                View Detail
                                            </Button>
                                            {orderItem._id === currentOrderIdSelected ? <OrderDetail isAdmin={false} orderDetail={orderItem} /> : ""}
                                        </Dialog>


                                    </TableCell>
                                </TableRow>
                            ))

                            :
                            <Loading />
                        }
                    </TableBody>
                </Table>
            </CardContent>

        </Card>
    )
}

export default ShoppingOders