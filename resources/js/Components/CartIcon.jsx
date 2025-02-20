import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const CartIcon = ({ cartCount }) => {
    return (
        <div className="relative">
            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"></path>
                </svg>
                {cartCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {cartCount}
                    </span>
                )}
            </Link>
        </div>
    );
};

export default CartIcon;
