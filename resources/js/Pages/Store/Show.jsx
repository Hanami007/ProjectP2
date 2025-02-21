import { Link } from "@inertiajs/react"; // Ensure this import is correct

export default function Show({ store, products }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">
                {store.StoreName}
            </h1>
            <p className="text-center text-gray-700 mb-2">{store.Address}</p>
            <p className="text-center text-gray-700 mb-2">
                Rating: {store.Rating}
            </p>
            <p className="text-center text-gray-700 mb-6">
                Status: {store.StoreStatus}
            </p>

            <h2 className="text-xl font-semibold mb-4">Products:</h2>
            <div className="flex flex-wrap gap-4 justify-center">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center w-64"
                    >
                        <Link
                            href={route("products.show", product.id)} // Ensure route function is available
                            className="text-center"
                        >
                            <img
                                src={product.image_url || "default_image_url.jpg"} // Default image
                                alt={product.ProductName}
                                className="w-32 h-32 object-cover rounded-full mx-auto"
                            />
                            <h3 className="font-semibold mt-3">
                                {product.ProductName}
                            </h3>
                            <p className="text-gray-700">
                                ราคา: ${product.Price}
                            </p>
                            <p className="text-gray-600">
                                Stock: {product.Stock}
                            </p>
                            <p className="text-gray-600">
                                Category: {product.ProductType}
                            </p>
                            <p className="text-gray-500">
                                {product.Description}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>

            <Link
                href={route("stores.index")} // Ensure route function is available
                className="block mt-6 text-center text-indigo-600 hover:underline"
            >
                Back to all stores
            </Link>
        </div>
    );
}
