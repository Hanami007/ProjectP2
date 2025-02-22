<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id('DeliveryID');
            $table->foreignId('id_order')->constrained('orders')->onDelete('cascade');
            $table->string('ShipperName');
            $table->string('Email')->nullable();
            $table->string('Phone')->nullable();
            $table->string('TrackingNumber')->nullable();
            $table->string('DeliveryStatus')->default('pending');
            $table->timestamp('DeliveryDate')->nullable();
            $table->text('Address');
            $table->string('Picture')->nullable();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('deliveries');
    }
};
