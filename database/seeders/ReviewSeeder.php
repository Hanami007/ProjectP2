<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ReviewSeeder extends Seeder
{
    public function run()
    {
        $reviews = [];

        for ($i = 1; $i <= 20; $i++) {
            $reviews[] = [
                'product_id' => rand(1, 10), // สมมติว่ามีสินค้า 10 รายการ
                'user_id' => rand(1, 5), // สมมติว่ามีผู้ใช้ 5 คน
                'rating' => rand(3, 5), // คะแนน 3-5 ดาว
                'comment' => Str::random(50),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('reviews')->insert($reviews);
    }
}
