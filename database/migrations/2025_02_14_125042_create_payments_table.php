<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->string('PaymentMethod'); // Changed from 'paymentMethod' to 'PaymentMethod'
            $table->string('PaymentStatus')->default('pending'); // Changed from 'paymentStatus' to 'PaymentStatus'
            $table->timestamp('PaymentDate')->useCurrent(); // Changed from 'paymentDate' to 'PaymentDate'
            $table->decimal('PaymentAmount', 10, 2); // Changed from 'paymentAmount' to 'PaymentAmount'
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('payments');
    }
};
