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
            'order_id' => Order::factory(),
            'payment_method' => $this->faker->randomElement(['Credit Card', 'PayPal', 'Bank Transfer']), // Changed from 'paymentMethod' to 'PaymentMethod'
            'payment_status' => $this->faker->randomElement(['Pending', 'Completed']), // Changed from 'paymentStatus' to 'PaymentStatus'
            'Payment_Date' => $this->faker->dateTimeThisYear(), // Changed from 'paymentDate' to 'PaymentDate'
            'Payment_Amount' => $this->faker->randomFloat(2, 50, 1000), // Changed from 'paymentAmount' to 'PaymentAmount'
        ];
    }
}
