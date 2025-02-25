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
                $table->decimal('TotalAmount', 10, 2)->default(0.00);
                $table->string('payment_method')->nullable(); // เพิ่ม: วิธีการชำระเงิน (cod หรือ bank_transfer)
                $table->string('payment_status')->default('pending'); // เพิ่ม: สถานะการชำระเงิน
                $table->timestamps();
            });
        } else {
            Schema::table('orders', function (Blueprint $table) {
                $table->string('payment_method')->nullable()->after('TotalAmount');
                $table->string('payment_status')->default('pending')->after('payment_method');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
