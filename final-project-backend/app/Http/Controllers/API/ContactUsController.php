<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ContactUs;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Manager;

class ContactUsController extends Controller
{

    public function index()
    {
        try {
            $contactUsRecords = ContactUs::with('manager')->get();

            return response()->json([
                'data' => $contactUsRecords,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error retrieving contact_us records',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $contactUs = ContactUs::with('manager')->findOrFail($id);

            return response()->json([
                'data' => $contactUs,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error retrieving contact_us record',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $contactUs = new ContactUs;
            $contactUs->name = $request->input('name');
            $contactUs->email = $request->input('email');
            $contactUs->subject = $request->input('subject');
            $contactUs->save();

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Find the contact_us record by ID
            $contactUs = ContactUs::findOrFail($id);

            // $id = Auth::user()->id;
            $manager = Manager::where('user_id', $request->input('Admin_id'))->first();
            // dd($client);
            // Update the manager_id field with the value from the request
            $contactUs->Admin_id = $manager->id;
            $contactUs->replayed = $request->input('replayed');

            // Save the changes to the record
            $contactUs->save();

            return response()->json([
                'message' => 'Contact Us record updated successfully',
                'data' => $contactUs,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating contact_us record',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Find the contact_us record by ID
            $contactUs = ContactUs::findOrFail($id);

            // Delete the record from the database
            $contactUs->delete();

            return response()->json([
                'message' => 'Contact Us record deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting contact_us record',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
