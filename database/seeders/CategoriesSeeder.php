<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    public function run()
    {
        $mainCategories = ['A', 'B', 'C', 'D', 'E'];
        $subCategories = ['1', '2', '3', '4', '5'];
        $subSubCategories = ['1-1', '2-2', '3-3', '4-4', '5-5'];
        $subSubSubCategories = ['1-1-1', '2-2-2', '3-3-3', '4-4-4', '5-5-5'];

        $categoryID = 1;
        $categories = [];

        // Main categories
        foreach ($mainCategories as $mainCat) {
            $categories[] = [
                'CategoryID' => $categoryID,
                'ParentCategoryID' => 0,
                'EnglishName' => "Category $mainCat"
            ];
            $parentID1 = $categoryID;
            $categoryID++;

            // Subcategories
            foreach ($subCategories as $subCat) {
                $categories[] = [
                    'CategoryID' => $categoryID,
                    'ParentCategoryID' => $parentID1,
                    'EnglishName' => "Category $mainCat$subCat"
                ];
                $parentID2 = $categoryID;
                $categoryID++;

                // Sub subcategories
                foreach ($subSubCategories as $subSubCat) {
                    if ($subSubCat[0] == $subCat) {
                        $categories[] = [
                            'CategoryID' => $categoryID,
                            'ParentCategoryID' => $parentID2,
                            'EnglishName' => "Category $mainCat$subSubCat"
                        ];
                        $parentID3 = $categoryID;
                        $categoryID++;

                        // Sub sub subcategories
                        foreach ($subSubSubCategories as $subSubSubCat) {
                            if ($subSubSubCat[0] == $subCat[0]) {
                                $categories[] = [
                                    'CategoryID' => $categoryID,
                                    'ParentCategoryID' => $parentID3,
                                    'EnglishName' => "Category $mainCat$subSubSubCat"
                                ];
                                $categoryID++;
                            }
                        }
                    }
                }
            }
        }

        // Insert categories into the database
        DB::table('categories')->insert($categories);
    }
}
