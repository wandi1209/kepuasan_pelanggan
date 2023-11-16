import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, masukan, tidakPuas, cukupPuas, puas, sangatPuas, tanggalAwal, tanggalAkhir }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form method="get" action={route('dashboard')}>
                                <div className='flex justify-center'>
                                    <div>
                                        <label className="text-gray-700 text-lg font-bold">Tanggal Awal:</label>
                                        <input
                                            type="date"
                                            name="tanggal_awal"
                                            value={tanggalAwal}
                                            onChange={(e) => setTanggalAwal(e.target.value)}
                                            className="border p-2 mr-4 rounded-xl ml-2 bg-gray-200"
                                        />
                                    </div>
                                    <div className='ml-12'>
                                        <label className="text-gray-700 text-lg font-bold">Tanggal Akhir:</label>
                                        <input
                                            type="date"
                                            name="tanggal_akhir"
                                            value={tanggalAkhir}
                                            onChange={(e) => setTanggalAkhir(e.target.value)}
                                            className="border p-2 rounded-xl ml-2 bg-gray-200"
                                        />
                                    </div>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform duration-200 text-white p-2 ml-6 rounded-xl shadow-xl">Terapkan Filter</button>
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-between p-6">
                            <div className='w-40 h-24 bg-cyan-900 text-white p-3 rounded-xl shadow-xl mx-2'>
                                <p className='text-4xl font-extrabold'>{masukan.length}</p>
                                <p className='text-xl font-bold'>Total Masukan</p>
                            </div>
                            <div className='w-40 h-24 bg-red-600 text-white p-3 rounded-xl shadow-xl mx-2'>
                                <p className='text-4xl font-extrabold'>{tidakPuas}</p>
                                <p className='text-xl font-bold'>Tidak Puas</p>
                            </div>
                            <div className='w-40 h-24 bg-yellow-600 text-white p-3 rounded-xl shadow-xl mx-2'>
                                <p className='text-4xl font-extrabold'>{cukupPuas}</p>
                                <p className='text-xl font-bold'>Cukup Puas</p>
                            </div>
                            <div className='w-40 h-24 bg-green-600 text-white p-3 rounded-xl shadow-xl mx-2'>
                                <p className='text-4xl font-extrabold'>{puas}</p>
                                <p className='text-xl font-bold'>Puas</p>
                            </div>
                            <div className='w-40 h-24 bg-sky-600 text-white p-3 rounded-xl shadow-xl mx-2'>
                                <p className='text-4xl font-extrabold'>{sangatPuas}</p>
                                <p className='text-xl font-bold'>Sangat Puas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
