<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // ลิงก์ไปยังสินค้า
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ลิงก์ไปยังผู้ใช้
            $table->integer('rating')->unsigned(); // คะแนนรีวิว (1-5)
            $table->text('comment')->nullable(); // คอมเมนต์รีวิว
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};
