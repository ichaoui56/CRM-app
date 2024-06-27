<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            'Casablanca',
            'Rabat',
            'Marrakech',
            'Fès',
            'Tanger',
            'Agadir',
            'Meknès',
            'Oujda',
            'Kenitra',
            'Tétouan',
            'Salé',
            'Nador',
            'Beni Mellal',
            'Safi',
            'Mohammédia',
            'Khouribga',
            'El Jadida',
            'Sidi Bennour',
            'Settat',
            'Laayoune',
            'Dakhla',
            'Taroudant',
            'Errachidia',
            'Ksar El Kebir',
            'Taza',
            'Sidi Slimane',
            'Al Hoceima',
            'Khenifra',
            'Ouarzazate',
            'Berrechid',
            'Azrou',
            'Tiznit',
            'Tan-Tan',
            'Sefrou',
            'Chefchaouen',
            'Zagora',
            'Larache',
            'Guelmim',
            'Figuig',
            'Ifrane',
            'Taourirt',
            'Oulad Teima',
            'Youssoufia',
            'Guercif',
            'Sidi Ifni',
            'Tiflet',
            'Essaouira',
            'Berkane',
            'Sidi Kacem',
            'Kasba Tadla',
            'Ouazzane',
        ];

        foreach ($cities as $city) {
            DB::table('cities')->insert([
                'name' => $city,
            ]);
        }
    }
}