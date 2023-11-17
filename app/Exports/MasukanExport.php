<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class MasukanExport implements FromCollection, WithHeadings, WithTitle, WithStyles
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $masukan = session('cetak_excel');

        $jumlahMasukan = $masukan->count();
        $tidakPuas = $masukan->where('tanggapan', 'Tidak Puas')->count();
        $cukupPuas = $masukan->where('tanggapan', 'Cukup Puas')->count();
        $puas = $masukan->where('tanggapan', 'Puas')->count();
        $sangatPuas = $masukan->where('tanggapan', 'Sangat Puas')->count();

        return collect([
            [
                'Jumlah Masukan' => $jumlahMasukan,
                'Tidak Puas' => $tidakPuas,
                'Cukup Puas' => $cukupPuas,
                'Puas' => $puas,
                'Sangat Puas' => $sangatPuas,
            ]
        ]);
    }

    public function headings():array
    {
        return ['Jumlah Masukan', 'Tidak Puas', 'Cukup Puas', 'Puas', 'Sangat Puas'];
    }

    public function title(): string
    {
        return 'Masukan';
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1:E1')->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF']
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '006600'], // Green color
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
            ],
            'borders' => [
                'outline' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'], // Black color for the borders
                ],
            ],
        ]);

        foreach (range('A', 'E') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $lastRow = $sheet->getHighestRow();
        $range = "A2:E{$lastRow}";
        $sheet->getStyle($range)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        $sheet->getStyle("A2:E{$lastRow}")->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'], // Black color for the borders
                ],
            ],
        ]);
    }
}
