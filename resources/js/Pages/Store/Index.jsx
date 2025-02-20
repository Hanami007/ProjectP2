import { Link } from '@inertiajs/react';

export default function Index({ stores }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">All Stores</h1>
            <ul className="space-y-4">
                {stores.map((store) => (
                    <li key={store.id} className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                        <Link href={route('stores.show', store.id)} className="text-lg font-semibold text-indigo-600 hover:underline">
                            {store.StoreName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
