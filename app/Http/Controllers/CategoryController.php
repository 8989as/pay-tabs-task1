<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    public function getCategories()
    {
        $categories = Category::select('CategoryID', 'ParentCategoryID', 'EnglishName')->get();
        return response()->json(['webcats' => $categories]);
    }
}
