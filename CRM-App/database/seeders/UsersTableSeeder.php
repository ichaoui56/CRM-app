<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'phone_number' => '1234567890',
                'city' => 'New York',
                'current_address' => '123 Main St',
                'profile_picture' => 'profile1.jpg',
                'email' => 'john.doe@example.com',
                'password' => Hash::make('password1'),
            ],
            [
                'first_name' => 'Jane',
                'last_name' => 'Doe',
                'phone_number' => '0987654321',
                'city' => 'Los Angeles',
                'current_address' => '456 Elm St',
                'profile_picture' => 'profile2.jpg',
                'email' => 'jane.doe@example.com',
                'password' => Hash::make('password2'),
            ],
            [
                'first_name' => 'Alice',
                'last_name' => 'Smith',
                'phone_number' => '2345678901',
                'city' => 'Chicago',
                'current_address' => '789 Oak St',
                'profile_picture' => 'profile3.jpg',
                'email' => 'alice.smith@example.com',
                'password' => Hash::make('password3'),
            ],
            [
                'first_name' => 'Bob',
                'last_name' => 'Johnson',
                'phone_number' => '3456789012',
                'city' => 'Houston',
                'current_address' => '101 Pine St',
                'profile_picture' => 'profile4.jpg',
                'email' => 'bob.johnson@example.com',
                'password' => Hash::make('password4'),
            ],
            [
                'first_name' => 'Charlie',
                'last_name' => 'Brown',
                'phone_number' => '4567890123',
                'city' => 'Phoenix',
                'current_address' => '202 Birch St',
                'profile_picture' => 'profile5.jpg',
                'email' => 'charlie.brown@example.com',
                'password' => Hash::make('password5'),
            ],
            [
                'first_name' => 'David',
                'last_name' => 'Williams',
                'phone_number' => '5678901234',
                'city' => 'Philadelphia',
                'current_address' => '303 Cedar St',
                'profile_picture' => 'profile6.jpg',
                'email' => 'david.williams@example.com',
                'password' => Hash::make('password6'),
            ],
            [
                'first_name' => 'Eva',
                'last_name' => 'Davis',
                'phone_number' => '6789012345',
                'city' => 'San Antonio',
                'current_address' => '404 Maple St',
                'profile_picture' => 'profile7.jpg',
                'email' => 'eva.davis@example.com',
                'password' => Hash::make('password7'),
            ],
            [
                'first_name' => 'Frank',
                'last_name' => 'Miller',
                'phone_number' => '7890123456',
                'city' => 'San Diego',
                'current_address' => '505 Oak St',
                'profile_picture' => 'profile8.jpg',
                'email' => 'frank.miller@example.com',
                'password' => Hash::make('password8'),
            ],
            [
                'first_name' => 'Grace',
                'last_name' => 'Wilson',
                'phone_number' => '8901234567',
                'city' => 'Dallas',
                'current_address' => '606 Pine St',
                'profile_picture' => 'profile9.jpg',
                'email' => 'grace.wilson@example.com',
                'password' => Hash::make('password9'),
            ],
            [
                'first_name' => 'Hank',
                'last_name' => 'Moore',
                'phone_number' => '9012345678',
                'city' => 'San Jose',
                'current_address' => '707 Birch St',
                'profile_picture' => 'profile10.jpg',
                'email' => 'hank.moore@example.com',
                'password' => Hash::make('password10'),
            ],
        ];

        DB::table('users')->insert($users);
    }
}
