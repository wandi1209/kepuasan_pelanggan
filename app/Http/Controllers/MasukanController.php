<?php

namespace App\Http\Controllers;

use App\Exports\MasukanExport;
use Illuminate\Http\Request;
use App\Models\Masukan;
use Inertia\Inertia;
use Carbon\Carbon;
use Excel;
use Alert;

class MasukanController extends Controller
{
    public function index () {
        return Inertia::render('Welcome', [
            'canLogin' => route('login'),
            'laravelVersion' => app()->version(),
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggapan' => 'required|in:Tidak Puas,Cukup Puas,Puas,Sangat Puas',
        ]);

        Masukan::create([
            'tanggapan' => $request->input('tanggapan'),
        ]);
    }

    public function dashboard(Request $request) 
    {
        $masukan = Masukan::query();
        // Mendapatkan tanggal awal dan akhir dari request
        $tanggalAwal = $request->input('tanggal_awal', Carbon::now()->subMonth()->format('Y-m-d'));
        $tanggalAkhir = $request->input('tanggal_akhir', Carbon::now()->format('Y-m-d'));

        // Query data berdasarkan tanggal awal dan akhir filter
        if ($request->filled('tanggal_awal') && $request->filled('tanggal_akhir')) {
            // Gunakan whereBetween untuk memfilter masukan berdasarkan tanggal

            $endOfDay = Carbon::createFromFormat('Y-m-d', $request->input('tanggal_akhir'))->endOfDay();

            $masukan->whereBetween('created_at', [
                $request->input('tanggal_awal'),
                $endOfDay,
            ]);
        }
        $masukan = $masukan->get();
        $tidakPuas = $masukan->where('tanggapan', 'Tidak Puas')->count();
        $cukupPuas = $masukan->where('tanggapan', 'Cukup Puas')->count();
        $puas = $masukan->where('tanggapan', 'Puas')->count();
        $sangatPuas = $masukan->where('tanggapan', 'Sangat Puas')->count();
        
        session([
            'tanggal_awal' => $tanggalAwal,
            'tanggal_akhir' => $tanggalAkhir,
        ]);

        return Inertia::render('Dashboard', [
            'masukan' => $masukan,
            'tidakPuas' => $tidakPuas,
            'cukupPuas' => $cukupPuas,
            'puas' => $puas,
            'sangatPuas' => $sangatPuas,
            'tanggal_awal' => $tanggalAwal,
            'tanggal_akhir' => $tanggalAkhir,
        ])->with(['session' => session()->all()]);
    }

    public function cetak (Request $request) {
        // Ambil tanggal awal dan akhir dari session
        $tanggalAwal = session('tanggal_awal');
        $tanggalAkhir = session('tanggal_akhir');

        $query = Masukan::query();

        if ($tanggalAwal && $tanggalAkhir) {
            $endOfDay = Carbon::createFromFormat('Y-m-d', $tanggalAkhir)->endOfDay();

            $query->whereBetween('created_at', [
                $tanggalAwal,
                $endOfDay,
            ]);
        }

        $masukan = $query->get();
        session(['cetak_excel' => $masukan]);
        return Excel::download(new MasukanExport, 'Masukan.xlsx');
    }

}
