<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
{
    $this->call([
        UserSeeder::class,
        StoreSeeder::class,
        ProductSeeder::class,
        OrderSeeder::class,
        OrderDetailSeeder::class,
        PaymentSeeder::class,
        DeliverySeeder::class,
    ]);
}

}
