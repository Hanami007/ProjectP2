<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'id_stores' => Store::factory(),
            'ProductName' => $this->faker->word,
            'Price' => $this->faker->randomFloat(2, 10, 1000),
            'Stock' => $this->faker->numberBetween(1, 100),
            'CreatedAt' => $this->faker->dateTimeThisYear(),
            'ProductType' => $this->faker->word,
            'ProductStatus' => 'available',
            'ProductImage' => $this->faker->imageUrl(),
            'ProductDescription' => $this->faker->paragraph,
        ];
    }
}
