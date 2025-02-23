<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->string('payment_method');
            $table->string('payment_status')->default('pending');
            $table->timestamp('payment_date')->useCurrent();
            $table->decimal('payment_amount', 10, 2);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('payments');
    }
};
