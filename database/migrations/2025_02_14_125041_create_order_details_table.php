<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_order')->constrained('orders')->onDelete('cascade'); // Changed from 'id_order' to 'id_order'
            $table->foreignId('ProductID')->constrained('products')->onDelete('cascade'); // Changed from 'productID' to 'ProductID'
            $table->integer('Quantity'); // Changed from 'quantity' to 'Quantity'
            $table->decimal('UnitPrice', 10, 2); // Changed from 'unitPrice' to 'UnitPrice'
            $table->decimal('Discount', 10, 2)->default(0); // Changed from 'discount' to 'Discount'
            $table->string('ChangeReason')->nullable(); // Changed from 'changeReason' to 'ChangeReason'
            $table->timestamp('ChangeDate')->nullable(); // Changed from 'changeDate' to 'ChangeDate'
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('order_details');
    }
};
