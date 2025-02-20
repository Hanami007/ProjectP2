<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        // Users Table
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // เปลี่ยนจาก UserID เป็น id
            $table->string('Name');
            $table->string('Email')->unique();
            $table->string('Phone')->nullable();
            $table->string('Password');
            $table->decimal('Wallet', 10, 2)->default(0);
            $table->string('Picture')->nullable();
            $table->date('BirthDay')->nullable();
            $table->string('Sex')->nullable();
            $table->text('Address')->nullable();
            $table->string('Role')->default('customer');
            $table->timestamp('CreatedAt')->useCurrent();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // Password Reset Tokens Table
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Sessions Table
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
