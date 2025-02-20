import { Link } from '@inertiajs/react';

export default function Show({ store, products }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">{store.StoreName}</h1>
            <p className="text-center text-gray-700 mb-2">{store.Address}</p>
            <p className="text-center text-gray-700 mb-2">Rating: {store.Rating}</p>
            <p className="text-center text-gray-700 mb-6">Status: {store.StoreStatus}</p>

            <h2 className="text-xl font-semibold mb-4">Products:</h2>
            <ul className="space-y-4">
                {products.map((product) => (
                    <li key={product.id} className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                        {product.ProductName} - ${product.Price}
                    </li>
                ))}
            </ul>

            <Link href={route('stores.index')} className="block mt-6 text-center text-indigo-600 hover:underline">
                Back to all stores
            </Link>
        </div>
    );
}
