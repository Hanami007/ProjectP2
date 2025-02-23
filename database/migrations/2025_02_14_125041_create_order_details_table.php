<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade'); // Changed from 'id_order' to 'id_order'
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Changed from 'productID' to 'ProductID'
            $table->integer('quantity'); // Changed from 'quantity' to 'Quantity'
            $table->decimal('unitPrice', 10, 2)->default(0); // Changed from 'unitPrice' to 'UnitPrice'
            $table->decimal('discount', 10, 2)->default(0); // Changed from 'discount' to 'Discount'
            $table->string('changeReason')->nullable(); // Changed from 'changeReason' to 'ChangeReason'
            $table->timestamp('changeDate')->nullable(); // Changed from 'changeDate' to 'ChangeDate'
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('order_details');
    }
};
