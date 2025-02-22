<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // เชื่อมกับตาราง users
            $table->decimal('balance', 10, 2)->default(0); // ยอดเงินในกระเป๋า
            $table->timestamps();
        });

        Schema::create('wallet_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id')->constrained()->onDelete('cascade'); // เชื่อมกับ wallets
            $table->decimal('amount', 10, 2); // จำนวนเงินที่เปลี่ยนแปลง
            $table->string('transaction_type'); // ประเภทธุรกรรม (เติมเงิน, ใช้จ่าย, คืนเงิน ฯลฯ)
            $table->string('status')->default('pending'); // สถานะของธุรกรรม
            $table->timestamp('transaction_date')->useCurrent(); // วันที่ทำธุรกรรม
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('wallet_transactions');
        Schema::dropIfExists('wallets');
    }
};
