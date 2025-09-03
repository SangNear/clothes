import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import OrderDetail from './order-detail'
const AdminOrderView = () => {
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
                        
                        <TableRow>
                            <TableCell>123456</TableCell>
                            <TableCell>26/7/1999</TableCell>
                            <TableCell>Process</TableCell>
                            <TableCell>54.00</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button className="cursor-pointer">View Detail</Button>
                                    </DialogTrigger>
                                    <OrderDetail />
                                </Dialog>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOrderView