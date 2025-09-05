import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import OrderDetail from './order-detail'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderAdmin } from '@/store/adminSlice/order'
import { Badge } from '../ui/badge'
import Loading from '../common/loading'
const AdminOrderView = () => {
    const dispatch = useDispatch()
    const [opentDialogDetail, setOpentDialogDetail] = useState(false)
    const [currentOrderIdSelected, setCurrentOrderIdSelected] = useState(null)
    const { orderList } = useSelector(state => state.adminOrder)
    useEffect(() => {
        dispatch(getAllOrderAdmin())
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
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className='sr-only'>Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {orderList && orderList.length > 0
                            ? orderList.map((orderItem, index) => (
                                <TableRow key={orderItem._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{orderItem.orderDate.split('T')[0]}</TableCell>
                                    <TableCell><Badge className={`text-md ${orderItem.orderStatus === 'confirm' ? 'bg-green-600' : ""}`}>{orderItem.orderStatus}</Badge></TableCell>
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
                                            {orderItem._id === currentOrderIdSelected ? <OrderDetail isAdmin={true} orderDetail={orderItem} /> : ""}
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

export default AdminOrderView