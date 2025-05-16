<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index() {
        $patients = Patient::all();
        return Inertia::render('Patients/Index', compact('patients'));
    }

    public function create() {
        return Inertia::render('Patients/Create', []);
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|digits:2',
            'gender' => 'required|string|max:255',
            'birthday' => 'required|date',
            'contact' => 'nullable|string|regex:/^\+?\d{11}$/',
            'address' => 'nullable|string|max:255'
        ]);

        Patient::create($request->all());
        return redirect()->route('patients.index')->with('message', 'Patient added successfully.');
    }

    public function edit(Patient $patient) {
        return Inertia::render('Patients/Edit', compact('patient'));
    }

    public function update(Request $request, Patient $patient) {
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|digits:2',
            'gender' => 'required|string|max:255',
            'birthday' => 'required|date',
            'contact' => 'nullable|string|regex:/^\+?\d{11}$/',
            'address' => 'nullable|string|max:255'
        ]);

        $patient->update([
            'name' => $request->input('name'),
            'age' => $request->input('age'),
            'gender' => $request->input('gender'),
            'birthday' => $request->input('birthday'),
            'contact' => $request->input('contact'),
            'address' => $request->input('address')
        ]);

        return redirect()->route('patients.index')->with('message', 'Patient updated successfully.');
    }

    public function destroy(Patient $patient) {
        $patient->delete();
        return redirect()->route('patients.index')->with('message', 'Patient deleted successfully.');
    }
}
