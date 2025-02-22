<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition()
    {
        return [
            'id_order' => Order::factory(),
            'PaymentMethod' => $this->faker->randomElement(['Credit Card', 'PayPal', 'Bank Transfer']), // Changed from 'paymentMethod' to 'PaymentMethod'
            'PaymentStatus' => $this->faker->randomElement(['Pending', 'Completed']), // Changed from 'paymentStatus' to 'PaymentStatus'
            'PaymentDate' => $this->faker->dateTimeThisYear(), // Changed from 'paymentDate' to 'PaymentDate'
            'PaymentAmount' => $this->faker->randomFloat(2, 50, 1000), // Changed from 'paymentAmount' to 'PaymentAmount'
        ];
    }
}
