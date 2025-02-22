<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Changed from 'id_user' to 'user_id'
            'OrderStatus' => $this->faker->randomElement(['Pending', 'Completed', 'Canceled']), // Changed from 'orderStatus' to 'OrderStatus'
            'OrderDate' => $this->faker->dateTimeThisMonth(), // Changed from 'orderDate' to 'OrderDate'
            'TotalAmount' => $this->faker->randomFloat(2, 100, 1000), // Changed from 'totalAmount' to 'TotalAmount'
            'payment_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
