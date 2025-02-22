<?php

namespace Database\Factories;

use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderDetailFactory extends Factory
{
    protected $model = OrderDetail::class;

    public function definition()
    {
        return [
            'order_id' => Order::factory(), // Changed from 'id_order' to 'id_order'
            'ProductID' => Product::factory(), // Changed from 'productID' to 'ProductID'
            'Quantity' => $this->faker->numberBetween(1, 5), // Changed from 'quantity' to 'Quantity'
            'UnitPrice' => $this->faker->randomFloat(2, 10, 500), // Changed from 'unitPrice' to 'UnitPrice'
            'Discount' => $this->faker->randomFloat(2, 0, 50), // Changed from 'discount' to 'Discount'
            'ChangeReason' => $this->faker->word, // Changed from 'changeReason' to 'ChangeReason'
            'ChangeDate' => $this->faker->dateTimeThisYear(), // Changed from 'changeDate' to 'ChangeDate'
        ];
    }
}
