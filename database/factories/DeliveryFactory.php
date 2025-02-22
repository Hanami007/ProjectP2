<?php

namespace Database\Factories;

use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class DeliveryFactory extends Factory
{
    protected $model = Delivery::class;

    public function definition()
    {
        return [
            'id_order' => Order::factory(),
            'ShipperName' => $this->faker->name,
            'Email' => $this->faker->safeEmail,
            'Phone' => $this->faker->phoneNumber,
            'TrackingNumber' => $this->faker->uuid,
            'DeliveryStatus' => $this->faker->randomElement(['Shipped', 'In Transit', 'Delivered']),
            'DeliveryDate' => $this->faker->dateTimeThisYear(),
            'Address' => $this->faker->address,
            'Picture' => $this->faker->imageUrl(),
        ];
    }
}
