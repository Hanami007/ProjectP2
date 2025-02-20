<?php

namespace Database\Factories;

use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

class StoreFactory extends Factory
{
    protected $model = Store::class;

    public function definition()
    {
        return [
            'StoreName' => $this->faker->company, // Changed from 'storeName' to 'StoreName'
            'ownerName' => $this->faker->name,
            'PhoneNumber' => $this->faker->phoneNumber, // Changed from 'phoneNumber' to 'PhoneNumber'
            'Address' => $this->faker->address, // Changed from 'address' to 'Address'
            'Rating' => $this->faker->randomFloat(1, 1, 5), // Changed from 'rating' to 'Rating'
            'OpenDate' => $this->faker->date(), // Changed from 'openDate' to 'OpenDate'
            'Stock' => $this->faker->numberBetween(10, 100), // Changed from 'stock' to 'Stock'
            'StoreStatus' => $this->faker->randomElement(['Open', 'Closed']), // Changed from 'storeStatus' to 'StoreStatus'
            'Picture' => $this->faker->imageUrl(), // Changed from 'picture' to 'Picture'
        ];
    }
}
