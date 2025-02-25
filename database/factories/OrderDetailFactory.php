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
            'order_id' => Order::factory(), // ใช้ factory ของ Order
            'product_id' => Product::factory(), // ใช้ factory ของ Product
            'Quantity' => $this->faker->numberBetween(1, 5), // จำนวนสินค้า
            'UnitPrice' => $this->faker->randomFloat(2, 10, 500), // ราคาต่อหน่วย
            'Discount' => $this->faker->randomFloat(2, 0, 50), // ส่วนลด
            'ChangeReason' => $this->faker->word, // สาเหตุการเปลี่ยนแปลง
            'ChangeDate' => $this->faker->dateTimeThisYear(), // วันที่เปลี่ยนแปลง
        ];
    }
}
