<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        if (!Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table) {
                $table->id();
                $table->foreignId('id_stores')->nullable()->constrained('stores')->onDelete('cascade'); // Changed from 'id_store' to 'id_stores'
                $table->string('ProductName'); // Changed from 'productName' to 'ProductName'
                $table->decimal('Price', 10, 2); // Changed from 'price' to 'Price'
                $table->integer('Stock')->default(0); // Added 'Stock' field
                $table->timestamp('CreatedAt')->useCurrent(); // Changed from 'createdAt' to 'CreatedAt'
                $table->string('ProductType'); // Changed from 'productType' to 'ProductType'
                $table->string('ProductStatus')->default('available'); // Changed from 'productStatus' to 'ProductStatus'
                $table->string('ProductImage')->nullable(); // Changed from 'productImage' to 'ProductImage'
                $table->text('ProductDescription')->nullable(); // Changed from 'productDescription' to 'ProductDescription'
                $table->integer('ProductRating')->default(0); // Changed from 'productRating' to 'ProductRating'
                $table->string('image')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
