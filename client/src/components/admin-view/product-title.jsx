import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

export function AdminProductTitle({ product, handleDeleteProduct, setFormData, setOpenFormCreate, setCurrentProductId }) {

    const handleUpdate = (product) => {
        console.log("update prod", product);
        setCurrentProductId(product._id)
        setOpenFormCreate(true)
        setFormData(product)
    }
    return (
        <Card className="w-full pt-0">
            <div>
                <div className="relative w-full overflow-hidden">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[250px] object-cover rounded-t-lg"
                    />
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold">{product?.title}</h2>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-md font-light">${product.price}</p>
                        <p>${product.salePrice}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center mt-8">
                    <Button onClick={() => { handleUpdate(product) }} >Edit</Button>
                    <Button onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}
