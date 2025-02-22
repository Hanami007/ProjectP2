<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        if (!Schema::hasTable('orders')) {
            Schema::create('orders', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->string('OrderStatus')->default('pending');
                $table->timestamp('OrderDate')->useCurrent();
                $table->decimal('TotalAmount', 10, 2)->default(1);
                $table->foreignId('payment_id')->nullable()->constrained('payments')->onDelete('cascade');
                $table->timestamps();
            });
        }
    }

    public function down() {
        Schema::dropIfExists('orders');
    }
};
